const allIntentsInfo = require("./../../../../get_for_client/intent/getintent");
module.exports = function ({ msg, socket }) {
  const reuslt = allIntentsInfo();
  const allMainIntent = reuslt.filter(element=>!element.name.includes('.'))
  socket.emit("collectIntent", { items: allMainIntent });
};
