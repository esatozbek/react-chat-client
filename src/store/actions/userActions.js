import ApiRequest from "../../service/ApiRequestService";
import LocalStorageService from "../../service/LocalStorageService";
import store from "../index";
import {
  LOGIN_SUCCESS,
  LOGIN_REQUEST,
  LOGIN_ERROR,
  LOGOUT,
  RECENT_CHAT_USERS_UPDATE,
} from "./actionTypes";

const USER_PREFIX = "/user";

export function login(username) {
  return (dispatch) => {
    dispatch({
      type: LOGIN_REQUEST,
    });
    const data = {
      username,
    };
    return ApiRequest.post(`${USER_PREFIX}/login`, data)
      .then((resp) => {
        LocalStorageService.setItem("user", JSON.stringify(resp));
        dispatch({
          type: LOGIN_SUCCESS,
          payload: resp,
        });
      })
      .catch(() =>
        dispatch({
          type: LOGIN_ERROR,
        })
      );
  };
}

export function logout() {
  ApiRequest.post(`${USER_PREFIX}/logout`);
  ApiRequest.cancelRequests();
  LocalStorageService.removeItem("user");
  return {
    type: LOGOUT,
  };
}

export function searchUsersByUsername(username) {
  return ApiRequest.get(`${USER_PREFIX}?username=${username}`);
}

export function listenContacts(userId) {
  return ApiRequest.getStream(`${USER_PREFIX}/contact/stream`, (resp) => {
    console.log(resp);
  });
}

export function streamUsers() {
  return (dispatch) => {
    ApiRequest.getStream(USER_PREFIX + "/stream", (resp) => {
      const recentChatUsers = [
        ...store.getState().contactReducer.recentChatUsers,
      ];
      recentChatUsers.forEach((user, i) => {
        if (user.id === resp.id) {
          recentChatUsers[i] = resp;
        }
      });
      dispatch({
        type: RECENT_CHAT_USERS_UPDATE,
        payload: recentChatUsers,
      });
    });
  };
}
