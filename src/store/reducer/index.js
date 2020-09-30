import { combineReducers } from "redux";
import userReducer from "./userReducer";
import contactReducer from "./contactReducer";
import messageReducer from "./messageReducer";

export default combineReducers({
  userReducer,
  contactReducer,
  messageReducer,
});
