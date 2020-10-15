import {
  RECENT_CHAT_USERS_REQUEST,
  RECENT_CHAT_USERS_SUCCESS,
  RECENT_CHAT_USERS_ERROR,
  RECENT_CHAT_USERS_UPDATE,
  GROUPS_SUCCESS,
  GROUPS_REQUEST,
  GROUPS_ERROR,
  CONTACTS_SUCCESS,
  CONTACTS_REQUEST,
  CONTACTS_ERROR,
  SELECT_CONTACT,
  SELECT_GROUP,
  LOGOUT,
} from "../actions/actionTypes";

const defaultState = {
  recentChatUsers: [],
  recentChatUsersLoading: false,
  recentChatUsersError: false,
  groups: [],
  groupsLoading: false,
  groupsError: false,
  contacts: [],
  contactsLoading: false,
  contactsError: false,
  selectedContact: {},
  selectedGroup: {},
};

export function contactReducer(state = defaultState, action) {
  switch (action.type) {
    case RECENT_CHAT_USERS_SUCCESS:
      return {
        ...state,
        recentChatUsers: action.payload,
        recentChatUsersLoading: false,
        recentChatUsersError: false,
      };
    case RECENT_CHAT_USERS_REQUEST:
      return {
        ...state,
        recentChatUsersLoading: true,
        recentChatUsersError: false,
      };
    case RECENT_CHAT_USERS_ERROR:
      return {
        ...state,
        recentChatUsersLoading: false,
        recentChatUsersError: true,
      };
    case RECENT_CHAT_USERS_UPDATE:
      return {
        ...state,
        recentChatUsers: action.payload,
      };
    case GROUPS_SUCCESS:
      return {
        ...state,
        groups: action.payload,
        groupsLoading: false,
        groupsError: false,
      };
    case GROUPS_REQUEST:
      return {
        ...state,
        groupsLoading: true,
        groupsError: false,
      };
    case GROUPS_ERROR:
      return {
        ...state,
        groupsLoading: false,
        groupsError: true,
      };
    case CONTACTS_SUCCESS:
      return {
        ...state,
        contactsLoading: false,
        contactsError: false,
        contacts: action.payload,
      };
    case CONTACTS_REQUEST:
      return {
        ...state,
        contactsLoading: true,
        contactsError: false,
      };
    case CONTACTS_ERROR:
      return {
        ...state,
        contactsLoading: false,
        contactsError: true,
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
    case LOGOUT:
      return {
        ...defaultState,
      };
    default:
      return state;
  }
}

export default contactReducer;
