import {
  RECENT_CHAT_USERS_REQUEST,
  GROUPS_SUCCESS,
  CONTACTS_SUCCESS,
  SELECT_CONTACT,
  SELECT_GROUP
} from "../actions/actionTypes";

const defaultState = {
  recentChatUsers: [],
  groups: [],
  contacts: [],
  selectedContact: {},
  selectedGroup: {}
};

export function contactReducer(state = defaultState, action) {
  switch (action.type) {
    case RECENT_CHAT_USERS_REQUEST:
      return {
        ...state,
        recentChatUsers: action.payload,
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
      case SELECT_CONTACT:
      return {
        ...state,
        selectedContact: action.payload,
      };
      case SELECT_GROUP:
      return {
        ...state,
        selectedGroup: action.payload,
      };
    default:
      return state;
  }
}

export default contactReducer;
