const saveResponse = require("../../../../post_for_client/response/save");
const getAllItemsData = require("../../../../get_for_client/response/getResponse");
module.exports = function ({ msg, socket }) {
  const result = saveResponse(msg.newName, msg.newDescrition);
  if (result) {
    const getData = getAllItemsData();
    socket.emit("collect", {
      items: getData,
    });
  }
};
