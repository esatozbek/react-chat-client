import ApiRequest from "../../service/ApiRequestService";
import { RECENT_CHAT_USERS_REQUEST, GROUPS_SUCCESS, CONTACTS_SUCCESS, SELECT_CONTACT, SELECT_GROUP } from "./actionTypes";

const USER_PREFIX = "/user";
const GROUP_PREFIX = "/group";

export function getRecentChatUsers() {
  return (dispatch) => {
    return ApiRequest.get(`${USER_PREFIX}/chats`).then((resp) => {
      console.log(resp);
      dispatch({
        type: RECENT_CHAT_USERS_REQUEST,
        payload: resp.data,
      });
    });
  };
}

export function getGroups() {
  return (dispatch) => {
    return ApiRequest.get(`${GROUP_PREFIX}`).then((resp) => {
      dispatch({
        type: GROUPS_SUCCESS,
        payload: resp.data,
      });
    });
  };
}

export function getContacts(userId) {
  return (dispatch) => {
    return ApiRequest.get(`${USER_PREFIX}/contacts`).then((resp) => {
      dispatch({
        type: CONTACTS_SUCCESS,
        payload: resp.data,
      });
    });
  };
}

export function selectContact(user) {
  console.log("selected contact " + user.id);
  return {
    type: SELECT_CONTACT,
    payload: user,
  }
}

export function selectGroup(group) {
  return {
    type: SELECT_GROUP,
    payload: group,
  }
}
