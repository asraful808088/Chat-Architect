const openCode = require('../../../../get_for_client/conditions/openCode')
module.exports  = function({ msg, socket }){
    const reuslt  = openCode(msg.name)
    if (reuslt!=null) {
        socket.emit("code",{
            code:reuslt,
            name:msg.name
        })
        
    }
}