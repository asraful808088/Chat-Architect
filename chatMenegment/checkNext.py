import sys
sys.path.append('./')
from function import functionBook
def checkNext(obj,expectation="",memorize={},chat_property={}):
    if obj["intent"]==expectation:
        
        if obj["prefixfunc"]!=None:
            try:
                funcResult = functionBook[obj["prefixfunc"]["name"]](memorize,chat_property)
                if obj["prefixfunc"]["setValue"] == funcResult[0]: 
                    gotLoopAndRes = [item for item in obj["preBuildAlternative"] if item["type"]["value"] == obj["prefixfunc"]["setValue"]]
                    loopfun = None
                    for itemOfLoop in obj["conditionItems"]["items"]:
                        if itemOfLoop["value"]==obj["prefixfunc"]["setValue"]:
                            loopfun = itemOfLoop["loopActive"]
                   
                    gotInfo = gotLoopAndRes[0] 
                   
                    try:
                        
                         

                        return {
                        "intent":expectation,
                        "passAlternative":False,
                        "currentAlternative":False,
                        "id":obj["id"],
                        "index":obj["index"],
                        "defaultValue":obj["prefixfunc"]["setValue"],
                         "loopActive":loopfun,
                         "response":gotInfo["response"],
                         "sequence":obj["sequence"],
                         "memo":funcResult[1]
                        }
                    except:
                        
                        return None
                else:
                   
                    return None
            except:
                print("x123123123123123")
                return None
        else:
            try:
                return {
                "response":obj["response"],
                "intent":expectation,
                "passAlternative":False,
                "currentAlternative":False,
                "id":obj["id"],
                "index":obj["index"],
                "loopActive":obj["loopActive"],
                "sequence":obj["sequence"],
                 "memo":None
            }
            except:
                return None
    else:
        return None