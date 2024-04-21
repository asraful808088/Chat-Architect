const getIntents = require("../../../get_for_client/intent/getintent");
const getConditions = require("../../../get_for_client/conditions/actions");
const getCustomActions = require("../../../get_for_client/actions/actions");
const getResponse = require("../../../get_for_client/response/getResponse");
module.exports = function ({ msg, socket }) {
  const fileIssue = {
    intents: [],
    responses: [],
    actions: [],
    conditions: [],
  }; //not found files
  const intents = getIntents();
  const conditions = getConditions();
  const customActions = getCustomActions();
  const response = getResponse();

  const filterResponses = msg?.items?.response.filter((element) =>
    element.includes(".response")
  );
  const filterActions = msg?.items?.response.filter((element) =>
    element.includes(".action")
  );

  msg?.items?.intent?.forEach((element) => {
    for (const iterator of intents) {
      if (iterator.name == element) {
        return;
      }
    }

    fileIssue["intents"] = [...fileIssue["intents"], element];
  });

  socket.emit("checkInfoForBuilding", {
    type: "checkingFiles",
    items: fileIssue,
  });

  msg?.items?.prefixfunc?.forEach((element) => {
    for (const iterator of conditions) {
      if (iterator.name == element) {
        return;
      }
    }

    fileIssue["conditions"] = [...fileIssue["conditions"], element];
  });

  socket.emit("checkInfoForBuilding", {
    type: "checkingFiles",
    items: fileIssue,
  });

  filterResponses?.forEach((element) => {
    for (const iterator of response) {
      if (iterator.name == element.replace(".response", "")) {
        return;
      }
    }

    fileIssue["responses"] = [...fileIssue["responses"], element];
  });

  socket.emit("checkInfoForBuilding", {
    type: "checkingFiles",
    items: fileIssue,
  });

  filterActions?.forEach((element) => {
    for (const iterator of customActions) {
      if (iterator == element) {
        return;
      }
    }

    fileIssue["conditions"] = [...fileIssue["conditions"], element];
  });
  socket.emit("checkInfoForBuilding", {
    type: "checkingFiles",
    items: fileIssue,
  });

  socket.emit("checkInfoForBuilding", {
    type: "finishCheck",
    items: fileIssue,
  });
};
