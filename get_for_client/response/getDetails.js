const getItemDetails = require('../../operation/crud/get/getdataFromFile')

const path = require('path')
module.exports = function(name){
    const filePath = path.join(__dirname,'./../../chats/response/') 
    const result  = getItemDetails({filePath,name: name,customExtension:".response"})
    
    return result
}