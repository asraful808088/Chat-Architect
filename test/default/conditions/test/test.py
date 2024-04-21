from enum import Enum
class ConditionType(Enum):
    hold:0
    hold2:1
    
def decision(condition):
    if condition==ConditionType.hold:    
        return "hold"
    elif condition==ConditionType.hold2:    
        return "hold2"

    else:
         return "none"
        
    