import {
  GET_MESSAGE_REQUEST,
  CREATE_MESSAGE_REQUEST,
  LOGOUT,
  GET_MESSAGE_SUCCESS,
  GET_MESSAGE_ERROR,
} from "../actions/actionTypes";

const defaultState = {
  messageMap: new Map(),
  messagesLoading: false,
  messagesError: false,
};

export function messageReducer(state = defaultState, action) {
  switch (action.type) {
    case GET_MESSAGE_REQUEST:
      return {
        ...state,
        messagesLoading: true,
        messagesError: false,
      };
    case GET_MESSAGE_SUCCESS:
      return {
        ...state,
        messageMap: action.payload,
      };
    case GET_MESSAGE_ERROR:
      return {
        ...state,
        messagesLoading: false,
        messagesError: true,
      };
    case CREATE_MESSAGE_REQUEST:
      return {
        ...state,
        messageMap: action.payload,
      };
    case LOGOUT:
      return {
        ...defaultState,
      };
    default:
      return state;
  }
}

export default messageReducer;
