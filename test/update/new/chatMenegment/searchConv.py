from function import functionBook
def searchConv(listOfconv,intent,chat_property,memorize):
    for item in listOfconv:
        if item['intent']== intent:
                            try:
                                if item["prefixfunc"]!=None:
                                    funcResult = functionBook[item["prefixfunc"]["name"]](chat_property,memorize)
                                    if funcResult[0] == item["prefixfunc"]["setValue"]:
                                         gotLoopAndRes = [item2 for item2 in item["preBuildAlternative"] if item2["type"]["value"] == item["prefixfunc"]["setValue"]]
                                         gotInfo = gotLoopAndRes[0]
                                         try:
                                             response = gotInfo["response"]
                                             convItem={
                                             "intent":item['intent'],
                                             "passAlternative":False,
                                             "id":item["id"],
                                             "index":item["index"],
                                             "defaultValue":item["prefixfunc"]["setValue"],
                                             "response":response,
                                             "loopActive":gotInfo["type"]["loopActive"],
                                             "sequence":item["sequence"] ,
                                             "currentAlternative":False,
                                                "memo":funcResult[1]
                                             }
                                             return {"item":convItem,"response":response}
                                         except:
                                        
                                             return False

                                    elif len(item["alterConv"])!=0:
                                        for subItem in item["alterConv"]:
                                            funcResult = functionBook[subItem["prefixfunc"]["name"]](chat_property,memorize)
                                            if funcResult[0] == subItem["prefixfunc"]["setValue"]:
                                                try:
                                                    response = subItem["response"]
                                                    convItem={
                                                        "memo":funcResult[1],
                                                     "intent":subItem["intent"],
                                                     "passAlternative":False,
                                                     "id":subItem["id"],
                                                     "index":subItem["index"],
                                                     "defaultValue":subItem["prefixfunc"]["setValue"],
                                                     "response":response,
                                                     "loopActive":subItem["loopActive"],
                                                     "sequence":subItem["sequence"],
                                                     "currentAlternative":True,
                                                     } 
                                                    return {"item":convItem,"response":response}
                                                except:
                                                    return False

                                else:
                                   try:
                                        response = item["response"]
                                        convItem =  {
                                             "intent":item['intent'],
                                             "passAlternative":False,
                                             "id":item["id"],
                                             "index":item["index"],
                                             "sequence":item["sequence"],
                                             "loopActive":item["loopActive"],
                                             "response":response,
                                             "currentAlternative":False,
                                             "memo":None
                                             }
                                        return {"item":convItem,"response":response,"itemObject":item}

                                   except:
                                       print("xx")
                                       return False
                            except:
                                print("xx")
                                return False