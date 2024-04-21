const createintent = require("./controller/createIntent");
const deleteintent = require("./controller/deleteIntent");
const getintentDetails = require("./controller/getDetails");
const updateintentDetails = require("./controller/update");
const syncNow = require('./controller/sync')
const getIntent = require("./controller/getIntent");
const deleteItem = require('./controller/deleteItem')
module.exports = function (msg, socket) {
  
  if (msg.type == "createIntent") {
    createintent({ msg, socket });
  } else if (msg.type == "get") {
    getIntent({ msg, socket });
  } else if (msg.type == "delete") {
    deleteintent({ msg, socket });
  } else if (msg.type == "openCode") {
    getintentDetails({ msg, socket });
  } else if (msg.type == "update") {
    updateintentDetails({ msg, socket });
  } else if (msg.type == "sync") {
    syncNow({ msg, socket });
  }
  else if (msg.type == "itemDelete") {
    deleteItem({ msg, socket });
  }
};
