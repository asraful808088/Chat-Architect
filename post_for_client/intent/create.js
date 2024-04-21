const createitem = require('../../operation/crud/post/save')
const path  = require('path')
module.exports = function(name,des,items,option={},fullData=null){
    const filePath = path.join(__dirname,"../../chats/intents/")
    const result  = createitem({filePath,name,customExtension:".intent",data:fullData??{name,des,items:items??[],option}})
    return result
}