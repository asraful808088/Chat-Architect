import sys
from time import sleep
sys.path.append('.') 
sys.path.append('../..') 
import asyncio
import websockets
import json
import threading
from socketManager.modelTrainItems.modelTrain import TrainBotModel
import os
import shutil
from utils.modelMaker import write_model_script 
import pickle


passData = False
storeData = []
createBotModelObj = {}



def create_or_delete_folder(folder_name):
    folder_path = f"bot/{folder_name}"
    
    if os.path.exists(folder_path):
      
        for item in os.listdir(folder_path):
            item_path = os.path.join(folder_path, item)
            if os.path.isfile(item_path):
                os.remove(item_path)
            else:
                shutil.rmtree(item_path)
        shutil.rmtree(folder_path)
    os.makedirs(folder_path)












def saveToken(data, name, filename):
    with open(f"./../../bot/{name}/{filename}.pickle", 'wb') as handle:
        pickle.dump(data, handle, protocol=pickle.HIGHEST_PROTOCOL)




async def handle_connection(websocket, path):
   
   
   
    def passToNodeItems(items,websocket):
        global storeData
        while passData:
            asyncio.run(websocket.send(json.dumps(storeData[-10:])))
            sleep(3)
    try:
        print(f"Client connected: {websocket.remote_address}")
        client_with_task= {}
        
        async for message in websocket:
            
            result  = json.loads(message)
            if result["type"]=="train_model":
                global createBotModelObj
                global passData
                if result["intent"]=="start":
                    
                    passData = True
                    createBotModelObj = TrainBotModel(conversations=result["intentWithType"])
                    createBotModelObj.botTrainClose = False
                    def finishTraning(value):
                        sleep(5)
                        global passData 
                        passData = False
                        botName = result["name"]
                        create_or_delete_folder(botName)
                        saveToken(value["tokenizer"],botName,'tokenizer')
                        write_model_script(botName,value["max_len"])
                        value["save_model"](f"./../../bot/{botName}/model.h5")
                        del client_with_task["passingLoop"] 
                        del client_with_task["model"]
                        asyncio.run(websocket.send(json.dumps({"type":"finishMainModel","data":value["traningData"]})))
                        
                         



                    createBotModelObj.onFinishTraning = finishTraning
                    global storeData                    
                    def callbackDetails(value):
                           global storeData
                           storeData = value
                    createBotModelObj.callback =   callbackDetails                                                 
                    client_with_task["model"] = threading.Thread(target=createBotModelObj.start_train,args=(result["option"]["h_layers"], float(result["option"]["learningRate"]),int(result["option"]["outputDim"]), 
                    result["option"]["testingRate"], result["option"]["epoch"]))
                    client_with_task["passingLoop"] = threading.Thread(target=passToNodeItems,args=(storeData,websocket))
                    client_with_task["passingLoop"].start()
                    client_with_task["model"].start()
                else:
                    createBotModelObj.setFullTraningInfo([])
                    createBotModelObj.botTrainClose = True
                    passData = False
                    createBotModelObj.close_train()
                    del client_with_task["model"]
                    del client_with_task["passingLoop"]
                    await websocket.send(json.dumps({"type":"closeBuild"}))
                
            elif result["type"]=="train_model": 
                pass
    except websockets.exceptions.ConnectionClosed as e:
        print(f"Client disconnected: {websocket.remote_address}, code: {e.code}, reason: {e.reason}")

if __name__ == "__main__":
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    start_server = websockets.serve(handle_connection, "localhost", 8765)
    try:
        print("WebSocket server started.")
        loop.run_until_complete(start_server)
        loop.run_forever()
    except KeyboardInterrupt:
        print("Server shutting down.")
    finally:
        loop.close()
