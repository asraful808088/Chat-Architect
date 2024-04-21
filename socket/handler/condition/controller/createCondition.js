const createItem = require('./../../../../post_for_client/condition/create')

module.exports = function({msg, socket}){
    const result  = createItem(msg.name,msg)
    if (result.result) {
        const items = result.items?.map((element,index)=>({name:element.items.name,des:element.items.des,}))
        socket.emit("passCondition",{items:items})
    }else{
        socket.emit("passCondition",{items:null})
    }
    
}