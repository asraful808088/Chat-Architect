const getScripts = require('../../../get_for_client/scripts/get')
const extrackIntenceFromScripts = require('../../../preprocess/extrackModelIntence/extrackModelIntence')
const buildData = require('./../../../data/build/build')
module.exports = function({msg, socket}){
    const travleItems = []
    const result  = getScripts({name:msg.itemName})
    if (!buildData.buildRunning) {
        if (result) {
            const extrackResult =  extrackIntenceFromScripts(result,(info)=>{
                travleItems.push(info)
                socket.emit("checkInfoForBuilding",{
                    type:"travleItemsShow",
                    items:travleItems
                })
            })
            buildData.storeBuildData = extrackResult
            buildData.storeLayerData = travleItems
            socket.emit("checkInfoForBuilding",{
                type:"uniqueTravleItemsShow",
                items:extrackResult,
                travleItems
            })
            
        }
    } else {
        socket.emit("checkInfoForBuilding",{
            type:"travleItemsShow",
            items:buildData.storeLayerData
        })
        socket.emit("checkInfoForBuilding",{
            type:"uniqueTravleItemsShow",
            items:buildData.storeBuildData,
            travleItems:buildData.storeLayerData
        })
    }
   
}