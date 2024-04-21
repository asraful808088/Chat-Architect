const getItems = require("./../../../../get_for_client/synonyms/getItems");
const createItems = require("../../../../post_for_client/synonyms/save");
module.exports = function ({ msg, socket }) {
  const reuslt = createItems(msg.newName, msg.newDescrition);
  if (reuslt) {
    const getNewItems = getItems();
    socket.emit("collectItems", {
      items: getNewItems,
    });
  }
};
