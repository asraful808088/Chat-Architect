const getfiles = require('../../operation/crud/get/readout')
const path  = require('path')
function allActions(){
    const result  = getfiles(path.join(__dirname,"./../../chats/actions/",),".action",".py")
    const process =  result?.map((element)=>{
        const stap1 =  element.replace(".py","")
        return stap1
    })
    return process
}

module.exports  = allActions