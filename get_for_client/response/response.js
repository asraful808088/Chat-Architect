const getfiles = require("../../operation/crud/get/readout");
const path = require("path");
function allResponse() {
  const result = getfiles(
    path.join(__dirname, "./../../chats/response/"),
    ".response",
    ".json"
  );
  const process = result?.map((element) => {
    const stap1 = element.replace(".json", "");

    return stap1;
  });
  return process;
}

module.exports = allResponse;
