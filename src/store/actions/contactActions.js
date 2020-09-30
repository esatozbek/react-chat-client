import ApiRequest from "../../service/ApiRequestService";
import { USERS_SUCCESS, GROUPS_SUCCESS, CONTACTS_SUCCESS } from "./actionTypes";

const USER_PREFIX = "/user";
const GROUP_PREFIX = "/group";

export function getUsers() {
  return (dispatch) => {
    return ApiRequest.get(`${USER_PREFIX}`).then((resp) => {
      console.log(resp);
      dispatch({
        type: USERS_SUCCESS,
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
