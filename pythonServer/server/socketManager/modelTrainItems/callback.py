import keras
class LossAndErrorPrintingCallback(keras.callbacks.Callback):
     
      callback = None
      __training_stop = True
      infoStorage = []
      callBackForSetAllTraningData = None
      def stopBuild(self):
         self.__training_stop = True
      def startBuild(self):
         self.__training_stop = False
      def on_epoch_end(self, epoch, logs=None):
         if self.__training_stop:
            self.model.stop_training = True
         if self.callback!=None and callable(self.callback):
             loss = str(logs["loss"])
             accuracy = str(logs["accuracy"])
             val_accuracy = str(logs["val_accuracy"])
             val_loss = str(logs["val_loss"])
             self.infoStorage.append({
                 "epoch":epoch,
                 "loss":loss,
                 "accuracy":accuracy,
                 "val_accuracy":val_accuracy,
                 "val_loss":val_loss,
                        })
             try:
                self.callback(self.infoStorage)
                if callable(self.callBackForSetAllTraningData):
                    self.callBackForSetAllTraningData(self.infoStorage)
             except:
                 pass