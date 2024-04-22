import json
import os
import sys
sys.path.append('./')

from  chatMenegment.checkNext import checkNext
from  chatMenegment.checkAlternative import checkAlternative
from  chatMenegment.loopHandler import loophandler
from  chatMenegment.checkBackOne import checkBackOne
from  chatMenegment.checkSecunce import checkSecunce
from  chatMenegment.checkAlternativeConv import checkAlternativeConv
from  chatMenegment.switch import redirectConvSecounce
from  chatMenegment.searchConv import searchConv
from  chatMenegment.defaultHandler import defaultHandle
from responseload import getResponseItems
from extrack_and_rep_var import replace_variables
# from model import predict
from enum import Enum
class ConversitionStap(Enum):
      PUT_SINGLE_ITEM = 1
      PUT_MULTIITEM = 2
      FINAL_DEFAULT = 3
      ACTIVE_LOOP = 4
      PRIVATE_DEFAULT = 5
      CHECK_LAST = 6
      TOPIC_BRACK = 7
      NEXT_STAP_TOPIC_BRACK = 7
      RETRY_TOPIC = 8
      TOPIC_LOOP = 9
      TOPIC_BRACK_FROM_NEXT = 10
      SECUNCE_HANDLER = 11
      TOPIC_BRACK_CHILD_LOOP = 12
      TOPIC_BRACK_CHILD_LAYERS = 13

script_dir = os.path.dirname(os.path.abspath(__file__))
json_file_path = os.path.join(script_dir, 'model.json')
with open(json_file_path) as f:
    parsed_data = json.load(f)
