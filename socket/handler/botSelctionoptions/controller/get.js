const getFileItems = require('../../../../operation/crud/get/readout')
const getItemsDetails = require('../../../../operation/crud/get/getdataFromFile')
const fs = require('fs')
const path = require('path')

function getBotFilesItems(){
    const botsPath  = path.join(__dirname,'../../../../bot/')
    const fileItems = getFileItems(botsPath,"","")
    const filterName = fileItems.filter(element=>{
        const configpath  = path.join(botsPath,element)
        const result  =  getItemsDetails({filePath:configpath , name:"config",customExtension:""})
        if (!result) {
            return false
        }
        return true
    })
    return filterName
}
const getBots  = ({ msg, socket })=>{
    const filesItems = getBotFilesItems()
    socket.emit("collectBots",{
        items:filesItems
    })
}

module.exports = {getBots,getBotFilesItems}