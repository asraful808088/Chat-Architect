const eitherOpenOrCreateFile  =  require('../../../../get_for_client/scripts/get')
module.exports = function({ socket, msg }){
    const result  = eitherOpenOrCreateFile({name:msg.name??"unset",des:msg.des??"unset",})
    if (result) {
        socket.emit("scriptsItemsPass", {
          items: result,
        });
      } else {
        socket.emit("scriptsItemsPass", {
          items: [],
        });
      }
}