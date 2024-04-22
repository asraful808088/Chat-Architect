from pymongo import MongoClient
# its just an examples....you can use others db
db = None
def init():
    global db
    client = MongoClient('mongodb://localhost:27017/') # hardcore set but you can db config use from .env file
    db = client['your_database_name']
    


def insert_doc(collection,data):
    mycollection = db[collection]
    mycollection.insert_one(data)




def update_doc(collection,data,target):
    mycollection = db[collection]
    mycollection.update_one(data, {'$set': target})



def delete_doc(collection,target):
    mycollection = db[collection]
    mycollection.delete_one(target)



def get_doc(collection,target):
    mycollection = db[collection]
    result = mycollection.find_one(target)