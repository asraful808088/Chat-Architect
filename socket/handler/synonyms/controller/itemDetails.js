const getDetails = require("../../../../get_for_client/synonyms/getDetails");
module.exports = function ({ msg, socket }) {
  const result = getDetails(msg.name);
  if (result) {
    socket.emit("details", {
      item: result,
    });
  }
};
