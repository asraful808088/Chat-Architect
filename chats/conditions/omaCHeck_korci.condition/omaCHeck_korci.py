from enum import Enum
class ConditionType(Enum):
    this :0
    it :1
    
def decision(condition):
    if condition==ConditionType.this :    
        return "this "
    elif condition==ConditionType.it :    
        return "it "

    else:
         return "none"
        
    