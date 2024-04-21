const deleteItems = require("../../../../operation/crud/delete/delete");
const getItems = require("./../../../../get_for_client/synonyms/getItems");

const path = require("path");
module.exports = function ({ msg, socket }) {
  const filePath = path.join(__dirname, "../../../../chats/synonyms/");
  const result = deleteItems({
    filePath,
    name: msg.name,
    customExtension: ".synonyms",
  });
  if (result) {
    const getNewItems = getItems();
    socket.emit("collectItems", {
      items: getNewItems,
    });
  }
};