def runConversition(obj,expectation="",storeConv=[],allConversition = [],loop = False,brackTopicInfo=None,initIntent=None,rebuildConvStore=[],subAlternative = False,checkLastOne=True,lastConv =None,loopTracker = True,alltravleItems=[],memorize={},chat_property={} ):
    if len(storeConv)!=0:
        if storeConv[len(storeConv)-1]["loopActive"]["active"]  and loopTracker:
            result = loophandler(storeConv,expectation,storeConv[len(storeConv)-1]["loopActive"]["returnIndex"]["colIndex"])
            if result:
                newStoreConv = result["newStoreConv"]
                result  = runConversition(obj,expectation=expectation,storeConv=result["newStoreConv"],allConversition=allConversition,initIntent=initIntent,lastConv=storeConv[len(storeConv)-1],loop=True,loopTracker=loopTracker,alltravleItems=alltravleItems,memorize=memorize,chat_property=chat_property)
                if result["type"] == ConversitionStap.PUT_MULTIITEM:
                    doc = {}
                    doc["type"]  =  ConversitionStap.ACTIVE_LOOP
                    rebuildConv = newStoreConv + result["items"]
                    doc["items"] = rebuildConv
                    return doc
                elif result["type"] == ConversitionStap.PUT_SINGLE_ITEM:
                    newStoreConv.append(result["item"])
                    doc = {}
                    doc["type"]  =  ConversitionStap.ACTIVE_LOOP
                    doc["items"] = newStoreConv
                    return doc
                elif ConversitionStap.FINAL_DEFAULT:
                    
                    result  = runConversition(obj,expectation=expectation,storeConv=storeConv,allConversition=allConversition,initIntent=initIntent,lastConv=storeConv[len(storeConv)-1],loopTracker=False,alltravleItems=alltravleItems,memorize=memorize,chat_property=chat_property)
                    doc = {}
                    if result["type"] == ConversitionStap.CHECK_LAST:
                        doc["type"]  =  ConversitionStap.CHECK_LAST
                        return doc
                    elif result["type"] == ConversitionStap.PUT_SINGLE_ITEM:
                       return result
                    elif result["type"] == ConversitionStap.PUT_MULTIITEM:
                        return result
                else:
                     doc["type"]  =  ConversitionStap.FINAL_DEFAULT
                     doc["lastConv"] = {"unknowledgeable":"intent","from":"loop track"}
                     return doc
                
                
            

        if storeConv[0]["intent"] == obj["intent"] and obj["nextConv"] !=None  and subAlternative==False  and storeConv[0]["id"]== obj["id"]:
            
            deleteFromStart = storeConv[1:]
            result  = runConversition(obj["nextConv"],expectation=expectation,storeConv=deleteFromStart,allConversition=allConversition,initIntent=initIntent,lastConv=storeConv[len(storeConv)-1],loopTracker=loopTracker,alltravleItems=alltravleItems,memorize=memorize,chat_property=chat_property)
            if result!=None:
                return result
        elif checkAlternativeConv(obj["alterConv"], storeConv[0]):
            
            deleteFromStart = storeConv[0:]
            subAlternative = False
            if storeConv[0]["passAlternative"]:
                 deleteFromStart = storeConv[1:]
                 subAlternative = True
            findBloc  = checkAlternativeConv(obj["alterConv"], storeConv[0])
            result  = runConversition(findBloc,expectation=expectation,storeConv=deleteFromStart,allConversition=allConversition,initIntent=initIntent,subAlternative=subAlternative,lastConv=storeConv[len(storeConv)-1],loopTracker=loopTracker,alltravleItems=alltravleItems,memorize=memorize,chat_property=chat_property)
            if result!=None:
                 return result  
        else:
            if checkBackOne(lastConv,expectation,obj) and loop==False and checkLastOne:
                doc = {}
                doc["type"] = ConversitionStap.CHECK_LAST
                result  = checkBackOne(lastConv,expectation,obj)
                doc["lastConv"] = result
                return doc
            doc = {}
            doc["type"]  =  ConversitionStap.FINAL_DEFAULT
            doc["lastConv"] = {"unknowledgeable":"intent","from":"new add"}
            return doc
    else:
       
        
        if checkNext(obj=obj,expectation=expectation,chat_property=chat_property,memorize=memorize):
            doc = {}
            doc["item"] = checkNext(obj=obj,expectation=expectation)
            doc["type"] = ConversitionStap.PUT_SINGLE_ITEM
            
            if doc["item"]["loopActive"]["active"] and doc["item"]["loopActive"]["returnIndex"]["colIndex"] == "any" :
                
                redoc = {}
                redoc["type"] = ConversitionStap.TOPIC_BRACK_FROM_NEXT
                redoc["item"] = doc["item"]
                return redoc
            return doc
        elif  checkAlternative(obj["alterConv"],expectation=expectation,allConversition=allConversition,initIntent=initIntent,chat_property=chat_property,memorize=memorize) :
           
            result  = checkAlternative(obj["alterConv"],expectation=expectation,allConversition=allConversition,initIntent=initIntent,chat_property=chat_property,memorize=memorize)
            
            doc = {}
            try:
                listOfBloc = []
                result["parentBloc"]
                
                if result["loopActive"]["active"] and result["loopActive"]["returnIndex"]["colIndex"]=="any" and  result["parentBloc"]["intent"]=="any":
                   
                    doc["type"] = ConversitionStap.TOPIC_BRACK
                    doc["item"] = {
                        "intent":result["travleBloc"]["brackIntent"] ,
                        "response":result["prevBlocRes"]
                    } 
                    return doc
                
                if result["loopActive"]["active"] and  result["parentBloc"]["intent"]=="any" and not (result["loopActive"]["returnIndex"]["colIndex"]=="any" or result["loopActive"]["returnIndex"]["colIndex"]=="" or result["loopActive"]["returnIndex"]["colIndex"]==" " ):
                    
                    
                    loopTravle = []
                    for item in alltravleItems:
                        loopTravle.append(item)
                        if result["loopActive"]["returnIndex"]["colIndex"] == item["id"]:
                            break
                    doc["type"] = ConversitionStap.TOPIC_BRACK_CHILD_LOOP
                    doc["items"] = loopTravle
                    doc["response"] = result["prevBlocRes"]
                    return doc
                
                try:
                    if result["brack_topic_next"]==None and result["parentBloc"]["intent"]=="any" and result["loopActive"]["active"]==False:
                   
                        doc["type"] = ConversitionStap.RETRY_TOPIC
                        doc["response"] = result["prevBlocRes"]
                        return doc
                except:
                    pass

                if result["loopActive"]["active"] and result["loopActive"]["returnIndex"]["colIndex"]=="any":
                    
                    redoc = {}
                    redoc["type"] = ConversitionStap.TOPIC_BRACK_FROM_NEXT
                    redoc["item"] = result
                    
                    return redoc
                
                

                listOfBloc.append(result["parentBloc"])
                del result["parentBloc"]
                listOfBloc.append(result)
                doc["items"] = listOfBloc
                doc["type"] = ConversitionStap.PUT_MULTIITEM
               
                return doc
            except:
                try:
                    listOfBloc = []
                    
                    result["brack_topic"]
                    
                    if result["loopActive"]["active"]:
                        
                        
                        if result["loopActive"]["returnIndex"]["colIndex"]=="any" or result["loopActive"]["returnIndex"]["colIndex"]=="" or result["loopActive"]["returnIndex"]["colIndex"]==" ":
                            
                            doc["type"] = ConversitionStap.TOPIC_BRACK
                            doc["item"] = {"intent":result["intent"],'response':result["travleBloc"]["response"]}
                            return doc
                        else:
                            try:
                                
                                result["parentBloc"]
                                listOfBloc.append(result["parentBloc"])
                                del result["parentBloc"]
                                listOfBloc.append(result)
                                doc["items"] = listOfBloc
                                doc["response"] = result["prevBlocRes"]
                                doc["type"] = ConversitionStap.PUT_MULTIITEM
                                return doc
                            except:
                                doc["type"] = ConversitionStap.PUT_SINGLE_ITEM
                                doc["response"] = result["prevBlocRes"]
                                doc["item"] = result["travleBloc"]
                            return doc
                    else:
                        
                        if  result["brack_topic_next"] ==None:
                            doc["type"] = ConversitionStap.RETRY_TOPIC
                            doc["response"] = result["prevBlocRes"]
                            return doc
                        else:
                            
                            doc["type"] = ConversitionStap.PUT_SINGLE_ITEM
                            doc["response"] = result["prevBlocRes"]
                            doc["item"] = result["travleBloc"]
                            return doc
                           
                except:
                    
                    if result["loopActive"]["returnIndex"]["colIndex"] and result["loopActive"]["active"]:
                        
                        redoc = {}
                        redoc["type"] = ConversitionStap.TOPIC_BRACK_FROM_NEXT
                        redoc["item"] = result
                        return redoc
                    
                    doc["type"] = ConversitionStap.PUT_SINGLE_ITEM
                    doc["item"] = result
                    return doc
        elif checkBackOne(lastConv,expectation,obj) and loop==False and checkLastOne:
            
            doc = {}
            doc["type"] = ConversitionStap.CHECK_LAST
            result  = checkBackOne(lastConv,expectation,obj)
            doc["lastConv"] = result
            return doc
        elif  checkSecunce(alltravleItems,expectation) and loop==False :
            result  = checkSecunce(alltravleItems,expectation)
            doc = {}
            doc["type"]  =  ConversitionStap.SECUNCE_HANDLER
            doc["items"] = result
            return doc
            pass
            
            
        elif defaultHandle(obj,chat_property=chat_property,memorize=memorize) and loop==False:
            result  = defaultHandle(obj,chat_property=chat_property,memorize=memorize)
            doc = {}
            doc["loopActive"] = None
            if result["loopActive"]["active"] and result["loopActive"]["returnIndex"]["colIndex"]!="":
                doc["items"] = result["loopActive"]
            doc["type"] = ConversitionStap.PRIVATE_DEFAULT
            doc["response"] = result["response"]
            return doc
        else :
          
            doc = {}
            doc["type"]  =  ConversitionStap.FINAL_DEFAULT
            doc["lastConv"] = {"unknowledgeable":"intent","from":"new add"}
            
            return doc







































