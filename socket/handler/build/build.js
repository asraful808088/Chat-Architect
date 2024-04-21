const buildData = require("../../../data/build/build");
const path = require("path");
const getItems = require("../../../operation/crud/get/getdataFromFile");
const {ws,onMessage} = require("./../../client/client");
const copy  = require('../../../operation/crud/copy/copy')
const makeFunctions = require('../../../operation/crud/functionbuinder/builder')
const scriptBuilder = require('../../../operation/crud/modelBuilder/builder')
const responseBuilder = require('../../../operation/crud/responseBuilder/builder')
const fs = require('fs')
module.exports = function ({ msg, socket }) {
  const name =msg.name?? "default"
  const errorList = []
  const errorsintent = []
  const basePath = path.join(__dirname, "./../../../chats/intents/");
  let mainIntents = [];
  let modifyIntemt = [];
  const intentStorage = [];
  buildData.traningInfo = []
  mainIntents = buildData.storeBuildData.intent.filter(
    (element) => !(element.includes("conf.") || element.includes("fullWrong."))
  );
  modifyIntemt = buildData.storeBuildData.intent.filter(
    (element) => element.includes("conf.") || element.includes("fullWrong.")
  );
  for (const iterator of mainIntents) {
    const result = getItems({
      filePath: basePath,
      name: iterator,
      customExtension: ".intent",
    });
    if (result.intents) {
      for (const item of result.intents) {
        intentStorage.push({ intent: item.text, type: result.name });
        for (const text of item.simpleWrong) {
          intentStorage.push({ intent: text, type: result.name });
        }
      }
    }else{
      errorsintent.push(iterator)
    }
  }
  for (const iterator of modifyIntemt) {
    const result = getItems({
      filePath: basePath,
      name: iterator,
      customExtension: ".intent",
    });

    for (const iterator of result.items) {
      if (iterator["confWrong"]) {
        for (const text of iterator["confWrong"]) {
          intentStorage.push({ intent: text, type: result.name });
        }
      } else if (iterator["fullWrong"]) {
        for (const text of iterator["fullWrong"]) {
          intentStorage.push({ intent: text, type: result.name });
        }
      }
    }
  }



  buildData.buildWithServer = msg.buildWithServer;
  const layerList = reBuildlayers(msg.option.h_layers)
  const recreateOptions = {
    epoch: msg.option.epoch.active
      ? msg.option.epoch.active
      : msg.option.epoch.default,
    learningRate: msg.option.learningRate.active
      ? msg.option.learningRate.active
      : msg.option.learningRate.default,
    outputDim: msg.option.outputDim.active
      ? msg.option.outputDim.active
      : msg.option.outputDim.default,
    testingRate: msg.option.testingRate.active
      ? msg.option.testingRate.active
      : msg.option.testingRate.default,
    earlyStoping: msg.option.earlyStoping.enable
      ? {
          min_delta: msg.option.earlyStoping.default?.min_delta.active
            ? msg.option.earlyStoping.default?.min_delta.active
            : msg.option.earlyStoping.default?.min_delta.default,
          peti: msg.option.earlyStoping.default?.peti.active
            ? msg.option.earlyStoping.default?.peti.active
            : msg.option.earlyStoping.default?.peti.default,
          restore_best_weights:
            msg.option.earlyStoping.default.restore_best_weights,
        }
      : null,
    h_layers: layerList,
  };

if (intentStorage.length<100) {
  errorList.push({
    type:"less_intent"
  })
}
if (errorsintent.length !=0) {
  errorList.push({
    type:"empty_intent",
    items:errorsintent
  })
}
if (layerList.length==0) {
  errorList.push({
    type:"empty_layers"
  })
}


  if (errorList.length!=0) {
    socket.emit("checkInfoForBuilding",{type:"errors_Of_3_Stap",errors:errorList})
    return;
  }else{
    socket.emit("checkInfoForBuilding",{type:"readyToBuilding"})
  }
  let accessDataPass  =true
  onMessage((value)=>{
    const result  = JSON.parse(value.toString())
    if (result instanceof Array) {
      buildData.buildRunning = true
      socket.emit("checkInfoForBuilding",{type:"modelBuilding",value:result.reverse()})
    }else{
      if (result.type=="finishMainModel") {
        buildData.buildRunning = false
        const srcPath  = path.join(__dirname,'../../../chatMenegment')
        const botSrc  = path.join(__dirname,'../../../bot/',name,)
        
        try {
          const configfile = fs.readFileSync(`${botSrc}/config.json`)
        const tokenfile = fs.readFileSync(`${botSrc}/tokenizer.pickle`)
        const aimodelfile = fs.readFileSync(`${botSrc}/model.h5`)
        const modelPyfile = fs.readFileSync(`${botSrc}/model.py`)
        

        copy(srcPath,botSrc)
       
        responseBuilder(name, buildData.storeBuildData.response)
        scriptBuilder(name,msg.scriptName)
        fs.writeFileSync(`${botSrc}/config.json`,configfile)
        fs.writeFileSync(`${botSrc}/tokenizer.pickle`,tokenfile)
        fs.writeFileSync(`${botSrc}/model.h5`,aimodelfile)
        fs.writeFileSync(`${botSrc}/model.py`,modelPyfile)
        } catch (error) {
          console.log(error)
        }
        if (buildData.storeBuildData?.prefixfunc.length!=0) {
          
          makeFunctions(name,buildData.storeBuildData?.prefixfunc)
        }
        socket.emit("checkInfoForBuilding",{type:"traningFinished",traningData:result.data})
      }
    }
    
  })
  buildData.buildRunning = true
  ws.send(JSON.stringify({type:"train_model",option:recreateOptions,buildWithServer: msg.buildWithServer,name: name,intentWithType: intentStorage,intent:"start"}))
};




function reBuildlayers(items){
  const newItems = []
  for (const iterator of items) {
    if (iterator.type=="lstm") {
      newItems.push({
        id:iterator.id,
        type:"lstm",
        persep:iterator.persep.active?iterator.persep.active:iterator.persep.default,
        activation:iterator.activation,
        l1:iterator.l1.active?iterator.l1.active:iterator.l1.default?iterator.l1.default:null,
        l2:iterator.l2.active?iterator.l2.active:iterator.l2.default?iterator.l2.default:null,
      })
    }else  if (iterator.type=="dropout") {
      newItems.push({
        id:iterator.id,
        type:"dropout",
        rate:iterator.rate.active?iterator.rate.active:iterator.rate.default
      })
    }
  }
  return newItems
}