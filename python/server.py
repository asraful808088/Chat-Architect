import asyncio
import websockets
import json
from  tools.traningFunction import startTrain

async def handle_connection(websocket, path):
    try:
        print(f"Client connected: {websocket.remote_address}")
        async for message in websocket:
            parsed_data = json.loads(message)
            if parsed_data["type"]=="tokenTraning":
               await  startTrain(parsed_data["model"],parsed_data["index"],parsed_data,websocket)
            
    except websockets.exceptions.ConnectionClosed as e:
        print(f"Client disconnected: {websocket.remote_address}, code: {e.code}, reason: {e.reason}")

if __name__ == "__main__":
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    start_server = websockets.serve(handle_connection, "localhost", 8765)
    try:
        print("WebSocket server started.")
        loop.run_until_complete(start_server)
        loop.run_forever()
    except KeyboardInterrupt:
        print("Server shutting down.")
    finally:
        loop.close()
