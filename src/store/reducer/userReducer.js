import LocalStorageService from "../../service/LocalStorageService";
import {
  LOGIN_ERROR,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
} from "../actions/actionTypes";

function getUserFromStorageOrDefault() {
  let user = LocalStorageService.getItem("user");
  if (user) {
    user = JSON.parse(user);
  }

  return user || {};
}

const defaultState = {
  user: getUserFromStorageOrDefault(),
  loginLoading: false,
  loginError: false,
};

export function userReducer(state = defaultState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
      };
    case LOGIN_REQUEST:
      return {
        ...state,
        loginLoading: true,
        loginError: false,
      };
    case LOGIN_ERROR:
      return {
        ...state,
        loginLoading: false,
        loginError: true,
      };
    case LOGOUT:
      return {
        ...defaultState,
      };
    default:
      return state;
  }
}

export default userReducer;
