const createIntent = require("../../../../post_for_client/intent/create");
const allIntentsInfo = require("./../../../../get_for_client/intent/getintent");
module.exports = function ({ msg, socket }) {
  const result = createIntent(msg.newName, msg.newDescrition,[],msg.options);
  
  if (result) {
    const reuslt = allIntentsInfo();
    const allMainIntent = reuslt.filter(element=>!element.name.includes('.'))
    socket.emit("collectIntent", { items: allMainIntent });
  }
};
