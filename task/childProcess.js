const { spawn } = require("child_process");
const storeRuningtask = {};
function runChatBot(name, callback) {
  const pythonServer = spawn("python", [`bot/${name ?? "default"}/server.py`]);
  function closeServer() {
    const treeKill = require("tree-kill");
    const trackInterval = setInterval(() => {
        if (storeRuningtask[name ?? "default"]) {
            clearInterval(trackInterval);
        }
        treeKill(storeRuningtask[name ?? "default"].pid, "SIGINT", (err) => {
            if (err) {
                console.error("Error while stopping the process:", err);
            } else {
                console.log("Process stopped successfully.");
            }
        });
    }, 500);
}
  pythonServer.stdout.on("data", (data) => {
    if (data.includes(`Serving Flask app 'server'`)) {
      
      if (callback) {
        storeRuningtask["mode"] = "start"
        storeRuningtask[name ?? "default"] = pythonServer;
        storeRuningtask ["closeServer"] = closeServer;
        storeRuningtask [name ?? "default"]["closeServer"] = closeServer;
        callback({  closeServer, type: "start" });
      }
    }
  });
  pythonServer.on("exit", (code, signal) => {
    
    if (callback) {
      
      callback({ type: "stop" });
      delete storeRuningtask[name ?? "default"];
    delete storeRuningtask[name ?? "default"] 
    delete  storeRuningtask["closeServer"]
    delete storeRuningtask["mode"] 
      return;
    }
    callback({ type: "failed" });

  });

  
}



module.exports = {storeRuningtask,runChatBot}