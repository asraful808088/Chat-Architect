import jwt
import datetime
import time

SECRET_KEY = 'test'


payload = {
    'user_id': 123,
    'username': 'example_user',
    'exp': int(time.time() * 1000) + (1 * 60 * 1000)  # Expiration time
}


token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')

print("Generated token:", token)
