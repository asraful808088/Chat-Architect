def checkSecunce(alltravleItems,expectation):
    newStore = []
    for item in alltravleItems:
        if item["intent"]==expectation and alltravleItems[len(alltravleItems)-1]["sequence"]==False:
            newStore.append(item)
            return newStore
        else:
            newStore.append(item)
    return False