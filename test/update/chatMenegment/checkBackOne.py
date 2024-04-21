def checkBackOne(storeConv,expectation,obj):
    if obj["nextConv"] == None and len(obj["alterConv"])==0 and storeConv["intent"]==expectation:
        return storeConv
    if storeConv == None or  expectation == None:
        return False
    if storeConv["intent"]==expectation:
        return storeConv
    else:
        return False
