import { LOGIN_SUCCESS } from "../actions/actionTypes";

const defaultState = {
  user: {},
};

export function userReducer(state = defaultState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
      };
    default: return state;
  }
}

export default userReducer;
