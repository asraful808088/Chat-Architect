const update = require("../../../../post_for_client/intent/create");
module.exports = function({msg, socket}){
    
    const result = update(msg.name, msg.des,msg.items,msg.options);
    
}