import sys
sys.path.append('./')
def oma():
    return [True,None]
functionBook={
    "test":oma
}


print(functionBook["test"]()[0])