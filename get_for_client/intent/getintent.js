const getAllfiles = require("./intent");
const getfiles = require("./../../operation/crud/get/getdataFromFile");
const path = require("path");
module.exports = function () {
  const allIntents = getAllfiles();
  const getIntentInfo = allIntents?.map((element) => {
    const basePath = path.join(__dirname, "./../../chats/intents/");
    const gotInfo = getfiles({
      filePath: basePath,
      name: element,
      customExtension: ".intent",
    });
    return {
      name: gotInfo.name,
      des: gotInfo.des,
    };
  });
  return getIntentInfo;
};
