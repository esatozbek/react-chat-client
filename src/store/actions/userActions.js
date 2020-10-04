import ApiRequest from "../../service/ApiRequestService";
import LocalStorageService from "../../service/LocalStorageService";
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
        if (resp.status) {
          LocalStorageService.setItem("user", JSON.stringify(resp.data));
        }
        dispatch({
          type: LOGIN_SUCCESS,
          payload: resp.data,
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
  LocalStorageService.removeItem("user");
  return {
    type: LOGOUT,
  };
}
