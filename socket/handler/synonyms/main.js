const getDetails = require('./controller/itemDetails')
const create = require('./controller/create')
const deleteitem = require('./controller/detele')
const update = require('./controller/update')
const getItems = require('./controller/get')
module.exports = function(msg, socket){
    if (msg.type == "create") {
        create({ socket, msg });
      } else if (msg.type == "get") {
        getItems({ socket, msg });
      } else if (msg.type == "delete") {
        deleteitem({ socket, msg });
      } else if (msg.type == "getDetails") {
        getDetails({ socket, msg });
      } else if (msg.type == "update") {
        update({socket,msg})
      }
}