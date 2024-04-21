const updateCode  = require('../../../../post_for_client/condition/update')
module.exports = function({ msg, socket }){
    updateCode(msg.name,msg.code)
    
    
}