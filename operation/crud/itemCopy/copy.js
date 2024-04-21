const fs = require('fs')
function copyFileSync(source, target) {
    let fileContents = fs.readFileSync(source);
    fs.writeFileSync(target, fileContents);
}
module.exports = copyFileSync