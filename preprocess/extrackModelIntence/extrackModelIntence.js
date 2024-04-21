const fs = require("fs");
const path = require("path");
function findIntence(model, intence = {}, callback = null) {
  let id = model["id"]
  let intent = model["intent"]
  let prefixfunc = null
  let resList = []
  intence["indexWithId"] = [
    ...intence["indexWithId"],
    { id: model["id"], index: model["index"] },
  ];
  if (model["intent"]) {
    intence["intent"] = [...intence["intent"], model["intent"]];
    
  }
  if (model["response"] && model["response"].length != 0) {
    intence["response"] = [...intence["response"], ...model["response"]];
    resList = model["response"]
    
  } else if (model["response"].length == 0 && model["prefixfunc"]) {
    for (const item of model["preBuildAlternative"]) {
      intence["response"] = [...intence["response"], ...item["response"]];
      resList = item["response"]
      
    }
  }

  if (model["prefixfunc"]) {
    intence["prefixfunc"] = [
      ...intence["prefixfunc"],
      model["prefixfunc"].name,
    ];
    prefixfunc =  model["prefixfunc"].name
  }
  if (model["nextConv"]) {
    findIntence(model["nextConv"], intence, callback);
  }
  if (model["alterConv"] && model["alterConv"].length != 0) {
    for (const item of model["alterConv"]) {
      findIntence(item, intence, callback);
    }
  }
  if (model["defaultAlternative"]) {
    findIntence(model["defaultAlternative"], intence, callback);
  }
  if (callback) {
    callback({
      id:id,
      intent:intent,
      prefixfunc:prefixfunc,
      response:resList,
      index:model["index"]
    })
  }
}

function travler(file, callback) {
  const storage = {
    indexWithId: [],
    intent: [],
    response: [],
    prefixfunc: [],
  };
  let parseData;
  try {
    parseData = JSON.parse(file);
  } catch (error) {
    parseData = file;
  }
  for (const singleItem of parseData.items) {
    findIntence(singleItem, storage, callback);
  }
  return {
    ...storage,
    intent:[...new Set(storage.intent)].filter(element=>!(element=="any" || element=="private-default")),
    response:[...new Set(storage.response)],
    prefixfunc:[...new Set(storage.prefixfunc)],
  };    
}

module.exports = travler
