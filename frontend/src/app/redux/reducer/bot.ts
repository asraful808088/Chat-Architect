import botActionType from "../actionType/bot";
import bot from "../state/botoption";
export default function botReducer(state = bot, actions) {
  switch (actions.type) {
    case botActionType.CHANGE_NAME_OF_BOT_STATE:
      return { ...state, activeBot: actions.name };
    case botActionType.CHANGE_BOT_LIST:
      return { ...state, listOfBot: actions.listOfBot };
    default:
      return state;
  }
}
