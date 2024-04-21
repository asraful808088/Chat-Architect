from enum import Enum
class ConditionType(Enum):
    asdasd:0
    asdasd132:1
    
def decision(condition):
    if condition==ConditionType.asdasd:    
        return "asdasd"
    elif condition==ConditionType.asdasd132:    
        return "asdasd132"

    else:
         return "none"
        
    