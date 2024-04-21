const getScripts = require('../../../get_for_client/scripts/get')
const postScripts = require('../../../operation/crud/post/save')
const path  = require('path')
module.exports =  function(botName,scriptsName){
    const name = botName??"default"
    const modelItems = getScripts({name:scriptsName})
    postScripts({name:"model",filePath:path.join(__dirname,'../../../bot/',name),customExtension:"",data:modelItems.items})
}