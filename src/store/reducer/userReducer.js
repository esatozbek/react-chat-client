import LocalStorageService from "../../service/LocalStorageService";
import { LOGIN_SUCCESS, LOGOUT } from "../actions/actionTypes";

function getUserFromStorageOrDefault() {
  let user = LocalStorageService.getItem("user");
  if (user) {
    user = JSON.parse(user);
  }

  return user || {};
}

const defaultState = {
  user: getUserFromStorageOrDefault(),
};

export function userReducer(state = defaultState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        user: {},
      };
    default:
      return state;
  }
}

export default userReducer;