def chatManager(conversitionBloc,intent,travleConv,fullConersition,initIntent,response=None,memorize={},chat_property={}):
    gotIntence = runConversition(conversitionBloc,expectation=intent,storeConv=travleConv,allConversition=fullConersition,initIntent=initIntent,alltravleItems=travleConv,memorize=memorize,chat_property=chat_property)
    doc = {}
    if ConversitionStap.PUT_SINGLE_ITEM == gotIntence["type"]:
           if callable(response):
               doc["response"] = gotIntence["item"]["response"]
               response(doc)
           travleConv.append(gotIntence["item"])
           return travleConv
    elif ConversitionStap.PUT_MULTIITEM == gotIntence["type"]:
        if callable(response):
               doc["response"] =gotIntence["items"][1]["response"]
               if gotIntence["items"][0]["intent"] == "any":
                    # print(len(gotIntence["items"]))
                    pass
               response(doc)
        newConvList = travleConv+gotIntence["items"]
        return newConvList
    elif ConversitionStap.CHECK_LAST == gotIntence["type"]:
        if callable(response):
               
               doc["response"] = travleConv[len(travleConv)-1]["response"]
               response(doc)
        return travleConv
    elif ConversitionStap.ACTIVE_LOOP == gotIntence["type"]:
        if callable(response):
               doc["response"] = gotIntence["items"][len(gotIntence["items"])-1]["response"]
               response(doc)
        return gotIntence["items"]
    elif ConversitionStap.TOPIC_BRACK == gotIntence["type"]:
        reuslt  = searchConv(fullConersition,gotIntence["item"]["intent"],chat_property=chat_property,memorize=memorize)
        if callable(response):
               doc["response"] = reuslt["response"]+ gotIntence["item"]["response"]
               response(doc)

        return [reuslt["itemObject"]]
       
    elif ConversitionStap.RETRY_TOPIC == gotIntence["type"]:
      
        if callable(response):
               doc["response"] =  gotIntence["response"]
               response(doc)
        return travleConv
    elif ConversitionStap.TOPIC_BRACK_FROM_NEXT == gotIntence["type"]:
        reuslt  = redirectConvSecounce(travleConv,chat_property=chat_property,memorize=memorize,fullConersition=fullConersition)
        if callable(response):
               doc["response"] = gotIntence["item"]["response"] + reuslt["response"]
               response(doc)
        
        return [reuslt["item"]]
    elif ConversitionStap.PRIVATE_DEFAULT==gotIntence["type"]:
        if callable(response):
               doc["response"] =gotIntence["response"]
               response(doc)
        return travleConv
    elif ConversitionStap.SECUNCE_HANDLER==gotIntence["type"]:
        if callable(response):
               doc["response"] = gotIntence["items"][len(gotIntence["items"])-1]["response"] 
               response(doc)
        return gotIntence["items"]
    
    elif ConversitionStap.TOPIC_BRACK_CHILD_LOOP==gotIntence["type"]:
        if callable(response):
               doc["response"] = gotIntence["response"]
               response(doc)
        return gotIntence["items"]


    else:
         
         if callable(response):
            #    print(gotIntence)
               doc["response"] = ["finalDefault.response"]
               response(doc)
         doc = {}
         doc["type"]  =  ConversitionStap.FINAL_DEFAULT
         doc["lastConv"] = {"unknowledgeable":"intent","from":"new add"}
         return doc
    
