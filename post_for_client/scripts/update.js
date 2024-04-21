const saveData =  require('./../../operation/crud/post/save')
const path  = require('path')

module.exports  = function({data}){
    const filePath  = path.join(__dirname,'../../chats/scripts/')
    const result  = saveData({filePath,name:data.name,customExtension:".scripts",data})
    return result
}