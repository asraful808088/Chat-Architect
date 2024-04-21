const getfiles = require('../../operation/crud/get/readout')
const path  = require('path')
function allIntents(){
    const result  = getfiles(path.join(__dirname,"./../../chats/intents/",),".intent")
    const process =  result?.map((element)=>{
        const stap1 =  element.replace(".json","")
        const stap2 = stap1.replace(".intent","")
        return stap2
    })
    return process
}

module.exports  = allIntents