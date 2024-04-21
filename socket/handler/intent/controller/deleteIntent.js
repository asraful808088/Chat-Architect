const deleteItem = require('../../../../operation/crud/delete/delete')
const allIntentsInfo = require("./../../../../get_for_client/intent/getintent");
const path  = require('path')
module.exports = function({msg, socket}){
    const basePath = path.join(__dirname,'../../../../chats/intents/')
    const result  = deleteItem({filePath:basePath,name:msg.name,customExtension:".intent"})
    if (result) {
     deleteItem({filePath:basePath,name:`${msg.name}.fewWrong`,customExtension:".intent"})
     deleteItem({filePath:basePath,name:`${msg.name}.fullWrong`,customExtension:".intent"})
        const reuslt = allIntentsInfo();
        const allMainIntent = reuslt.filter(element=>!element.name.includes('.'))
        socket.emit("collectIntent", { items: allMainIntent });
    }
}