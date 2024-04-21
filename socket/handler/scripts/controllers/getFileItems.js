const getFilesItems = require("./../../../../get_for_client/scripts/scripts");

module.exports = function ({ socket, msg }) {
  const files = getFilesItems();
  if (files) {
    socket.emit("scripts", {
      items: files,
    });
  } else {
    socket.emit("scripts", {
      items: [],
    });
  }
};
