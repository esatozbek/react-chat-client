import ApiRequest from "../../service/ApiRequestService";
import LocalStorageService from "../../service/LocalStorageService";
import { LOGIN_SUCCESS, LOGOUT } from "./actionTypes";

const USER_PREFIX = "/user";

export function login(username) {
  return (dispatch) => {
    return ApiRequest.get(`${USER_PREFIX}/username/${username}`).then(
      (resp) => {
        if (resp.status) {
          LocalStorageService.setItem("user", JSON.stringify(resp.data));
        }
        dispatch({
          type: LOGIN_SUCCESS,
          payload: resp.data,
        });
      }
    );
  };
}

export function logout() {
  LocalStorageService.removeItem("user");
  return {
    type: LOGOUT,
  };
}
