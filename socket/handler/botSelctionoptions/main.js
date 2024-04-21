const create = require("./controller/create");
const deleteBot = require("./controller/delete");
const start = require("./controller/start");
const stop = require("./controller/stop");
const { getBots } = require("./controller/get");

module.exports = function (msg, socket) {
  if (msg.type == "create") {
    create({ msg, socket });
  } else if (msg.type == "delete") {
    deleteBot({ msg, socket });
  } else if (msg.type == "start") {
    start({ msg, socket });
  } else if (msg.type == "stop") {
    stop({ msg, socket });
  } else if (msg.type == "get") {
    getBots({ msg, socket });
  }
};
