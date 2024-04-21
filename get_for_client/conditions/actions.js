const getfiles = require("../../operation/crud/get/readout");
const getDatafromFiles = require("../../operation/crud/get/getdataFromFile");
const path = require("path");
function allConditions() {
  const conditionsPath = path.join(__dirname, "./../../chats/conditions/");
  const result = getfiles(conditionsPath, ".condition", "");
  const process = result?.map((element) => {
    const stap2 = element.replace(".condition", "");
    const resultData = getDatafromFiles({
      filePath: path.join(conditionsPath, element),
      name: "typeOfCondition",
    });
    return {
      name: stap2,
      items: resultData,
    };
  });
  return process;
}

module.exports = allConditions;
