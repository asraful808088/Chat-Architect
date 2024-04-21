const gotDetails = require('./../../../../operation/crud/get/getdataFromFile')
const path  = require('path')

module.exports = function({msg, socket}){
    const basePath  = path.join(__dirname,"../../../../chats/intents/")
    const result  = gotDetails({filePath:basePath,name:msg.name,customExtension:".intent"})
    if (result?.name && result?.des) {
        socket.emit("collectIntentDetails",{
            item:result
        })
    }
}