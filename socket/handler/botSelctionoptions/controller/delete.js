const deleteProject = require("./../../../../operation/crud/deletedirWithItems/delete");
const fs = require("fs");
const path = require("path");
const {getBotFilesItems} = require('./get')
module.exports = function ({ msg, socket }) {
  const botPath = path.join(__dirname, "../../../../bot/", msg.name);
  deleteProject(botPath);
  const allItems = getBotFilesItems()
  socket.emit("collectBots",{
    items:allItems
})
};
