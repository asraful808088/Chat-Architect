const deleteItems = require('../../../../operation/crud/delete/delete')
const getScriptsItemns = require('../../../../get_for_client/scripts/scripts')
const path  = require("path")
module.exports  = function({ socket, msg }){
    const filePath = path.join(__dirname,"../../../../chats/scripts/")
   const reuslt  =  deleteItems({filePath,name:msg.name,customExtension:".scripts"})
    if (!reuslt) {
        // do some thing later
    }
    const getData = getScriptsItemns()
    socket.emit("scriptsItemsPass",{items:getData,passRule:"delete"})
    
}