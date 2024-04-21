const saveResponse = require("../../../../post_for_client/response/save");
module.exports = function({msg, socket}){
    const result = saveResponse(msg.obj.name, msg.obj.des,msg.obj.items);
    
}