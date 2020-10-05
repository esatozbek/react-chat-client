import ApiRequest from "../../service/ApiRequestService";
import LocalStorageService from "../../service/LocalStorageService";
import { history } from '../../router/index';
import {
  LOGIN_SUCCESS,
  LOGIN_REQUEST,
  LOGIN_ERROR,
  LOGOUT,
} from "./actionTypes";

const USER_PREFIX = "/user";

export function login(username) {
  return (dispatch) => {
    dispatch({
      type: LOGIN_REQUEST,
    });
    return ApiRequest.get(`${USER_PREFIX}/username/${username}`)
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
  history.push("/login");
  LocalStorageService.removeItem("user");
  return {
    type: LOGOUT,
  };
}

export function searchUsersByUsername(username) {
  return ApiRequest.get(`${USER_PREFIX}?username=${username}`);
}
