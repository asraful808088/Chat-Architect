import sys
sys.path.append('./')
from  chatMenegment.function import functionBook
def checkAlternative(alternatives=[],expectation="",allConversition=[],initIntent=None):
    if len(alternatives)==0:
        return False
    findAltervative = [item for item in alternatives if item["type"]=="alternative"]
    newAlternative = [item for item in alternatives if item["type"]=="new alternative"]
    break_topic = [item for item in alternatives if item["type"]=="break topic"]
    
    
    
















    if len(findAltervative)!=0:
        for item in findAltervative:
            if item["intent"]==expectation:
               if functionBook[item["prefixfunc"]["name"]]() == item["prefixfunc"]["setValue"]:
                   try:
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
                        

                    }
                   except:
                       return False 

                   



















    if len(newAlternative)!=0:
        for item in newAlternative:
        #   print(item["id"])
        #   print(expectation)
          if item["intent"]==expectation:
                if item["prefixfunc"]!=None:
                    if functionBook[item["prefixfunc"]["name"]]() == item["prefixfunc"]["setValue"]:
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

                             }
                         except:
                            
                             return False
                         
                    elif len(item["alterConv"])!=0:
                        for subItem in item["alterConv"]:
                            if functionBook[subItem["prefixfunc"]["name"]]() == subItem["prefixfunc"]["setValue"]:
                                try:

                                    return {
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

                             }
                   except:
                       return False






























    if len(break_topic)!=0:
        
        for item in allConversition:
            if  initIntent!=expectation and  item["intent"]==expectation:
                 
                 try:
                     
                    return {
                           
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
                
              
    return False