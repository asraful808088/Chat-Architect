const fs = require('fs')
const path  = require('path')
const saveConfig = require('./../../../../operation/crud/post/save')
const {getBotFilesItems} = require('./get')
function createDirectoryIfNotExists(targetDir) {
    if (!fs.existsSync(targetDir)) {
        try {
            fs.mkdirSync(targetDir, { recursive: true });
        } catch (err) {
            console.error(`Error creating directory '${targetDir}':`, err);
        }
    }
}
module.exports = function({ msg, socket }){
    const targetpath  = path.join(__dirname,'../../../../bot/',msg.name)
    createDirectoryIfNotExists(targetpath)
    saveConfig({filePath:targetpath,name:"config",customExtension:"",data:{name:msg.name}})
    const allItems = getBotFilesItems()
    socket.emit("collectBots",{
        items:allItems
    })
}