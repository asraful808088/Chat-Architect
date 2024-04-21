const path = require("path");
const getItems = require("../../operation/crud/get/readout");
const createFile = require("../../operation/crud/post/save");
const deleteItem = require("../../operation/crud/delete/deleteDir");
const createFolder = require("../../operation/crud/post/createDir");
const getAllCondition = require('./../../get_for_client/conditions/actions')
function makeIFCondition({ index, element }) {
  return `${
    index == 0 ? "if" : "    elif"
  } condition==ConditionType.${element}:    
        return "${element}"\n`;
}
function prodessCode(items = ["demo1", "demo2"]) {
  const pycode = `from enum import Enum
class ConditionType(Enum):
    ${items.map((element, index) => `${element}:${index}\n    `).join("")}
def decision(condition):
    ${items
      .map((element, index) => makeIFCondition({ index, element }))
      .join("")}
    else:
         return "none"
        
    `;
  return pycode;
}

function runCode(name,items){
  const runcode = `from .${name} import ConditionType,decision
###${items.map((element, index) => `${element}`)}
def run_${name}(memo,chat_intence):
  return # mandatory
  `
  return runcode
}

module.exports = function (name, msg) {
  const folderPath = path.join(__dirname, "./../../chats/conditions/");
  const getAllFolder = getItems(folderPath, ".condition", "");
  if (getAllFolder.includes(`${name}.condition`)) {
    const result = deleteItem(path.join(folderPath, `${name}.condition`));
    const createResult = createItem(folderPath, name, msg);
    const getAllItems = getAllCondition();
    return { result: createResult, items: getAllItems };
  } else {
    const result = createItem(folderPath, name, msg);
    const getAllItems = getAllCondition();
    
    return { result: result, items: getAllItems };
  }
};

function createItem(dirPath, name, msg) {
  const readyPath = path.join(dirPath, `${name}.condition`);
  const result = createFolder(readyPath);
  const readyJsonObj = {
    name: msg.name,
    des: msg.des,
    multiType: msg.items,
    binaryType: true,
    setValue: msg.items[0],
  };
  const reuslt = createFile({
    name: "typeOfCondition",
    filePath: readyPath,
    data: readyJsonObj,
    customExtension: "",
  });
  const pyReuslt = createFile({
    name: name,
    filePath: readyPath,
    data: prodessCode(readyJsonObj.multiType),
    customExtension: "",
    fileExt: ".py",
  });
  const runPyReuslt = createFile({
    name: "run",
    filePath: readyPath,
    data: runCode(name,readyJsonObj.multiType),
    customExtension: "",
    fileExt: ".py",
  });
  if (reuslt && pyReuslt && runPyReuslt) {
    return true;
  } else {
    return false;
  }
}
