const getfileDetails = require('./../../operation/crud/get/getdataFromFile')
const path  = require('path')

module.exports = function(name){
    const filePath = path.join(__dirname,'../../chats/synonyms/')
    const result  = getfileDetails({filePath,name,customExtension:".synonyms"})
    return result
}