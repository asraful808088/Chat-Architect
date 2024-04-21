const saveItems = require('./../../operation/crud/post/save')
const path  = require('path')
module.exports = function(name,des,items){
    const filePath = path.join(__dirname,'../../chats/response/')
    const result  = saveItems({ filePath,name,customExtension:".response",data:{name,des,items:items??[]},})
    return result
}   