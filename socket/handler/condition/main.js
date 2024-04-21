const createCondition = require("./controller/createCondition");
const getCondition = require("./controller/get");
const deleteConditions = require("./controller/delete");
const openCode = require("./controller/openCode");
const updateCode = require('./controller/update')
module.exports = function (msg, socket) {
  if (msg.type == "createCondition") {
    createCondition({ socket, msg });
  } else if (msg.type == "get") {
    getCondition({ socket, msg });
  } else if (msg.type == "delete") {
    deleteConditions({ socket, msg });
  } else if (msg.type == "openCode") {
    openCode({ socket, msg });
  } else if (msg.type == "update") {
    updateCode({socket,msg})
  }
};
