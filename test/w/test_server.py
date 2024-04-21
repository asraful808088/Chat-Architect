from flask import Flask, request, g,redirect,url_for
from dotenv import load_dotenv
from token_encode_decoder import is_valid_token
import os
app = Flask(__name__)
load_dotenv()
SECRET_KEY = os.getenv("CASK")


@app.route('/')
def index():
      try:
        req_data = request.json
        if req_data["type"] == "dev":  
           return redirect("/api/communication/dev")
        elif req_data["type"] == "prod":
              if req_data["storage_mode"] == "DB":
                   return redirect("/api/communication/DB")
              elif req_data["storage_mode"] == "client":
                   return redirect("/api/communication/client")
              return redirect("/api/failed")
      except:
           return redirect("/api/failed")
      return redirect("/api/failed")











@app.route('/api/communication/client', methods=['POST'])
def conversation_response_client():
    return "send_response() client"

@app.route('/api/communication/DB', methods=['POST'])
def conversation_response_DB():
    return "send_response() DB"

@app.route('/api/communication/dev', methods=['POST'])
def conversation_response_dev():
    return "send_response() dev"

@app.route('/api/failed') # auth failed 
def conversitoin_access_failed():
    # data = {'message': 'Hello, world!'}
    return "jsonify(data)"

























if __name__ == '__main__':
    app.run(debug=True,port=9000)
