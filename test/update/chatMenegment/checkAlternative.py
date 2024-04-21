import sys
sys.path.append('./')
from  chatMenegment.function import functionBook
def checkAlternative(alternatives=[],expectation="",allConversition=[],initIntent=None,chat_property={},memorize={}):
    if len(alternatives)==0:
        return False
    findAltervative = [item for item in alternatives if item["type"]=="alternative"]
    newAlternative = [item for item in alternatives if item["type"]=="new alternative"]
    break_topic = [item for item in alternatives if item["type"]=="break topic"]
    
    
    













    print("-------------------------")
    print("-------------------------")
    print("-------------------------")
    print("-------------------------")
    print("-------------------------")
    print(expectation)
    print("-------------------------")
    print("-------------------------")
    print("-------------------------")
    print("-------------------------")

    if len(findAltervative)!=0:
       
        for item in findAltervative:
            if item["intent"]==expectation:
               
                   try:
                    
                      funcResult = functionBook[item["prefixfunc"]["name"]](chat_property,memorize)
                     

                      if funcResult[0] == item["prefixfunc"]["setValue"]:
                        return {
                          "intent":expectation,
                          "passAlternative":False,
                          "id":item["id"],
                          "index":item["index"],
                          "defaultValue":item["prefixfunc"]["setValue"],
                          "response":item["response"],
                          "loopActive":item["loopActive"],
                          "sequence":item["sequence"],
                        "currentAlternative":False,
                        "memo":funcResult[1]
                        

                            }
                   except:
                       print("xxxxxxxxxxxxxxxxxxxxx")
                       return False 

                   



















    if len(newAlternative)!=0:
        for item in newAlternative:
          if item["intent"]==expectation:
            try:
                if item["prefixfunc"]!=None:
                    funcResult = functionBook[item["prefixfunc"]["name"]](chat_property,memorize)
                    if funcResult[0] == item["prefixfunc"]["setValue"]:
                         gotLoopAndRes = [item2 for item2 in item["preBuildAlternative"] if item2["type"]["value"] == item["prefixfunc"]["setValue"]]
                         gotInfo = gotLoopAndRes[0]
                         try:
                             return {
                             "intent":expectation,
                             "passAlternative":False,
                             "id":item["id"],
                             "index":item["index"],
                             "defaultValue":item["prefixfunc"]["setValue"],
                             "response":gotInfo["response"],
                             "loopActive":gotInfo["type"]["loopActive"],
                             "sequence":item["sequence"] ,
                             "currentAlternative":False,
                                "memo":funcResult[1]
                             }
                         except:
                            
                             return False
                         
                    elif len(item["alterConv"])!=0:
                        for subItem in item["alterConv"]:
                            funcResult = functionBook[subItem["prefixfunc"]["name"]](chat_property,memorize)
                            if funcResult[0] == subItem["prefixfunc"]["setValue"]:
                                try:

                                    return {
                                        "memo":funcResult[1],
                                     "intent":subItem["intent"],
                                     "passAlternative":False,
                                     "id":subItem["id"],
                                     "index":subItem["index"],
                                     "defaultValue":subItem["prefixfunc"]["setValue"],
                                     "response":subItem["response"],
                                     "loopActive":subItem["loopActive"],
                                     "sequence":subItem["sequence"],
                                     "currentAlternative":True,
                                      "parentBloc":{
                                           "intent":expectation,
                                            "passAlternative":True,
                                            "id":item["id"],
                                            "index":item["index"],
                                            "currentAlternative":False,

                                      }
                                     } 
                                except:
                                    return False
               
                else:
                   try:
                        return {
                             "intent":expectation,
                             "passAlternative":False,
                             "id":item["id"],
                             "index":item["index"],
                             "sequence":item["sequence"],
                             "loopActive":item["loopActive"],
                             "response":item["response"],
                             "currentAlternative":False,
                             "memo":None
                             }
            
                   except:
                       return False
            except:
                return False



