class CreateConversation:
    memorize = {
          "test":"DEBUG-VAL"
    }
    chat_property = {}
    travleConv = []
    __allConversition = parsed_data
    currentConversition = None
    onResponse = None
    def responseHandler(self,obj):
        if callable(self.onResponse):
            list_of_res = []
            list_of_action = []
            build_response = []
            for item in obj["response"]:
                if ".response" in item:
                    list_of_res.append(item)
                elif ".action" in item:
                    list_of_action.append(item)
            for item in list_of_res:
                if item=="finalDefault.response":
                    getResponse = getResponseItems("finaldefault.build")
                    if getResponse is not  None:
                       build_response.append(getResponse)
                    continue
                getResponse = getResponseItems(item.replace(".response",""))
                if getResponse is not  None:
                       build_response.append(getResponse)
                       continue
            newResponse = replace_variables(build_response,self.memorize)
            self.onResponse({
                "response":newResponse,
                "responseInfo":obj
            })
    

    def injectIntent(self, intent):
        # intent,_ = predict(message)
        if self.currentConversition == None:
            result  = searchConv(self.__allConversition,intent=intent,chat_property=self.chat_property,memorize=self.memorize)
            
            if result==False:
                self.responseHandler({'response': ['finalDefault.response']})
                return False
            else:
                self.currentConversition = result["itemObject"]
       
        convsequence  = chatManager(self.currentConversition,intent,self.travleConv,self.__allConversition,self.currentConversition["intent"],response=self.responseHandler,memorize=self.memorize,chat_property=self.chat_property)
       
        
        
        if isinstance(convsequence, list):
          if convsequence[0]["intent"]==self.currentConversition["intent"] and convsequence[0]["id"]==self.currentConversition["id"]:
              self.travleConv=convsequence
          else:
               self.travleConv=convsequence
               reuslt  = searchConv(self.__allConversition,intent=convsequence[0]["intent"],chat_property=self.chat_property,memorize=self.memorize)
               self.currentConversition = reuslt["itemObject"]
            



def onRes(value):
    print(value)
    pass


newc = CreateConversation()
newc.onResponse = onRes
newc.injectIntent("asdasd")
newc.injectIntent("oasdam")
newc.injectIntent("oam")

# newc.injectIntent("conf.asdasd")
# newc.injectIntent("conf.bye")
# newc.injectIntent("conf.asdasd")


# newc.injectIntent("conf.asdasd")
# newc.injectIntent("new_intent")
# newc.injectIntent("conf.new_intent")


















