const response = require("./../../../../get_for_client/response/response");
const actions = require("./../../../../get_for_client/actions/actions");
const searchbySort = require("./../../../../utility/search");

function getResWithActions({ socket, msg }) {
  const responseResult = response();
  const actionsresult = actions();

  const sortItems = searchbySort({
    wordsArray: [...responseResult, ...actionsresult],
    text: msg.value,
  });
  socket.emit("search", {
    items: sortItems,
    type: msg.type,
    id:msg.id
  });
}

module.exports = getResWithActions;
