from chatMenegment.function import functionBook
def defaultHandle(obj):
    if obj["defaultAlternative"]==None:
        return False
  
    try:
            if obj["defaultAlternative"]["prefixfunc"]!=None:
                 for item in obj["defaultAlternative"]["preBuildAlternative"]:
                       if functionBook[obj["defaultAlternative"]["prefixfunc"]["name"]]() ==item["type"]["value"]:
                          return {
                                "response":item["response"],
                                "loopActive":item["type"]["loopActive"]
                                }
                      
            else:
                 return {
                      "response":obj["defaultAlternative"]["response"],
                      "loopActive":obj["defaultAlternative"]["loopActive"]
                 }
            

            return False
    except:
        return False