const fs = require("fs");
const path = require("path");

function deleteFolderRecursive(target) {
  if (fs.existsSync(target)) {
    fs.readdirSync(target).forEach((file, index) => {
      const curPath = path.join(target, file);
      if (fs.lstatSync(curPath).isDirectory()) {
        deleteFolderRecursive(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(target);
  } else {
  }
}
function copyFolderRecursive(source, target) {
  try {
    if (!fs.existsSync(target)) {
      fs.mkdirSync(target);
    } else {
      deleteFolderRecursive(target);
      fs.mkdirSync(target);
    }

    const items = fs.readdirSync(source);

    items.forEach((item) => {
      const sourcePath = path.join(source, item);
      const targetPath = path.join(target, item);

      if (fs.statSync(sourcePath).isDirectory()) {
        copyFolderRecursive(sourcePath, targetPath);
      } else {
        fs.copyFileSync(sourcePath, targetPath);
      }
    });
  } catch (err) {}
}

module.exports = copyFolderRecursive;
