const getItems  = require('./../../operation/crud/get/readout')
const getDataFromItem  = require('./../../operation/crud/get/getdataFromFile')
const path  = require('path')

module.exports  = function(){
    const filePath = path.join(__dirname,`../../chats/synonyms/`)
    const allItems = getItems(filePath,".synonyms",)
    const withdata =allItems.map((element)=>{
        const result =  getDataFromItem({filePath,name:element.replace(".json",""),customExtension:".synonyms"})
        return {
            name:result.name,
            des:result.des
        }
    }) 
    
    return withdata
}