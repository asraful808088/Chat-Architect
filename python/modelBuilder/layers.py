import tensorflow as tf
from tensorflow.keras.layers import LSTM
def lstmLayer(percep=1, activation="tanh", L1=None, L2=None):
    regularizer = None
    if L1 is not None and L2 is not None:
        regularizer = tf.keras.regularizers.l1_l2(l1=L1, l2=L2)
    elif L1 is not None:
        regularizer = tf.keras.regularizers.l1(L1)
    elif L2 is not None:
        regularizer = tf.keras.regularizers.l2(L2)
    else:
        regularizer = None
    print(regularizer)
    return LSTM(percep, return_sequences=True, kernel_regularizer=regularizer, activation=activation)
def dropoutLayer(rate=.02):
     return tf.keras.layers.Dropout(rate) 

typeOfLayer = {
    "lstm":lstmLayer,
    "dropout":dropoutLayer,
}