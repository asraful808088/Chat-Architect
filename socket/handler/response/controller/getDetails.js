const getItemDetails = require('../../../../get_for_client/response/getDetails')
module.exports = function({msg, socket}){
    const result  = getItemDetails(msg.name)
    if (result) {
        socket.emit("itemDetails",{
            item:result
        })
    }
}