const fs = require("fs");
module.exports = function (folderPath) {
  try {
    fs.rmSync(folderPath, { recursive: true });;
    return true;
  } catch (err) {
    return false;
  }
};
