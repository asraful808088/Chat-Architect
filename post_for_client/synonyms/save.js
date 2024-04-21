const path = require('path')
const saveItem  = require('../../operation/crud/post/save')

module.exports = function(name,des,items){
    const filePath = path.join(__dirname,'../../chats/synonyms/')
    const result  = saveItem({name,filePath,customExtension:".synonyms",data:{name,des,items:items??[]}})
    return result
}