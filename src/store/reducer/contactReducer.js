import { USERS_SUCCESS, GROUPS_SUCCESS } from "../actions/actionTypes";

const defaultState = {
  users: [],
  groups: [],
};

export function contactReducer(state = defaultState, action) {
  switch (action.type) {
    case USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
      };
    case GROUPS_SUCCESS:
      return {
        ...state,
        groups: action.payload,
      };
    default:
      return state;
  }
}

export default contactReducer;