## have to update 

    if len(break_topic)!=0:
      if break_topic[0]["prefixfunc"] == None:
        for item in allConversition:
            if  initIntent!=expectation and  item["intent"]==expectation:
                 
                 try:
                     
                    return {
                           "memo":None,
                           "intent":expectation,
                           "passAlternative":False,
                           "id":item["id"],
                           "index":item["index"],
                           "response":item["response"],
                           "sequence":item["sequence"],
                           "currentAlternative":False,
                           "brack_topic":True,
                           "loopActive":break_topic[0]["loopActive"],
                            "brack_topic_next":break_topic[0]["nextConv"],
                            "brack_topic_bloc":break_topic[0],
                            "prevBlocRes":break_topic[0]["response"],
                            "travleBloc":{
                             "brackIntent":expectation,
                             "intent":"any",
                             "passAlternative":False,
                             "id":break_topic[0]["id"],
                             "index":break_topic[0]["index"],
                             "sequence":break_topic[0]["sequence"],
                             "loopActive":break_topic[0]["loopActive"],
                             "response":break_topic[0]["response"],
                             "currentAlternative":False,
                            }

                           }
                 except:
                     
                     return False
      else:
                funcResult = functionBook[break_topic[0]["prefixfunc"]["name"]](chat_property,memorize)
                if funcResult[0] == break_topic[0]["prefixfunc"]["setValue"]:
                  gotLoopAndRes = [item for item in break_topic[0]["preBuildAlternative"] if item["type"]["value"] == break_topic[0]["prefixfunc"]["setValue"]]
                  gotInfo = gotLoopAndRes[0]
                  try:
                             for item in allConversition:
                                if  initIntent!=expectation and  item["intent"]==expectation:
                                    return {
                                          "memo":None,
                                          "intent":expectation,
                                          "passAlternative":False,
                                          "id":item["id"],
                                          "index":item["index"],
                                          "response":item["response"],
                                          "sequence":item["sequence"],
                                          "currentAlternative":False,
                                          "brack_topic":True,
                                          "loopActive":gotInfo["type"]["loopActive"],
                                           "brack_topic_next":break_topic[0]["nextConv"],
                                           "brack_topic_bloc":break_topic[0],
                                           "prevBlocRes":gotInfo["response"],
                                           "travleBloc":{
                                            "brackIntent":expectation,
                                            "intent":"any",
                                            "passAlternative":False,
                                            "id":break_topic[0]["id"],
                                            "index":break_topic[0]["index"],
                                            "sequence":break_topic[0]["sequence"],
                                            "loopActive":break_topic[0]["loopActive"],
                                            "response":gotInfo["response"],
                                            "currentAlternative":False,
                                           },



                                           }
                  except:
                            
                             return False


                else:
                  for subItem in break_topic[0]["alterConv"]:
                      
                      funcResult = functionBook[break_topic[0]["prefixfunc"]["name"]](chat_property,memorize)
                      
                      if funcResult[0] == subItem["prefixfunc"]["setValue"]:
                           
                            try:
                                for item in allConversition:
                                    
                                    if  initIntent!=expectation and  item["intent"]==expectation:
                                                #  print(subItem["response"])
                                                 return {
                                                      "memo":None,
                                                      "intent":"any",
                                                      "passAlternative":False,
                                                      "id":subItem["id"],
                                                      "index":item["index"],
                                                      "response":item["response"],
                                                      "sequence":item["sequence"],
                                                      "currentAlternative":False,
                                                      "brack_topic":True,
                                                      "loopActive":subItem["loopActive"],
                                                       "brack_topic_next":subItem["nextConv"],
                                                       "brack_topic_bloc":break_topic[0],
                                                       "prevBlocRes":subItem["response"], 
                                                       "travleBloc":{
                                                        "brackIntent":expectation,
                                                        "intent":"any",
                                                        "passAlternative":False,
                                                        "id":item["id"],
                                                        "index":break_topic[0]["index"],
                                                        "sequence":break_topic[0]["sequence"],
                                                        "loopActive":break_topic[0]["loopActive"],
                                                        "response":break_topic[0]["response"],
                                                        "currentAlternative":False,
                                                       },
                                                       "parentBloc":{
                                                              "intent":"any",
                                                               "passAlternative":True,
                                                               "id":break_topic[0]["id"],
                                                               "index":break_topic[0]["index"],
                                                               "currentAlternative":False,

                                                         }

                                                       }

                            except:
                                return False          
              
    return False