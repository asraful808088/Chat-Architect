# import tensorflow as tf
# import threading
# from  time import sleep 
# # Global flag variable
# stop_training =False

# # Custom callback to stop training when the flag is set
# class StopTrainingCallback(tf.keras.callbacks.Callback):
    
#     def on_epoch_end(self, epoch, logs=None):
#        global stop_training
#        print(stop_training)
#        if stop_training:
#             print("_____________________________________________________________")
#             print("_____________________________________________________________")
#             print("_____________________________________________________________")
#             print("_____________________________________________________________")
#             print("_____________________________________________________________")
#             print("_____________________________________________________________")
#             print("_____________________________________________________________")
#             print( f"______________________{stop_training}______________________")
#             print("_____________________________________________________________")
#             print("_____________________________________________________________")
#             print("_____________________________________________________________")
#             print("_____________________________________________________________")
#             print("_____________________________________________________________")
#             print("_____________________________________________________________")
#             print("_____________________________________________________________")
#             print("_____________________________________________________________")
#             print("_____________________________________________________________")
#             print("_____________________________________________________________")
#             self.model.stop_training = True

# # Example model
# model = tf.keras.Sequential([
#     tf.keras.layers.Dense(10, activation='relu', input_shape=(784,)),
#     tf.keras.layers.Dense(10, activation='softmax')
# ])

# # Compile the model
# model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])
# def train_model():

#     # Load and preprocess data
#     (x_train, y_train), (x_test, y_test) = tf.keras.datasets.mnist.load_data()
#     x_train = x_train.reshape(-1, 784) / 255.0
#     x_test = x_test.reshape(-1, 784) / 255.0

#     try:
#         # Start training
#         model.fit(x_train, y_train, epochs=17, callbacks=[StopTrainingCallback()])
#     except KeyboardInterrupt:
#         print("Training stopped.")
# # Example usage
# test  = threading.Thread(target=train_model) 
# test.start()
# sleep(5)
# stop_training = True
# storeData = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
# storeData.slice(-10)


import jwt
import datetime
SECRET_KEY = 'your_secret_key_here'
payload = {
    "stap_memo":"",
    "current_stap":"",
    'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)  
}
token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')
