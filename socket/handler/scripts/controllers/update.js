const updateScripts = require("./../../../../post_for_client/scripts/update");
module.exports = function ({ socket, msg }) {
  if (msg.updateItems) {
    const result = updateScripts({ data: msg.updateItems });
    if (result) {
      socket.emit("openScripts", {
        item: msg.updateItems,
      });
    }
  }
};
