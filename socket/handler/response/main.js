const create = require('./controller/create')
const getItems = require('./controller/getItems')
const deleteItems = require('./controller/delete')
const updateItems = require('./controller/update')
const itemsDetails = require('./controller/getDetails')
module.exports = function(msg, socket){
    if (msg.type=="create") {
        create({socket:socket,msg:msg})
    }else if (msg.type=="getItems") {
        getItems({socket,msg})
    }else if (msg.type=="delete") {
        deleteItems({socket,msg})
    }else if (msg.type=="update") {
        updateItems({socket,msg})
    }else if (msg.type=="getDetails") {
        itemsDetails({socket,msg})
    }
}