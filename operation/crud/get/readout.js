const fs = require("fs");
const path = require("path");

function getFItems(directoryPath, dynamicExtension,fileExt = ".json", partialFilename = null) {
  try {
    const files = fs.readdirSync(directoryPath);

    if (partialFilename) {
      const filteredFiles = files.filter((file) => {
       
        const fullFilename = partialFilename + dynamicExtension+fileExt;
        return file.toLowerCase().includes(fullFilename.toLowerCase());
      });

      return filteredFiles;
    } else {
      const filteredFiles = files.filter(
        (file) => file.includes(dynamicExtension)
      );
      return filteredFiles;
    }
  } catch (error) {
    return [];
  }
}
module.exports = getFItems;
