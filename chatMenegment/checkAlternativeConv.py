import sys
sys.path.append('./')
def checkAlternativeConv(listofConv,currentCovFromlist):
    if len(listofConv)==0:
        return False
    for item in listofConv:
        
        if item["id"]==currentCovFromlist["id"]:
            return item
        elif len(item["alterConv"])!=0:
            
            for subItems in item["alterConv"]:
               
                if subItems["id"]==currentCovFromlist["id"]:
                    return subItems
    
    return False