const { storeRuningtask } = require("../../../../task/childProcess");
module.exports = function ({ msg, socket }) {
  try {
    storeRuningtask[msg.name]["closeServer"]()
    if (storeRuningtask.runningChatbot) {
      delete storeRuningtask["runningChatbot"]
     }
    socket.emit("botStop", {});
  } catch (error) {
    console.log(error)
  }
};
