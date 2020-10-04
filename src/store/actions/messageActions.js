import ApiRequest from "../../service/ApiRequestService";
import store from "../index";
import {
  GET_MESSAGE_REQUEST,
  GET_MESSAGE_SUCCESS,
  GET_MESSAGE_ERROR,
  CREATE_MESSAGE_REQUEST,
} from "./actionTypes";

const MESSAGE_PREFIX = "/message";

export function getMessages() {
  const user = store.getState().userReducer.user;
  return (dispatch) => {
    dispatch({
      type: GET_MESSAGE_REQUEST,
    });

    return ApiRequest.get(`${MESSAGE_PREFIX}`)
      .then((resp) => {
        const recentChatsMap = new Map();
        resp.data
          .filter((message) => {
            if (!message.receiver) return false;
            return (
              message.sender.id === user.id || message.receiver.id === user.id
            );
          })
          .forEach((message) => {
            const oppositeUser =
              message.sender.id === user.id ? message.receiver : message.sender;
            if (recentChatsMap.get(oppositeUser.id))
              recentChatsMap.get(oppositeUser.id).push(message);
            else {
              const messageArray = [message];
              recentChatsMap.set(oppositeUser.id, messageArray);
            }
          });
        dispatch({
          type: GET_MESSAGE_SUCCESS,
          payload: recentChatsMap,
        });
      })
      .catch(() =>
        dispatch({
          type: GET_MESSAGE_ERROR,
        })
      );
  };
}

export function createMessage(content, receiver, group) {
  const user = store.getState().userReducer.user;
  const oppositeId = receiver.id;
  const timestamp = Math.floor(Date.now() / 1000);

  const messageRequest = {
    content,
    senderId: user.id,
    receiverId: receiver.id,
    timestamp,
  };

  const message = {
    content,
    sender: user,
    receiver,
    timestamp,
  };

  const messageMap = new Map(store.getState().messageReducer.messageMap);

  if (messageMap && messageMap.get(oppositeId)) {
    const oppositeMessages = messageMap.get(oppositeId);
    const newMessages = oppositeMessages.concat(message);
    messageMap.set(oppositeId, newMessages);
  }

  return (dispatch) => {
    dispatch({
      type: CREATE_MESSAGE_REQUEST,
      payload: messageMap,
    });

    ApiRequest.post(`${MESSAGE_PREFIX}`, messageRequest).then((resp) => {
      message.id = resp.data.id;
      message.status = "SENT";
      dispatch({
        type: CREATE_MESSAGE_REQUEST,
        payload: new Map(messageMap),
      });
    });
  };
}

export function listenMessages() {
  return fetch(`http://localhost:8080/${MESSAGE_PREFIX}/stream`).then(resp => {
    console.log(resp);
    return resp.body
  }).then(body => {
    let read;
    body.getReader().read().then(read = (result) => {
      console.log(result)
      console.log(result.value)

      body.getReader().read().then(read);
    })
  })
}
