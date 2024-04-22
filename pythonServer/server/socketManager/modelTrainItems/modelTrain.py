import sys
sys.path.append('./') 
import tensorflow as tf
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.layers import Embedding, LSTM, Dense
from sklearn.model_selection import train_test_split
from .layers import typeOfLayer
import keras
import numpy as np
from .callback import LossAndErrorPrintingCallback
class TrainBotModel:
   __conversations = []
   __callbackModel = None
   callback = None
   __fullTraningInfo = []
   onFinishTraning =None
   botTrainClose = True
   def setFullTraningInfo(self,list):
      self.__fullTraningInfo = list
   def close_train(self):
      self.__callbackModel.stopBuild()
   
   def __init__(self,conversations) -> None:
      self.__conversations = [(conv["intent"], conv["type"]) for conv in conversations]
      self.__callbackModel = LossAndErrorPrintingCallback()
      self.__callbackModel.callBackForSetAllTraningData = self.setFullTraningInfo
      

   def start_train(self,listOflayers=[],learning=0.001,out_dim=64,test_size=0.2,epochs=100):
    self.__callbackModel.infoStorage = []
    if callable(self.callback):
      self.__callbackModel.callback =self.callback 
    self.__callbackModel.startBuild()
    inputs, outputs = zip(*self.__conversations)
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
    for item in listOflayers:
       if item["type"] == "lstm":
          layers.append( typeOfLayer["lstm"](percep=item["persep"],activation=item["activation"], L1=item["l1"], L2=item["l2"]))
       elif  item["type"] == "dropout":
          layers.append(typeOfLayer["dropout"](item["rate"]))  
    layers.append(tf.keras.layers.Dense(vocab_size, activation='softmax'))
    model = tf.keras.Sequential(layers)
    model.compile(optimizer=tf.keras.optimizers.Adam(learning_rate=learning), loss='sparse_categorical_crossentropy', metrics=['accuracy'])
    print(model.summary())
    model.fit(X_train, y_train, validation_data=(X_val, y_val), epochs=epochs,callbacks=[self.__callbackModel])
    if callable(self.onFinishTraning) and self.botTrainClose ==False:
       self.__callbackModel.infoStorage = []
       self.setFullTraningInfo([])
       print(f"max length:{max_len}",)
       self.onFinishTraning({"save_model":model.save,"tokenizer":tokenizer,"traningData":self.__fullTraningInfo,"max_len":max_len})