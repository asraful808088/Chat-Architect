const getItemsFromfiles = require("../../operation/crud/get/getdataFromFile");
const path = require("path");

module.exports = function ({ name, des }) {
  const filePath = path.join(__dirname, "../../chats/scripts/");
  const result = getItemsFromfiles({
    filePath,
    name,
    customExtension: ".scripts",
    autoCreate: true,
    data: { name: name, des, items: [] },
  });
  return result;
};
