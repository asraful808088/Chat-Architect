const getItems = require("./../../../../get_for_client/scripts/get");
module.exports = function ({ socket, msg }) {
  const result = getItems({ name: msg.name });
  socket.emit("openScripts", {
    item: result,
  });
};
