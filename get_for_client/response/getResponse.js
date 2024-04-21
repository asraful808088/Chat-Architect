const getAllItemsName = require("./response");
const getItemsFromFile = require("../../operation/crud/get/getdataFromFile");
const path = require("path");
module.exports = function () {
  const result = getAllItemsName();
  const filePath = path.join(__dirname, "../../chats/response/");
  const getItemsData =  result.map((element) => {
    const result = getItemsFromFile({
      filePath,
      name: element,
      customExtension: ".response",
    });
    return { name: result.name ,des:result.des};
  });
  return getItemsData
};
