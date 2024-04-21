const {ws,onMessage} = require("./../../client/client");
const buildData = require("../../../data/build/build");
module.exports = function({ msg, socket }){
    onMessage((value)=>{
        const result  = JSON.parse(value.toString())
        if (result instanceof Object) {
            if (result.type=="closeBuild") {
                buildData.buildRunning = false
                buildData.storeBuildData = null
                buildData.storeLayerData = null
                socket.emit("checkInfoForBuilding",{type:"buildDestroy"})
            }
        }
    })
    ws.send(JSON.stringify({type:"train_model",intent:"close"}))
}