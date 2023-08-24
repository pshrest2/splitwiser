import { combineReducers } from "redux";
import modal from "./modal";
import receipt from "./receipt";

const allReducers = combineReducers({
  receipt,
  modal,
});

export default allReducers;
