def are_lists_equal(list1, list2):
    if len(list1) != len(list2):
        return False
    list1_sorted = sorted(list1, key=lambda x: x['id'])
    list2_sorted = sorted(list2, key=lambda x: x['id'])
    for obj1, obj2 in zip(list1_sorted, list2_sorted):
        if obj1['id'] != obj2['id']:
            return False
    return True
def loophandler(storeConv=[],expectation="",loopId=None):
    if len(storeConv)==0:
        return False
    if expectation=="" or expectation==None:
        return False
    if loopId==None:
        return False
    newStoreConv = []
    convObj = None
    for item in storeConv:
        newStoreConv.append(item)
        if item["id"]==loopId.strip():
            convObj =  item
            break
    if are_lists_equal(storeConv,newStoreConv):
        return False
    else:
        if newStoreConv[len(newStoreConv)-1]["passAlternative"]:
            newStoreConv = newStoreConv[0:len(newStoreConv)-1]
        return {"newStoreConv" :newStoreConv,"convObj":convObj}