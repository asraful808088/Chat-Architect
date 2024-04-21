const fs = require('fs');

module.exports = function(folderPath){
    try {
        fs.mkdirSync(folderPath, { recursive: true });
        return true
      } catch (err) {
        return false
      }
}