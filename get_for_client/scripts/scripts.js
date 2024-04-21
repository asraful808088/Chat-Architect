const path  = require('path')
const getFileItems = require('./../../operation/crud/get/readout')
const getdataFromFiles = require('./../../operation/crud/get/getdataFromFile')
module.exports = function(){
    const filePath = path.join(__dirname,'../../chats/scripts/')
    const files = getFileItems(filePath,".scripts")
    const removeAnyExt = files?.map((element)=>{
        return element.replace(".scripts.json", "")
    })
    const extrackNessData = removeAnyExt.map((element)=>{
       const result  =  getdataFromFiles({filePath,name:element,customExtension:".scripts"})
       if (result) {
            return {
                name:result.name,
                des:result.des
            }
       }else{
        return null
       }
    })
    const nullFilter = extrackNessData.filter((element)=>element!=null)
    return nullFilter
}