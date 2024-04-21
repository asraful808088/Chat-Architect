from enum import Enum
class ConditionType(Enum):
    ola:0
    ola2:1
    ol3:2
    
def decision(condition):
    if condition==ConditionType.ola:    
        return "ola"
    elif condition==ConditionType.ola2:    
        return "ola2"
    elif condition==ConditionType.ol3:    
        return "ol3"
    else:
         return "none"
        
    