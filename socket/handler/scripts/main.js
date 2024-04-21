const getFiles = require('./controllers/getFileItems')
const getItems = require('./controllers/getItems')
const createItems = require('./controllers/createItems')
const deleteItems = require('./controllers/deleteFiles')
const updateScripts = require('./controllers/update')
module.exports = function(msg, socket){
    if (msg.type=="getFiles") {
        getFiles({socket:socket,msg:msg})
    }else if (msg.type=="getItems") {
        getItems({socket,msg})
    }else if (msg.type=="deleteFiles") {
        deleteItems({socket,msg})
    }else if (msg.type=="updateItems") {
        updateScripts({socket,msg})
    }else if (msg.type=="createItem") {
        createItems({socket,msg})
    }
    
}