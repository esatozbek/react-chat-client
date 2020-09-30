import { bindActionCreators } from "redux";
import {
  USERS_SUCCESS,
  GROUPS_SUCCESS,
  CONTACTS_SUCCESS,
} from "../actions/actionTypes";

const defaultState = {
  users: [],
  groups: [],
  contacts: [],
};

export function contactReducer(state = defaultState, action) {
  switch (action.type) {
    case USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
      };
    case GROUPS_SUCCESS:
      return {
        ...state,
        groups: action.payload,
      };
    case CONTACTS_SUCCESS:
      return {
        ...state,
        contacts: action.payload,
      };
    default:
      return state;
  }
}

export default contactReducer;
