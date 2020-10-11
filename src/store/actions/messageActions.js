import ApiRequest from "../../service/ApiRequestService";
import store from "../index";
import {
  GET_MESSAGE_REQUEST,
  GET_MESSAGE_SUCCESS,
  GET_MESSAGE_ERROR,
  CREATE_MESSAGE_REQUEST,
  RECENT_CHAT_USERS_UPDATE,
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
        const sortedMessages = resp.sort((a, b) => {
          if (a.timestamp < b.timestamp) return 1;
          if (a.timestamp > b.timestamp) return -1;
          return 0;
        });
        const messageMap = new Map();
        sortedMessages.forEach((message) => {
          const oppositeUser =
            message.sender.id === user.id ? message.receiver : message.sender;
          if (messageMap.get(oppositeUser.id))
            messageMap.get(oppositeUser.id).push(message);
          else {
            const messageArray = [message];
            messageMap.set(oppositeUser.id, messageArray);
          }
        });
        dispatch({
          type: GET_MESSAGE_SUCCESS,
          payload: messageMap,
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
  const timestamp = Math.floor(Date.now());

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
  return (dispatch) => {
    if (messageMap && messageMap.get(oppositeId)) {
      const oppositeMessages = messageMap.get(oppositeId);
      const newMessages = [message, ...oppositeMessages];
      messageMap.set(oppositeId, newMessages);
    } else {
      messageMap.set(oppositeId, [message]);

      const newRecentChatUsers = store
        .getState()
        .contactReducer.recentChatUsers.concat(receiver);
      dispatch({
        type: RECENT_CHAT_USERS_UPDATE,
        payload: newRecentChatUsers,
      });
    }

    dispatch({
      type: CREATE_MESSAGE_REQUEST,
      payload: messageMap,
    });

    ApiRequest.post(`${MESSAGE_PREFIX}`, messageRequest)
      .then((resp) => {
        message.id = resp.id;
        message.status = "SENT";
        dispatch({
          type: CREATE_MESSAGE_REQUEST,
          payload: new Map(messageMap),
        });
      })
      .catch((e) => console.log(e));
  };
}

export function listenMessages() {
  return (dispatch) => {
    ApiRequest.getStream(MESSAGE_PREFIX + "/stream", (resp) => {
      const messageMap = new Map(store.getState().messageReducer.messageMap);
      if (messageMap) {
        if (messageMap.get(resp.sender.id)) {
          const oppositeMessages = messageMap.get(resp.sender.id);
          const newMessages = [resp, ...oppositeMessages];
          messageMap.set(resp.sender.id, newMessages);

          dispatch({
            type: CREATE_MESSAGE_REQUEST,
            payload: messageMap,
          });
        } else {
          const recentChatsUsers = store.getState().contactReducer
            .recentChatUsers;
          const newRecentChatUsers = recentChatsUsers.concat(resp.sender);
          dispatch({
            type: RECENT_CHAT_USERS_UPDATE,
            payload: newRecentChatUsers,
          });
          messageMap.set(resp.sender.id, [resp]);
          dispatch({
            type: CREATE_MESSAGE_REQUEST,
            payload: new Map(messageMap),
          });
        }
      }
      console.log(resp);
    });
  };
}
