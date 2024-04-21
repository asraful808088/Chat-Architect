from .omaCHeck_korci import ConditionType,decision
### this ,it 
def run_omaCHeck_korci(memo):
  
  new_memo = memo
  new_memo['new_value'] = True
  return [decision(ConditionType.it),new_memo]
  
  