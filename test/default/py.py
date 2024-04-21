# import numpy as np
# from sklearn.model_selection import train_test_split
# from tensorflow.keras.models import Sequential
# from tensorflow.keras.layers import Dense

# # Manually create a small dataset
# X = np.array([
#     [0.2, 0.3, 0.5, 0.1, 0.8],
#     [0.2, 0.3, 0.5, 0.1, 0.8],
#     [0.2, 0.3, 0.5, 0.1, 0.8],
#     [0.2, 0.3, 0.5, 0.1, 0.8],
#     [0.2, 0.3, 0.5, 0.1, 0.8],
#     [0.2, 0.3, 0.5, 0.1, 0.8],
#     [0.2, 0.3, 0.5, 0.1, 0.8],
#     [0.2, 0.3, 0.5, 0.1, 0.8],
#     [0.2, 0.3, 0.5, 0.1, 0.8],
#     [0.2, 0.3, 0.5, 0.1, 0.8],
#     [0.2, 0.3, 0.5, 0.1, 0.8],
#     [0.2, 0.3, 0.5, 0.1, 0.8],
#     [0.2, 0.3, 0.5, 0.1, 0.8],
#     [0.2, 0.3, 0.5, 0.1, 0.8],
#     [0.2, 0.3, 0.5, 0.1, 0.8],    
#     [0.1, 0.4, 0.6, 0.2, 0.7],
#     [0.3, 0.5, 0.7, 0.3, 0.6],
#     [0.5, 0.7, 0.9, 0.4, 0.5],
#     [0.4, 0.6, 0.8, 0.5, 0.4],
#     [0.7, 0.2, 0.3, 0.6, 0.3],
#     [0.8, 0.1, 0.2, 0.7, 0.2],
#     [0.6, 0.3, 0.4, 0.8, 0.1],
#     [0.9, 0.6, 0.3, 0.5, 0.2],
#     [0.3, 0.8, 0.1, 0.4, 0.7]
# ])

# y = np.array([
#     [10, 20],
#     [10, 20],
#     [10, 20],
#     [10, 20],
#     [10, 20],
#     [10, 20],
#     [10, 20],
#     [10, 20],
#     [10, 20],
#     [10, 20],
#     [10, 20],
#     [10, 20],
#     [10, 20],
#     [10, 20],
#     [10, 20],
#     [15, 25],
#     [20, 30],
#     [25, 35],
#     [30, 40],
#     [35, 45],
#     [40, 50],
#     [45, 55],
#     [50, 60],
#     [55, 65]
# ])

# # Split the data into training and testing sets
# X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# # Create a neural network model
# model = Sequential()
# model.add(Dense(64, input_shape=(5,), activation='relu'))  # Input layer with 5 features
# model.add(Dense(64, activation='relu'))  # Hidden layer
# model.add(Dense(2))  # Output layer with 2 target variables

# # Compile the model
# model.compile(optimizer='adam', loss='mse')  # Using Mean Squared Error as loss function

# # Train the model
# model.fit(X_train, y_train, epochs=100, batch_size=32, validation_split=0.2)

# # Evaluate the model on the test data
# loss = model.evaluate(X_test, y_test)
# print("Test Loss:", loss)

# # Define new testing data
# X_new_test = np.array([
#     [0.2, 0.3, 0.5, 0.1, 0.8],
# ])

# # Predict target variables for the new testing data
# y_new_pred = model.predict(X_new_test)

# # Print predictions for the new testing data
# print("Predictions for new testing data:")
# print("Predicted targets:", y_new_pred)



import sys
sys.path.append('./')
import tensorflow as tf
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.layers import Embedding, LSTM, Dense
from sklearn.model_selection import train_test_split
from .layers import typeOfLayer  # Make sure this import is correct
from .callback import LossAndErrorPrintingCallback  # Make sure this import is correct

class TrainBotModel:
    def __init__(self, conversations) -> None:
        self.__conversations = [(conv["intent"], conv["type"]) for conv in conversations]
        self.__callbackModel = LossAndErrorPrintingCallback()
        self.__callbackModel.callBackForSetAllTraningData = self.setFullTrainingInfo
        self.__fullTrainingInfo = []

    def setFullTrainingInfo(self, training_data):
        self.__fullTrainingInfo = training_data

    def close_train(self):
        self.__callbackModel.stopBuild()

    def start_train(self, list_of_layers=[], learning=0.001, out_dim=64, test_size=0.2, epochs=100):
        self.__callbackModel.infoStorage = []
        self.__callbackModel.callback = self.callback
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

        layers = [Embedding(input_dim=vocab_size, output_dim=out_dim, input_length=max_len)]
        for item in list_of_layers:
            if item["type"] == "lstm":
                layers.append(typeOfLayer["lstm"](percep=item["persep"], activation=item["activation"], L1=item["l1"], L2=item["l2"]))
            elif item["type"] == "dropout":
                layers.append(typeOfLayer["dropout"](item["rate"]))
        layers.append(Dense(vocab_size, activation='softmax'))
        model = tf.keras.Sequential(layers)
        model.compile(optimizer=tf.keras.optimizers.Adam(learning_rate=learning), loss='sparse_categorical_crossentropy', metrics=['accuracy'])

        print(model.summary())
        model.fit(X_train, y_train, validation_data=(X_val, y_val), epochs=epochs, callbacks=[self.__callbackModel])

        if callable(self.onFinishTraning) and not self.botTrainClose:
            self.__callbackModel.infoStorage = []
            self.setFullTrainingInfo([])
            self.onFinishTraning({"save_model": model.save, "tokenizer": tokenizer.to_json(), "training_data": self.__fullTrainingInfo, "max_len": max_len})
