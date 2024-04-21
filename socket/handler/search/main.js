const getIntentController = require('./controller/get_intent')
const getResActionsController = require('./controller/get_resWithAction')
const getCondition = require('./controller/getCondition')
module.exports = function (msg, socket) {
  if (msg?.type == "intent") {
    getIntentController({ socket,msg });
  } else if (msg?.type == "res_action") {
    getResActionsController({ socket,msg });
  } else if (msg?.type == "condition") {
    getCondition({ socket,msg });
  }
};
