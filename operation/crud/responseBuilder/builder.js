const copy  = require('./../../../operation/crud/itemCopy/copy')
const path  = require('path')
const fs = require('fs')
function checkAndCreateDir(dirPath) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath);
    } 
}
module.exports =  function(botName,listOfResposne){
    const name = botName??"default"
    const responses = listOfResposne.filter(element=>element.includes(".response"))
    const actions = listOfResposne.filter(element=>element.includes(".action"))
    for (const iterator of responses) {
        const resPath  = path.join(__dirname,'../../../chats/response/',`${iterator}.json`)
        const desSrc  = path.join(__dirname,'../../../bot/',name,"/response/",`${iterator}.json`)
        copy(resPath,desSrc)
    }
    checkAndCreateDir(path.join(__dirname,'../../../bot/',name,"/actions/"))
    for (const iterator of actions) {
        const actionPath  = path.join(__dirname,'../../../chats/actions/',`${iterator}.py`)
        const desSrc  = path.join(__dirname,'../../../bot/',name,"/actions/",`${iterator.replace(".action","")}.py`)
        copy(actionPath,desSrc)
    }
}