import tensorflow as tf
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.layers import Embedding, LSTM, Dense
from sklearn.model_selection import train_test_split
import keras
import numpy as np
from layers import typeOfLayer




conversations = [
    ("Hello", "getting"),
    ("hlw", "getting"),
    ("hlws", "getting"),
    ("What's your name?", "name"),
    ("name What's your ?", "qus"),
    ("name What's your ?", "qus"),
    ("name What's your ?", "qus"),
    ("How are you?", "position"),
     ("Hello", "getting"),
    ("hlw", "getting"),
    ("hlws", "getting"),
    ("What's your name?", "name"),
    ("name What's your ?", "qus"),
    ("name What's your ?", "qus"),
    ("name What's your ?", "qus"),
    ("How are you?", "position"),
     ("Hello", "getting"),
    ("hlw", "getting"),
    ("hlws", "getting"),
    ("What's your name?", "name"),
    ("name What's your ?", "qus"),
    ("name What's your ?", "qus"),
    ("name What's your ?", "qus"),
    ("How are you?", "position"),
     ("Hello", "getting"),
    ("hlw", "getting"),
    ("hlws", "getting"),
    ("What's your name?", "name"),
    ("name What's your ?", "qus"),
    ("name What's your ?", "qus"),
    ("name What's your ?", "qus"),
    ("How are you?", "position"),
     ("Hello", "getting"),
    ("hlw", "getting"),
    ("hlws", "getting"),
    ("What's your name?", "name"),
    ("name What's your ?", "qus"),
    ("name What's your ?", "qus"),
    ("name What's your ?", "qus"),
    ("How are you?", "position"),
     ("Hello", "getting"),
    ("hlw", "getting"),
    ("hlws", "getting"),
    ("What's your name?", "name"),
    ("name What's your ?", "qus"),
    ("name What's your ?", "qus"),
    ("name What's your ?", "qus"),
    ("How are you?", "position"),
     ("Hello", "getting"),
    ("hlw", "getting"),
    ("hlws", "getting"),
    ("What's your name?", "name"),
    ("name What's your ?", "qus"),
    ("name What's your ?", "qus"),
    ("name What's your ?", "qus"),
    ("How are you?", "position"),
]
def start_train(conversations,listOflayers=[],learning=0.001,out_dim=64,callBack=None,test_size=0.2):
    class LossAndErrorPrintingCallback(keras.callbacks.Callback):
      def on_epoch_end(self, epoch, logs=None):
         if False:
            self.model.stop_training = True
         if callBack!=None:
             loss = str(logs["loss"])
             accuracy = str(logs["accuracy"])
             val_accuracy = str(logs["val_accuracy"])
             val_loss = str(logs["val_loss"])
             callBack({
                 "epoch":epoch,
                 "loss":loss,
                 "accuracy":accuracy,
                 "val_accuracy":val_accuracy,
                 "val_loss":val_loss,
                        })
             


    inputs, outputs = zip(*conversations)
    tokenizer = Tokenizer()
    tokenizer.fit_on_texts(inputs + outputs)
    vocab_size = len(tokenizer.word_index) + 1
    input_sequences = tokenizer.texts_to_sequences(inputs)
    output_sequences = tokenizer.texts_to_sequences(outputs)
    max_len = max(max(map(len, input_sequences)), max(map(len, output_sequences)))
    padded_inputs = pad_sequences(input_sequences, maxlen=max_len, padding='post')
    padded_outputs = pad_sequences(output_sequences, maxlen=max_len, padding='post')
    X_train, X_val, y_train, y_val = train_test_split(padded_inputs, padded_outputs, test_size=test_size, random_state=42)
    layers = [tf.keras.layers.Embedding(input_dim=vocab_size, output_dim=out_dim, input_length=max_len)]
    #          
    #     
    # 
    # 
    for item in listOflayers:
       if item["type"] == "lstm":
          layers.append( typeOfLayer["lstm"](percep=item["persep"],activation=item["activation"], L1=item["l1"], L2=item["l2"]))
       elif  item["type"] == "dropout":
          layers.append(typeOfLayer["dropout"](item["rate"]))  
    layers.append(tf.keras.layers.Dense(vocab_size, activation='softmax'))
    model = tf.keras.Sequential(layers)
    model.compile(optimizer=tf.keras.optimizers.Adam(learning_rate=learning), loss='sparse_categorical_crossentropy', metrics=['accuracy'])
    print(model.summary())
    model.fit(X_train, y_train, validation_data=(X_val, y_val), epochs=100,callbacks=[LossAndErrorPrintingCallback()])
    pass

def callbackConsole(value):
   print(value)
layerss = [
   {
      
      "type":"lstm",
      "persep":100,
      "activation":"tanh",
      "l1":None,
      "l2":None,
    },
    {"type":"dropout",
        "rate":0.1
    },
]
start_train(conversations,listOflayers=layerss,learning=0.001,callBack=callbackConsole)

def generate_response(user_input):
    input_seq = tokenizer.texts_to_sequences([user_input])
    padded_input = pad_sequences(input_seq, maxlen=max_len, padding='post')
    predicted_output = model.predict(padded_input)
    predicted_index = tf.argmax(predicted_output, axis=-1).numpy()[0, 0]  
    predicted_response = tokenizer.index_word.get(predicted_index, 'Unknown')
    confidence = tf.reduce_max(tf.nn.softmax(predicted_output)).numpy()
    return predicted_response, confidence

# print(all_metrics)
while True:
    user_input = input("You: ")
    if user_input.lower() == 'exit':
        break
    response, confidence = generate_response(user_input)
    print(f"Chatbot: {response} (Confidence: {confidence:.4f})")

