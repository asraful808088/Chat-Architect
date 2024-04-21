const gotDetails = require('./../../../../operation/crud/get/getdataFromFile')
const saveDetails = require('../../../../operation/crud/post/save')
const path  = require('path')
module.exports = function({ msg, socket }){
    const basePath  = path.join(__dirname,"../../../../chats/intents/")
    // console.log(msg.item.name)
    const result  = gotDetails({filePath:basePath,name:msg.item.name,customExtension:".intent"})
    const newItems = result.items.filter((element)=>element.id!=msg.item.id)
    result.items = newItems


    if (result.intents) {
        const updateIntent = result.intents.filter(element=>element.id!=msg.item.id)
    result.intents = updateIntent
    }
    
    const confResult  = gotDetails({filePath:basePath,name:`conf.${msg.item.name}`,customExtension:".intent"})
    if (confResult) {
        const confUpdateItem = confResult.items.filter(element=>element.id!=msg.item.id)
        confResult.items = confUpdateItem
        saveDetails({filePath:basePath,name:`conf.${msg.item.name}`,customExtension:".intent",data:confResult})
    }


    const fullWrongResult  = gotDetails({filePath:basePath,name:`fullWrong.${msg.item.name}`,customExtension:".intent"})
    if (fullWrongResult) {
        const fullWrongResultItem = confResult.items.filter(element=>element.id!=msg.item.id)
        fullWrongResult.items = fullWrongResultItem
        saveDetails({filePath:basePath,name:`fullWrong.${msg.item.name}`,customExtension:".intent",data:fullWrongResult})
    }
    try {
        const reuslt1  = saveDetails({filePath:basePath,name:msg.item.name,customExtension:".intent",data:result})
    } catch (error) {
        
    }


    const updateResult  = gotDetails({filePath:basePath,name:msg.name,customExtension:".intent"})
    if (updateResult?.name && updateResult?.des) {
        socket.emit("collectIntentDetails",{
            item:updateResult
        })
    }
    
}