import { GET_MESSAGE_REQUEST, CREATE_MESSAGE_REQUEST } from "../actions/actionTypes";

const defaultState = {
  messageMap: new Map(),
};

export function messageReducer(state = defaultState, action) {
  switch (action.type) {
    case GET_MESSAGE_REQUEST:
      return {
        ...state,
        messageMap: action.payload,
      };
      case CREATE_MESSAGE_REQUEST:
      return {
        ...state,
        messageMap: action.payload,
      };
    default:
      return state;
  }
}

export default messageReducer;
