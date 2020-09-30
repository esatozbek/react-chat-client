import ApiRequest from "../../service/ApiRequest";
import { LOGIN_SUCCESS } from "./actionTypes";

const USER_PREFIX = "/user";

export function login(username) {
  return (dispatch) => {
    return ApiRequest.get(`${USER_PREFIX}/username/${username}`).then((resp) => {
      dispatch({
          type: LOGIN_SUCCESS,
          payload: resp.data
      });
    });
  };
}
