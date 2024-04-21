const getcode  = require('./../../operation/crud/get/getdataFromFile')

const path  = require("path")
module.exports = function(name){
    const filePath  = path.join(__dirname,'./../../chats/conditions/',`${name}.condition/`)
    const result  = getcode({filePath,name:"run",isNotJson:true,fileExt:".py"})
    return result
}