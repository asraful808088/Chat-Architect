const readout = require("./../../../../../operation/crud/get/readout");
const path = require("path");
const save = require("./../../../../../operation/crud/post/save");

function addProfile({ socket, msg }) {
  const result = save({
    filePath: path.join(__dirname, "../../../../../ai_config/model"),
    name: msg.name,
    customExtension: "_model",
    data: msg.value,
  });
  if (result) {
    const reuslt = readout(
      path.join(__dirname, "./../../../../../ai_config/model/"),
      "_model"
    );
    const profilesNames = reuslt?.map((element) =>
      element.replace(".json", "")
    );
    socket.emit("chatBot_build_profile", { data: profilesNames });
  }
}

module.exports = addProfile;
