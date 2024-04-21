
const {
  storeRuningtask,
  runChatBot,
} = require("../../../../task/childProcess");
module.exports = function ({ msg, socket }) {
  if (Object.keys(storeRuningtask).length == 0) {
    runChatBot(msg.name, (event) => {
      if (event.type == "start") {
        storeRuningtask.runningChatbot = msg.name
        socket.emit("startChatBot", {
          name: msg.name,

        });
      } else if (event.type == "stop") {
         if (storeRuningtask.runningChatbot) {
          delete storeRuningtask["runningChatbot"]
         }
        socket.emit("botStartFailed", {
          name: msg.name,
        });
      }
    });
  } else {
    try {
      if (storeRuningtask[msg.activeBot]["closeServer"]) {
        storeRuningtask[msg.activeBot]["closeServer"]();
        runChatBot(msg.name, (event) => {
          storeRuningtask["closeServer"] =event.closeServer
          if (event.type == "start") {
            storeRuningtask.runningChatbot = msg.name
            socket.emit("startChatBot", {
              name: msg.name,
            });
          } else if (event.type == "stop") {
            if (storeRuningtask.runningChatbot) {
              delete storeRuningtask["runningChatbot"]
             }
            socket.emit("botStartFailed", {
              name: msg.name,
            });
          }
        });
        return;
      }
    } catch (error) {
      if (storeRuningtask[storeRuningtask.runningChatbot]["closeServer"]) {
        storeRuningtask[storeRuningtask.runningChatbot]["closeServer"]();
        runChatBot(msg.name, (event) => {
          storeRuningtask["closeServer"] =event.closeServer
          if (event.type == "start") {
            storeRuningtask.runningChatbot = msg.name
            socket.emit("startChatBot", {
              name: msg.name,
            });
          } else if (event.type == "stop") {
            if (storeRuningtask.runningChatbot) {
              delete storeRuningtask["runningChatbot"]
             }
            socket.emit("botStartFailed", {
              name: msg.name,
            });
          }
        });
        return;
      }
    }
    socket.emit("botStartFailed", {
      name: msg.name,
    });
  }
};
