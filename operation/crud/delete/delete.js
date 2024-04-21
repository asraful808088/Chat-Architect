const fs = require("fs");
const path = require("path");


1
function deleteJsonFile({ filePath, name, customExtension }) {
  
  try {
    const fileName = `${name}${
      name.includes(customExtension) ? "" : customExtension
    }.json`;
    const fullFilePath = path.join(filePath, fileName);
    if (fs.existsSync(fullFilePath)) {
      fs.unlinkSync(fullFilePath);
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}

module.exports = deleteJsonFile;
