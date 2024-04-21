const getItems = require("../../../../get_for_client/synonyms/getItems");
module.exports = function ({ msg, socket }) {
  const result = getItems();
  if (result) {
    socket.emit("collectItems", {
      items: result,
    });
  }
};
