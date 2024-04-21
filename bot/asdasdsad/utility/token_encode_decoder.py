import jwt
import time
def is_valid_token(key,token):
    try:
        decoded_payload = jwt.decode(token, key, algorithms=['HS256'])
        try:
            current_datetime = int(time.time() * 1000)
            if current_datetime > decoded_payload["exp"] :
                return None
            else:
                return decoded_payload
        except:
            return decoded_payload   
    except Exception as e:
        return None
    


def token_generate(key,data,expMin = None)-> str:
    
    create_obj = {
        "memorize":data["memorize"],
        "chat_property":data["chat_property"],
        "travleConv":data["travleConv"],
        "currentConversition":data["currentConversition"],
        "listOfConv":data["listOfConv"] 
    }
    if expMin is not None:
        timestamp = int(time.time() * 1000) + (expMin * 60 * 1000)
        create_obj["exp"] = timestamp
    token = jwt.encode(create_obj, key, algorithm='HS256')
    return token    