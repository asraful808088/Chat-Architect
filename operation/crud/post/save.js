const fs = require("fs");
const path = require("path");

function saveDataToJsonFile({
  filePath,
  name,
  customExtension,
  data,
  fileExt,
}) {
  try {
   
    const fileName = `${name}${
      name.includes(customExtension) ? "" : customExtension
    }${fileExt ?? ".json"}`;
    const fullFilePath = path.join(filePath, fileName);
    fs.writeFileSync(
      fullFilePath,
      fileExt == ".json" || fileExt == "" || fileExt == null
        ? JSON.stringify(data, null, 2)
        : data
    );
    return true;
  } catch (error) {
    console.log(name)
    return false;
  }
}
module.exports = saveDataToJsonFile;
