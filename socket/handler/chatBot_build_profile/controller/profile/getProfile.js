const readout = require("./../../../../../operation/crud/get/readout");
const path = require("path");
function getProfile({socket}) {
  const reuslt = readout(
    path.join(__dirname, "./../../../../../ai_config/model/"),
    "_model"
  );
  const profilesNames = reuslt?.map((element)=>element.replace(".json",""))
  socket.emit("chatBot_build_profile", { data: profilesNames });
}

module.exports = getProfile;
