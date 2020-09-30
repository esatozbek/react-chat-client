import ApiRequest from "../../service/ApiRequestService";
import { MESSAGES_SUCCESS } from "./actionTypes";

const MESSAGE_PREFIX = "/message";

export function getMessages() {
    return (dispatch) => {
      return ApiRequest.get(`${MESSAGE_PREFIX}`).then((resp) => {
        dispatch({
            type: MESSAGES_SUCCESS,
            payload: resp.data
        });
      });
    };
  }