import jwt
import time
def is_valid_token(key,token):
    try:
        decoded_payload = jwt.decode(token, key, algorithms=['HS256'])
        if decoded_payload["exp"]==None:
            return decoded_payload
        current_datetime = int(time.time() * 1000)
        if current_datetime > decoded_payload["exp"] :
            return None
        return decoded_payload
    except:
        return None
    


def token_generate(key,data,expMin = None,listOfConv=[])-> str:
    timestamp = None
    if expMin is not None:
        timestamp = int(time.time() * 1000) + (expMin * 60 * 1000)
    token = jwt.encode({
        "memorize":data["memorize"],
        "chat_property":data["chat_property"],
        "travleConv":data["travleConv"],
        "currentConversition":data["currentConversition"],
        "exp":timestamp,
        "listOfConv":listOfConv
    }, key, algorithm='HS256')
    return token    