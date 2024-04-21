const saveCode  = require('../../operation/crud/post/save')
const path  = require('path')

module.exports = function(name,code){
    const filePath = path.join(__dirname,`./../../chats/conditions/${name}.condition/`)
    const result  = saveCode({filePath,name:"run",fileExt:".py",data:code,customExtension:""})
    if (result) {
        return code
    }
    
}