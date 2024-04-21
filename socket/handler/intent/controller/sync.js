const gotDetails = require("./../../../../operation/crud/get/getdataFromFile");
const path = require("path");
const getDetails = require("../../../../get_for_client/synonyms/getDetails");
const synExtrackFromSent = require("../../../../preprocess/synWordExtrack/extrack");
const csaProcess = require("./../../../../preprocess/crossAdjectSyn/process");
const WSAISProcess = require("../../../../preprocess/wholeSynAdjectOnly/process");
const letterPreprocess = require("../../../../preprocess/upperLowerCapitalize/process");
const wrongGenerator = require("./../../../../preprocess/wrongGenerate/Wrong");
const removePunc = require('../../../../preprocess/processByRemovePun/process')
const saveIntent = require('../../../../post_for_client/intent/create')

module.exports = function ({ msg, socket }) {
  const basePath = path.join(__dirname, "../../../../chats/intents/");
  const result = gotDetails({
    filePath: basePath,
    name: msg.name,
    customExtension: ".intent",
  });
  let generateFullWrong = [];
  let generateFewWrong = [];
  let generatefussyWrong = [];
  for (let index = 0; index < result.items.length; index++) {
    const element = result.items[index];
    if (element["process"] == false) {
      let allWordsSyn = {};
      let processSents = [];
      let simpleWrong = [];
      let confWrong = [];
      let fullWrong = [];

      if (element["defaultOptions"] == false) {
        if (true == element["option"]["PWGS"]["checked"]) {
          const result = element["option"]["PWGS"]["items"].forEach(
            (element) => {
              const result = getDetails(element);
              for (const iterator of result["items"]) {
                if (allWordsSyn[iterator.name] != null) {
                  const items = [
                    ...allWordsSyn[iterator.name],
                    ...iterator.items,
                  ];
                  allWordsSyn[iterator.name] = items;
                } else {
                  allWordsSyn[iterator.name] = iterator.items;
                }
              }
            }
          );
        }
        if (element["syn"]) {
          for (const iterator of element["syn"]) {
            if (allWordsSyn[iterator["mainWord"]] != null) {
              const items = [
                ...allWordsSyn[iterator["mainWord"]],
                ...iterator.items,
              ];
              allWordsSyn[iterator["mainWord"]] = items;
            } else {
              allWordsSyn[iterator["mainWord"]] = iterator.items;
            }
          }
        }
        const sent = element.text.trim();
        {
          allWordsSyn = synExtrackFromSent(sent, allWordsSyn);
        }

        if (true == element["option"]["CSA"]["checked"]) {
          const reuslt = csaProcess(sent, allWordsSyn);
          processSents = [...processSents, ...reuslt];
        }

        if (true == element["option"]["WSAIS"]["checked"]) {
          const reuslt = WSAISProcess(sent, allWordsSyn);
          processSents = [...new Set([...processSents, ...reuslt])];
        }

        if (element["option"]["letterProcess"]["checked"]) {
          const result = letterPreprocess(
            sent,
            element["option"]["letterProcess"]["uppercase"],
            element["option"]["letterProcess"]["lowercase"],
            element["option"]["letterProcess"]["capitalize"]
          );
          processSents = [...new Set([...processSents, ...result])];
        }

        if (element["option"]["FWG"]["checked"]) {
          let generatorSent = [];
          for (const iterator of processSents) {
            const result = wrongGenerator(iterator, {
              generateSimple: true,
              simplefolttryCount:
                element["option"]["FWG"]["tryToGenerateQuantity"],
              simpleSentCount: element["option"]["FWG"]["generateQuantity"],
              simpleWrongTh: element["option"]["FWG"]["WrongThreshold"],
            });
            generatorSent = [
              ...generatorSent,
              ...[...new Set(result.simpleWrong)],
            ];
          }
          simpleWrong = [...new Set(generatorSent)];
        }

        if (element["option"]["WGFA"]["checked"]) {
          let generatorSent = [];
          for (const iterator of processSents) {
            const result = wrongGenerator(iterator, {
              generateFew: true,
              fewfolttryCount:
                element["option"]["WGFA"]["tryToGenerateQuantity"],
              fewSentCount: element["option"]["WGFA"]["generateQuantity"],
              fewWrongTh: [
                element["option"]["WGFA"]["startWrongThreshold"],
                element["option"]["WGFA"]["endWrongThreshold"],
              ],
            });
            generatorSent = [
              ...generatorSent,
              ...[...new Set(result.fewWrong)],
            ];
          }
          confWrong = [...new Set(generatorSent)];
        }
        if (element["option"]["FLWG"]["checked"]) {
          let generatorSent = [];
          for (const iterator of processSents) {
            const result = wrongGenerator(iterator, {
              generateFull: true,
              fullfolttryCount:
                element["option"]["FLWG"]["tryToGenerateQuantity"],
              fullSentCount: element["option"]["FLWG"]["generateQuantity"],
              fullWrongTh: element["option"]["FLWG"]["WrongThreshold"],
            });
            generatorSent = [
              ...generatorSent,
              ...[...new Set(result.fullWrong)],
            ];
          }
          fullWrong = [...new Set(generatorSent)];
        }



        if (element["option"]["PBRP"]["checked"]) {
          if (element["option"]["PBRP"]["default"]["set"]) {
            const withProcess = removePunc(element.text)
            simpleWrong.push(withProcess)
          }else{
            const withProcess = removePunc(element.text,element["option"]["PBRP"]["custom"]["items"])
            simpleWrong.push(withProcess)
          }
        }













        generateFullWrong = [
          ...generateFullWrong,
          { text: element.text, fullWrong: fullWrong },
        ];
        generateFewWrong = [
          ...generateFewWrong,
          { text: element.text, confWrong: confWrong },
        ];
        generatefussyWrong = [
          ...generatefussyWrong,
          { text: element.text, simpleWrong: simpleWrong },
        ];
      } else {
        
        /**
         * 
         * 
         * 
         * 
         * 
         * 
         * 
         * 
         * 
         * 
         * 
         * 
         * 
         * 
         * 
         * 
         * 
         * 
         */
        if (true == result["option"]["PWGS"]["checked"]) {
          const getResult = result["option"]["PWGS"]["items"].forEach(
            (element) => {
              const result = getDetails(element);
              for (const iterator of result["items"]) {
                if (allWordsSyn[iterator.name] != null) {
                  const items = [
                    ...allWordsSyn[iterator.name],
                    ...iterator.items,
                  ];
                  allWordsSyn[iterator.name] = items;
                } else {
                  allWordsSyn[iterator.name] = iterator.items;
                }
              }
            }
          );
        }

        if (element["syn"]) {
          for (const iterator of element["syn"]) {
            if (allWordsSyn[iterator["mainWord"]] != null) {
              const items = [
                ...allWordsSyn[iterator["mainWord"]],
                ...iterator.items,
              ];
              allWordsSyn[iterator["mainWord"]] = items;
            } else {
              allWordsSyn[iterator["mainWord"]] = iterator.items;
            }
          }
        }

        const sent = element.text.trim();
        {
          allWordsSyn = synExtrackFromSent(sent, allWordsSyn);
        }

        if (true == result["option"]["CSA"]["checked"]) {
          const reuslt = csaProcess(sent, allWordsSyn);
          processSents = [...processSents, ...reuslt];
        }

        if (true == result["option"]["WSAIS"]["checked"]) {
          const reuslt = WSAISProcess(sent, allWordsSyn);
          processSents = [...new Set([...processSents, ...reuslt])];
        }

        if (result["option"]["letterProcess"]["checked"]) {
          const gotResult = letterPreprocess(
            sent,
            result["option"]["letterProcess"]["uppercase"],
            result["option"]["letterProcess"]["lowercase"],
            result["option"]["letterProcess"]["capitalize"]
          );
          processSents = [...new Set([...processSents, ...gotResult])];
        }
        
        if (result["option"]["FWG"]["checked"]) {
          let generatorSent = [];
          for (const iterator of processSents) {
            const gotResult = wrongGenerator(iterator, {
              generateSimple: true,
              simplefolttryCount:
                result["option"]["FWG"]["tryToGenerateQuantity"],
              simpleSentCount: result["option"]["FWG"]["generateQuantity"],
              simpleWrongTh: result["option"]["FWG"]["WrongThreshold"],
            });
            generatorSent = [
              ...generatorSent,
              ...[...new Set(gotResult.simpleWrong)],
            ];
          }
          simpleWrong = [...new Set(generatorSent)];
        }














        
        if (result["option"]["WGFA"]["checked"]) {
          let generatorSent = [];
          for (const iterator of processSents) {
            const gotResult = wrongGenerator(iterator, {
              generateFew: true,
              fewfolttryCount:
                result["option"]["WGFA"]["tryToGenerateQuantity"],
              fewSentCount: result["option"]["WGFA"]["generateQuantity"],
              fewWrongTh: [
                result["option"]["WGFA"]["startWrongThreshold"],
                result["option"]["WGFA"]["endWrongThreshold"],
              ],
            });
            generatorSent = [
              ...generatorSent,
              ...[...new Set(gotResult.fewWrong)],
            ];
          }
          confWrong = [...new Set(generatorSent)];
        }












        

        if (result["option"]["FLWG"]["checked"]) {
          let generatorSent = [];
          for (const iterator of processSents) {
            const gotResult = wrongGenerator(iterator, {
              generateFull: true,
              fullfolttryCount:
                result["option"]["FLWG"]["tryToGenerateQuantity"],
              fullSentCount: result["option"]["FLWG"]["generateQuantity"],
              fullWrongTh: result["option"]["FLWG"]["WrongThreshold"],
            });
            generatorSent = [
              ...generatorSent,
              ...[...new Set(gotResult.fullWrong)],
            ];
          }
          fullWrong = [...new Set(generatorSent)];
        }

        if (result["option"]["PBRP"]["checked"]) {
          if (result["option"]["PBRP"]["default"]["set"]) {
            const withProcess = removePunc(element.text)
            simpleWrong.push(withProcess)
          }else{
            const withProcess = removePunc(element.text,result["option"]["PBRP"]["custom"]["items"])
            simpleWrong.push(withProcess)
          }
        }





















        generateFullWrong = [
          ...generateFullWrong,
          { text: element.text, fullWrong: fullWrong,id:element.id, mainBlocName:result.name },
        ];
        generateFewWrong = [
          ...generateFewWrong,
          { text: element.text, confWrong: confWrong,id:element.id,  mainBlocName:result.name},
        ];
        generatefussyWrong = [
          ...generatefussyWrong,
          { text: element.text, simpleWrong: simpleWrong,id:element.id, mainBlocName:result.name },
        ];
      }
    }
  }







// console.log(generateFullWrong)
// console.log(generateFewWrong)
const gotResult  = gotDetails({filePath:basePath,name:`conf.${result.name}`,customExtension:".intent"})
if (gotResult) {
  let listOfItem = gotResult.items
  generateFewWrong.forEach((element,index)=>{
    const find = listOfItem.find((element2)=>element2.text==element.text)
    if (find) {
      const newItem = listOfItem.map((element2)=>{
        if (element2.text==element.text) {
          return element
        }
        return element2
      })
      listOfItem = newItem
    }else{
      listOfItem.push(element)
    }
    
  })
  saveIntent(`conf.${result.name}`,"des-conf",listOfItem)
}else{
   saveIntent(`conf.${result.name}`,"des-conf",generateFewWrong)
}




// console.log(generateFullWrong)



const gotWrongResult  = gotDetails({filePath:basePath,name:`fullWrong.${result.name}`,customExtension:".intent"})
if (gotResult) {
  let listOfItem = gotResult.items
  generateFullWrong.forEach((element,index)=>{
    const find = listOfItem.find((element2)=>element2.text==element.text)
    if (find) {
      const newItem = listOfItem.map((element2)=>{
        if (element2.text==element.text) {
          return element
        }
        return element2
      })
      listOfItem = newItem
    }else{
      listOfItem.push(element)
    }
    
  })
  saveIntent(`fullWrong.${result.name}`,"des-fullWrong",listOfItem)
}else{
   saveIntent(`fullWrong.${result.name}`,"des-fullWrong",generateFullWrong)
}
// console.log(`conf.${result.name}`)
  
  


  if (result.intents) {
    let listOfItem = result.intents


    generatefussyWrong.forEach((element,index)=>{
      const find = listOfItem.find((element2)=>element2.text==element.text)
      if (find) {
        const newItem = listOfItem.map((element2)=>{
          if (element2.text==element.text) {
            return element
          }
          return element2
        })
        listOfItem = newItem
      }else{
        listOfItem.push(element)
      }
      result.intents = listOfItem
      saveIntent(result.name,result.des,[],{},result)
    })
  }else{
    result.intents = generatefussyWrong
    saveIntent(result.name,result.des,[],{},result)
  }



  















};
