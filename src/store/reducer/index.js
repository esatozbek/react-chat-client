import { combineReducers } from "redux";
import userReducer from "./userReducer";
import contactReducer from "./contactReducer";
import messagesReducer from "./messageReducer";

export default combineReducers({
  userReducer,
  contactReducer,
  messagesReducer,
});
