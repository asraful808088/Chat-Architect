const deleteItems = require("../../../../operation/crud/delete/deleteDir");
const getAllCondition = require("./../../../../get_for_client/conditions/actions");
const path = require("path");
module.exports = function ({ msg, socket }) {
  const filePath = path.join(
    __dirname,
    "./../../../../chats/conditions/",
    `${msg.name}.condition`
  );
  const result = deleteItems(filePath);
  if (result) {
    const conditionData = getAllCondition();
    const items = conditionData?.map((element,index)=>({name:element?.items?.name,des:element?.items?.des}))
    socket.emit("passCondition", {
      items: items,
    });
  }
};
