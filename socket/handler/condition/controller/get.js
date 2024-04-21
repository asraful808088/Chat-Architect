const getAllCondition = require("./../../../../get_for_client/conditions/actions");
module.exports = function ({ msg, socket }) {
  const conditionData = getAllCondition();
  if (conditionData.length != 0) {
    const items = conditionData?.map((element,index)=>({name:element?.items?.name,des:element?.items?.des}))
    socket.emit("passCondition", {
      items: items,
    });
  } else {
    socket.emit("passCondition", {
      items: [],
    });
  }
};
