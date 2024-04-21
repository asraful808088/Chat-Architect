const deleteIcon = require("../../../../operation/crud/delete/delete");
const getAllItemsData = require("../../../../get_for_client/response/getResponse");
const path = require("path");
module.exports = function ({ msg, socket }) {
  const filePath = path.join(__dirname, "../../../../chats/response/");
  const result = deleteIcon({
    filePath,
    name: msg.name,
    customExtension: ".response",
  });
  if (result) {
    const getData = getAllItemsData();
    if (getData) {
      socket.emit("collect", {
        items: getData,
      });
    }
  }
};
