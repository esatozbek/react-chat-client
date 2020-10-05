import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import Avatar from "ui-library/Avatar";
import Dropdown from "ui-library/Dropdown";
import ChatBubble from "./ChatBubble";
import ChatTime from "./ChatTime";
import { logout } from "../../store/actions/userActions";
import {
  getMessages,
  createMessage,
  listenMessages,
} from "../../store/actions/messageActions";
import { getCurrentDayFromDate } from "../../util/dateUtils";

const ChatScreen = ({
  logout,
  messageMap,
  user,
  getMessages,
  selectedContact,
  createMessage,
  listenMessages,
}) => {
  const [showMore, setShowMore] = useState(false);
  const [isSearchActive, setSearchActive] = useState(false);
  const [content, setContent] = useState("");
  const showMoreRef = useRef(null);

  useEffect(() => {
    getMessages();
    listenMessages();
  }, [getMessages, listenMessages]);

  const logoutUser = () => {
    logout();
  };

  const sendMessage = () => {
    createMessage(content, selectedContact);
  };

  const getConversationBody = () => {
    const items = [];
    const selectedMessages = messageMap.get(selectedContact.id);

    if (selectedMessages) {
      let currentDay = null;
      selectedMessages.forEach((item, index) => {
        if (!currentDay) currentDay = item.timestamp;

        items.push(
          <React.Fragment>
            <ChatBubble
              key={"message" + item.id}
              content={item.content}
              me={item.sender.id === user.id}
              timestamp={item.timestamp}
              status={item.status}
            />
          </React.Fragment>
        );

        if (
          getCurrentDayFromDate(item.timestamp) !==
            getCurrentDayFromDate(currentDay) ||
          index === selectedMessages.length - 1
        ) {
          items.push(
            <ChatTime key={"chattime" + item.id} timestamp={item.timestamp} />
          );
          currentDay = item.timestamp;
        }
      });
    }

    return items;
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <div className="contact-info">
          {selectedContact.username && (
            <Avatar
              src={process.env.PUBLIC_URL + "/avatar-girl.jpg"}
              size="sm"
              variant=""
            />
          )}
          <div className="contact-info__info">
            <div className="contact-info__info--name">
              {selectedContact.username}
            </div>
            {selectedContact.username && (
              <div className="contact-info__info--status">
                <span className="contacts__item--status"></span>
                <span>Online</span>
              </div>
            )}
          </div>
          <div className="chat__header--buttons">
            {selectedContact.username && (
              <span className={`search ${isSearchActive ? "active" : ""}`}>
                <span
                  className="ti-search"
                  onClick={(e) => setSearchActive(!isSearchActive)}
                ></span>
                <input className="chat-input__input" placeholder="Search..." />
              </span>
            )}
            <span className="ti-settings"></span>
            <span
              className="ti-more"
              onClick={() => setShowMore(true)}
              ref={showMoreRef}
            ></span>
            <Dropdown
              target={showMoreRef}
              show={showMore}
              onHide={() => setShowMore(false)}
              placement="bottom-start"
            >
              <Dropdown.Item onClick={() => console.log("Copy")}>
                Copy
              </Dropdown.Item>
              <Dropdown.Item onClick={() => console.log("Save")}>
                Save
              </Dropdown.Item>
              <Dropdown.Item onClick={() => console.log("Forward")}>
                Forward
              </Dropdown.Item>
              <Dropdown.Item onClick={(e) => logoutUser()}>
                Logout
              </Dropdown.Item>
            </Dropdown>
          </div>
        </div>
      </div>
      <div className="chat__body">{getConversationBody()}</div>
      {selectedContact.username && (
        <div className="chat__footer">
          <div className="chat__footer--input">
            <div className="chat-input" style={{ margin: 0 }}>
              <span className="ti-search"></span>
              <input
                className="chat-input__input"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <span className="ti-image"></span>
              <span className="ti-file"></span>
            </div>
          </div>
          <button className="chat__footer--send" onClick={sendMessage}>
            Send<span className="ti-angle-double-right"></span>
          </button>
        </div>
      )}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    user: state.userReducer.user,
    messageMap: state.messageReducer.messageMap,
    selectedContact: state.contactReducer.selectedContact,
    selectedGroup: state.contactReducer.selectedGroup,
  };
}

export default connect(mapStateToProps, {
  logout,
  getMessages,
  createMessage,
  listenMessages,
})(ChatScreen);
