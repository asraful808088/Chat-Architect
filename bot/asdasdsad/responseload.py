import os
import json
import random
current_directory = os.path.dirname(os.path.abspath(__file__))
response_directory = os.path.join(current_directory, 'response')

response = {}
if os.path.exists(response_directory):
    files = os.listdir(response_directory)
    json_files = [file for file in files if file.endswith('.json')]
    for json_file in json_files:
        file_path = os.path.join(response_directory, json_file)
        try:
                    with open(file_path, 'r') as file:
                        data = json.load(file)
                        responseBloc = []
                        for bloc in data["items"]:
                            textItems=[]
                            for responseItem in bloc["items"]:
                                blocItem = {}
                                name = responseItem["name"]
                                blocItem["name"] = name
                                blocItem["items"] = []
                                for textItem in responseItem["items"]:
                                    blocItem["items"].append({
                                            "type":textItem["type"],
                                            "text":textItem["text"],
                                    })
                                textItems.append(blocItem)
                            responseBloc.append(textItems)
                        response[data["name"]] = responseBloc
        except:
             pass
        





def getResponseItems(name):
     try:
        responses =  response[name]
        if len(responses)==0:
             return None
        random_number = random.randint(0,  len(responses)-1)
        return responses[random_number]
     except:
          return None
     

















                



