const getAllintent = require("../../../../get_for_client/intent/intent");
const searchbySort = require("./../../../../utility/search");
function getIntent({ socket, msg }) {
  const result = getAllintent();
  const sortItems = searchbySort({ wordsArray: result, text: msg.value });
  socket.emit("search", {
    items: sortItems,
    type: msg.type,
    id:msg.id
  });
}

module.exports = getIntent;
