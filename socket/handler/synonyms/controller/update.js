const updatedata = require('../../../../post_for_client/synonyms/save')
module.exports = function({msg, socket}){
    const result   =  updatedata(msg.name,msg.des,msg.items)
}