import ApiRequest from "../../service/ApiRequestService";
import {
  RECENT_CHAT_USERS_REQUEST,
  RECENT_CHAT_USERS_SUCCESS,
  RECENT_CHAT_USERS_ERROR,
  GROUPS_SUCCESS,
  CONTACTS_SUCCESS,
  SELECT_CONTACT,
  SELECT_GROUP,
  GROUPS_REQUEST,
  GROUPS_ERROR,
  CONTACTS_REQUEST,
  CONTACTS_ERROR,
} from "./actionTypes";

const USER_PREFIX = "/user";
const GROUP_PREFIX = "/group";

export function getRecentChatUsers() {
  return (dispatch) => {
    dispatch({
      type: RECENT_CHAT_USERS_REQUEST,
    });

    return ApiRequest.get(`${USER_PREFIX}/chats`)
      .then((resp) => {
        dispatch({
          type: RECENT_CHAT_USERS_SUCCESS,
          payload: resp,
        });
      })
      .catch(() =>
        dispatch({
          type: RECENT_CHAT_USERS_ERROR,
        })
      );
  };
}

export function getGroups() {
  return (dispatch) => {
    dispatch({
      type: GROUPS_REQUEST,
    });

    return ApiRequest.get(`${GROUP_PREFIX}`)
      .then((resp) => {
        dispatch({
          type: GROUPS_SUCCESS,
          payload: resp,
        });
      })
      .catch(() => dispatch({ type: GROUPS_ERROR }));
  };
}

export function getContacts() {
  return (dispatch) => {
    dispatch({
      type: CONTACTS_REQUEST,
    });

    return ApiRequest.get(`${USER_PREFIX}/contacts`)
      .then((resp) => {
        dispatch({
          type: CONTACTS_SUCCESS,
          payload: resp,
        });
      })
      .catch(() =>
        dispatch({
          type: CONTACTS_ERROR,
        })
      );
  };
}

export function selectContact(user) {
  return {
    type: SELECT_CONTACT,
    payload: user,
  };
}

export function selectGroup(group) {
  return {
    type: SELECT_GROUP,
    payload: group,
  };
}
