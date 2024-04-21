import sys
sys.path.append('./')
from .function import functionBook
def checkNext(obj,expectation=""):
    if obj["intent"]==expectation:
        
        if obj["prefixfunc"]!=None:
            if obj["prefixfunc"]["setValue"] == functionBook["test"](): 
                gotLoopAndRes = [item for item in obj["preBuildAlternative"] if item["type"]["value"] == obj["prefixfunc"]["setValue"]]
                gotInfo = gotLoopAndRes[0] 
                try:
                    return {
                    "intent":expectation,
                    "passAlternative":False,
                    "currentAlternative":False,
                    "id":obj["id"],
                    "index":obj["index"],
                    "defaultValue":obj["prefixfunc"]["setValue"],
                     "loopActive":gotInfo["type"]["loopActive"],
                     "response":gotInfo["response"],
                     "sequence":obj["sequence"],
                    }
                except:
                    return None
            else:
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
                "sequence":obj["sequence"]
            }
            except:
                return None
    else:
        return None