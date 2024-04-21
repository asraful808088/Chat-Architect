const readout = require("./../../../../../operation/crud/get/readout");
const deletefunc = require("../../../../../operation/crud/delete/delete");
const path = require("path");
function deleteProfile({ socket, msg }) {
  const result = deletefunc({
    filePath: path.join(__dirname, "./../../../../../ai_config/model/"),
    name: msg.name,
    customExtension: "_model",
  });
  if (result) {
    const realRead = readout(
       path.join(__dirname, "./../../../../../ai_config/model/"),
      "_model"
    );
    const profilesNames = realRead?.map((element) =>
      element.replace(".json", "")
    );
    socket.emit("chatBot_build_profile", { data: profilesNames });
  }
}

module.exports = deleteProfile;
