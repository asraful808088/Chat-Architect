const fs = require('fs');
const path = require('path');

function createOrUpdateJsonFile({  filePath, name, customExtension="", autoCreate, data,isNotJson,fileExt }) {
  try {
    const fileName = `${name}${name.includes(customExtension)?"":customExtension}${fileExt??".json"}`;
    const fullFilePath = path.join(filePath, fileName);
    
    if (fs.existsSync(fullFilePath)) {
      const existingContent = fs.readFileSync(fullFilePath, 'utf8');
      if (isNotJson) {
        return existingContent
      }
      const jsonData = JSON.parse(existingContent);
      return jsonData;
    } else if (autoCreate) {
      fs.writeFileSync(fullFilePath, JSON.stringify(data, null, 2));
      return data;
    } else {
      return null;
    }
  } catch (error) {
    
    return null;
  }
}

module.exports = createOrUpdateJsonFile