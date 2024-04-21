def checkBackOne(storeConv,expectation):
    if storeConv == None or  expectation == None:
        return False
    if storeConv["intent"]==expectation:
        return storeConv
    else:
        return False
