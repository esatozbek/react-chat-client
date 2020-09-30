import { MESSAGES_SUCCESS } from "../actions/actionTypes";

const defaultState = {
  messages: [],
};

export function messageReducer(state = defaultState, action) {
  switch (action.type) {
    case MESSAGES_SUCCESS:
      return {
        ...state,
        messages: action.payload,
      };
    default:
      return state;
  }
}

export default messageReducer;
