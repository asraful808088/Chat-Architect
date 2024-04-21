import sys
sys.path.append('..') 
from flask import Flask, request
from flask_socketio import SocketIO,emit
import threading
from utils.tokenGenerator import generate_token
import time
from socketManager.modelTrainItems.modelTrain import TrainBotModel




conversition = [{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },{ "intent": "text", "type": "result.name" },]
























class ModelBuildControl:
    __client_with_task = {}
    onConnect=None
    onDisconnect=None
    onMessage=None
    socketio = None
    _instance = None
    __modelName = None
    __modelCreateObj = None

    


    def __saveModel(self,value):
      value["save_model"]("bot/model.h5")

    def train_token(self,msg):
       if callable(self.onMessage):
           self.onMessage()

    def train_model(self,msg):
        if msg["intent"] =="start":
           
            create_train_obj = TrainBotModel(conversations=conversition)
            create_train_obj.onFinishTraning = self.__saveModel
            self.__modelCreateObj = create_train_obj
            self.__client_with_task[request.sid]["model"]=threading.Thread(target=create_train_obj.start_train, args=(msg["option"]["h_layers"],msg["option"]["learningRate"],msg["option"]["outputDim"], msg["option"]["testingRate"], msg["option"]["epoch"]))
            def modelTrainer(value):
                    self.socketio.emit("training_stream")
               
                
            create_train_obj.callback =modelTrainer 
            
            self.__client_with_task[request.sid]["model"].start()
            if callable(self.onMessage):
                self.onMessage()
        if msg["intent"] =="close":
            self.__modelCreateObj.close_train()
            self.__modelCreateObj = None
            del self.__client_with_task[request.sid]["model"]
            if callable(self.onMessage):
                self.onMessage()

        


    def __init__(self, app):
        self.app = app
        self.socketio = SocketIO(app)
        @self.socketio.on('connect')
        def handle_connect():
           self.__client_with_task[request.sid] = {}
           if callable(self.onConnect):
               self.onConnect({"connected_current_user_id":request.sid,"all_user_doc":self.__client_with_task})

        @self.socketio.on('disconnect')
        def handle_disconnect():
            if request.sid in self.__client_with_task:
                del self.__client_with_task[request.sid]
                if callable(self.onDisconnect):
                    self.onDisconnect({"connected_current_user_id":request.sid,"all_user_doc":self.__client_with_task})
        @self.socketio.on('message')
        def handle_message(message):
            
            # if message["type"] =="train_token":
            #     self.train_token(message)
            # elif message["type"] =="train_model":
            #     self.train_model(message)
            if message["intent"] =="start":
           
                create_train_obj = TrainBotModel(conversations=conversition)
                create_train_obj.onFinishTraning = self.__saveModel
                self.__modelCreateObj = create_train_obj
                self.__client_with_task[request.sid]["model"]=threading.Thread(target=create_train_obj.start_train, args=(message["option"]["h_layers"],message["option"]["learningRate"],message["option"]["outputDim"], message["option"]["testingRate"], message["option"]["epoch"]))
                def modelTrainer(value):
                        time.sleep(1)
                        self.socketio.emit("training_stream")
                create_train_obj.callback =modelTrainer 

                self.__client_with_task[request.sid]["model"].start()
                if callable(self.onMessage):
                 self.onMessage()
            if message["intent"] =="close":
                self.__modelCreateObj.close_train()
                self.__modelCreateObj = None
                del self.__client_with_task[request.sid]["model"]
                if callable(self.onMessage):
                    self.onMessage()






















            

            # if callable(self.onMessage):
            #     self.onMessage(message)
            # token = generate_token()
            # self.__client_with_task[request.sid][token] =  threading.Thread(target=self.countdown, args=("client_id", 20))
            # self.__client_with_task[request.sid][token].start()

        

    def __new__(cls, *args, **kwargs):
        if cls._instance is None:
            cls._instance = super(ModelBuildControl, cls).__new__(cls)
        return cls._instance
   
