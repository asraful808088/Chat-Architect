
import sys
sys.path.append('./')

import tensorflow as tf
import os
from tensorflow.keras.preprocessing.sequence import pad_sequences
import pickle

current_directory = os.path.dirname(os.path.abspath(__file__))
tokenFile = os.path.join(current_directory, 'tokenizer.pickle')
modelFile = os.path.join(current_directory, 'model.h5')
model = tf.keras.models.load_model(modelFile)
confidence_threshold =  0.8
with open(tokenFile, 'rb') as handle:
    tokenizer = pickle.load(handle)
def predict(text):
    sequence = tokenizer.texts_to_sequences([text])
    padded_sequence = pad_sequences(sequence, maxlen=9, padding='post')
    prediction = model.predict(padded_sequence)
    predicted_index = tf.argmax(prediction, axis=2).numpy()[0][0]
    confidence = prediction[0][0][predicted_index]
    predicted_response = tokenizer.index_word.get(predicted_index, 'Unknown')
    if confidence < confidence_threshold:
        predicted_response = 'Unknown'
    return predicted_response, confidence
    



print(predict("bye"))