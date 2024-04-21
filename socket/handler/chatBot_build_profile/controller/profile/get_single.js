const readout = require("./../../../../../operation/crud/get/readout");
const path = require("path");
const save = require("./../../../../../operation/crud/post/save");
const getProfile = require("../../../../../operation/crud/get/getdataFromFile");

function addProfile({ socket, msg }) {
  const result = getProfile({
    filePath: path.join(__dirname, "../../../../../ai_config/model/"),
    name: msg.name,
    customExtension: "_model",
  });
  if (result) {
    socket.emit("single_model_get", { model: result });
  }
}

module.exports = addProfile;
