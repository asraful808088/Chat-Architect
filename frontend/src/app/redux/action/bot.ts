import botActionType from "../actionType/bot";
function changeBotName(name){
    return {
        type: botActionType.CHANGE_NAME_OF_BOT_STATE,
        name: name??null,
      };
}

function changeListOfBot(listOfBot  ){
  return {
      type: botActionType.CHANGE_BOT_LIST,
      listOfBot: listOfBot??[],
    };
}

export {changeBotName,changeListOfBot}