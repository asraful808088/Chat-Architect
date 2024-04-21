from enum import Enum
class ConditionType(Enum):
    haha:1
    haha2:2

def decision(condition):
    if condition == ConditionType.haha:
        return "haha"
    elif condition == ConditionType.haha2:
         return "haha2"
    else:
         return "none"
    


                           #####    main function ####
# # # # # # # 
# # # # # # # 
# # # # # # # 
# # # # # # # 
# # # # # # # 
# # # # # # # 
# # # # # # # 
# # # # # # # 
# # # # # # # 
# # # # # # # 
# # # # # # # 
# # # # # # # 
# # # # # # # 
# # # # # # # 
# # # # # # # 
# # # # # # # 
# # # # # # # 
# # # # # # # 
# # # # # # # 
# # # # # # # 
# # # # # # # 
# # # # # # # 
# # # # # # # 
# # # # # # # 
# # # # # # # 
# # # # # # # 
# # # # # # # 
# # # # # # # 
# # # # # # # 
# # # # # # # 
# # # # # # # 
# # # # # # # 
# # # # # # # 
# # # # # # # 
# # # # # # # 
# # # # # # # 
# # # # # # # 

def exemples():
    decision(condition=ConditionType.haha) 
