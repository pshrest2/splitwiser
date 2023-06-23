import { combineReducers } from "redux";
import usersReducer from "./usersReducer";

const allReducers = combineReducers({
  usersReducer,
});

export default allReducers;
