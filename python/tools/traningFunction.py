import asyncio
import spacy
from spacy.training.example import Example
import os
import json
current_directory = os.getcwd()
def convert_data_format(input_data):
    output_data = []
    for text, annotation in input_data:
        unique_entities = set(tuple(entity[:-1]) for entity in annotation['entities'])
        new_annotation = {'entities': [list(entity) for entity in unique_entities]}
        output_data.append((text, new_annotation))
    return output_data

async def startTrain(model, index, data, websocket):
    target_directory = os.path.abspath(os.path.join(current_directory, os.pardir, "chats", "tokenizer", f"{model}.tokenizer", index))
    nlp = spacy.blank("en")
    nlp.add_pipe("ner")
    training_data = convert_data_format(data["data"])
    examples = []
    for text, annotations in training_data:
        doc = nlp.make_doc(text)
        example = Example.from_dict(doc, annotations)
        examples.append(example)
    nlp.begin_training()
    count = 0
    await websocket.send(json.dumps({"type": "stateProgress","model":model,"index":index}))
    try:
        for _ in range(300):
            trainStop = False
            data_read = {}
            with open(f"{target_directory}/trainState.json", "r") as json_file:
                data_read = json.load(json_file)
                trainStop = data_read["trainStop"] 
            if trainStop:
                break
            count += 1
            with open(f"{target_directory}/trainState.json", "w") as json_file:
                data_read["count"] = count
                json.dump(data_read, json_file)
            await websocket.send(json.dumps({"type": "countProgress", "count": count,"model":model,"index":index}))
            await asyncio.sleep(0.2)
            losses = {}
            correct_preds = 0
            total_preds = 0
            for example in examples:
                nlp.update([example], drop=0.5, losses=losses)
                predicted_doc = nlp(example.reference.text)
                correct_preds += len(set(example.reference.ents) & set(predicted_doc.ents))
                total_preds += len(predicted_doc.ents)
            print(losses)
    except FileNotFoundError as e:
        print(f"Error: {e}. The file trainState.json was not found.")
    except json.JSONDecodeError as e:
       print(f"Error decoding JSON: {e}.")
    except KeyError as e:
       print(f"Error accessing key in JSON: {e}.")
    except Exception as e:
       print(f"An unexpected exception occurred: {e}")
    nlp.to_disk(target_directory)
    await websocket.send(json.dumps({"type": "progressFinish","model":model,"index":index}))
