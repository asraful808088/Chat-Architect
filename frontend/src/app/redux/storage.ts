
import { combineReducers } from "redux";
import buildReducer from "./reducer/buildReducer";
import { createStore } from 'redux';
import { Provider } from "react-redux";
import botReducer from "./reducer/bot";
const store = createStore(combineReducers({
  buildReducer,
  botReducer
}));



export default store