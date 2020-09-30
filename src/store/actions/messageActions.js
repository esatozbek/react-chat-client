import ApiRequest from "../../service/ApiRequest";
import { MESSAGES_SUCCESS } from "./actionTypes";

const MESSAGE_PREFIX = "/message";

export function getMessages(username) {
    return (dispatch) => {
      return ApiRequest.get(`${MESSAGE_PREFIX}/username/${username}`).then((resp) => {
        dispatch({
            type: MESSAGES_SUCCESS,
            payload: resp.data
        });
      });
    };
  }