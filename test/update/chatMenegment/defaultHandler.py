from chatMenegment.function import functionBook
def defaultHandle(obj,chat_property={},memorize={}):
    print("Asdasdasdasdasdasdasdsadasd")
    if obj["defaultAlternative"]==None:
        return False
  
    try:
            if obj["defaultAlternative"]["prefixfunc"]!=None:
                 
                 for item in obj["defaultAlternative"]["preBuildAlternative"]:
                      try:
                            funcResult = functionBook[obj["defaultAlternative"]["prefixfunc"]["name"]](chat_property=chat_property,memorize=memorize)
                            if funcResult[0] ==item["type"]["value"]:
                              return {
                                    "response":item["response"],
                                    "loopActive":item["type"]["loopActive"],
                                    "mamo":funcResult[1]
                                    }
                      except:
                           return False
                      
            else:
                 return {
                      "response":obj["defaultAlternative"]["response"],
                      "loopActive":obj["defaultAlternative"]["loopActive"],
                      "mamo":None
                 }
            

            return False
    except:
        return False