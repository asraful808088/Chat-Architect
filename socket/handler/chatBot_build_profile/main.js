const get_model_profile = require("./controller/profile/getProfile");
const add_model_profile = require("./controller/profile/addProfile");
const delete_model_profile = require("./controller/profile/deleteProfile");
const get_single = require("./controller/profile/get_single");
module.exports = function (msg, socket) {
  if (msg?.type == "get") {
    get_model_profile({ socket });
  } else if (msg?.type == "add") {
    add_model_profile({ socket, msg });
  } else if (msg?.type == "delete") {
    delete_model_profile({ socket, msg });
  } else if ("get_single" == msg?.type) {
    get_single({ socket, msg });
  }
};
