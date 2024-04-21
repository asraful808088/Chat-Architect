const getAllItemsData = require("../../../../get_for_client/response/getResponse");
module.exports = function ({ msg, socket }) {
  const getData = getAllItemsData();
  if (getData) {
    socket.emit("collect", {
      items: getData,
    });
  }
};
