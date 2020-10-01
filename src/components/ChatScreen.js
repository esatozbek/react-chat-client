import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Avatar from "ui-library/Avatar";
import Dropdown from "ui-library/Dropdown";
import { logout } from "../store/actions/userActions";
import { getMessages, createMessage } from "../store/actions/messageActions";
import { useEffect } from "react";

const ChatBubble = ({ content, time, status, ...props }) => {
  const [showMore, setShowMore] = useState(false);
  const showMoreRef = useRef(null);

  return (
    <div className={`bubble ${props.me ? "me" : ""}`}>
      <div className="bubble__header">
        <span className="bubble__header--name">Henry Wells</span>
        <span
          ref={showMoreRef}
          onClick={() => setShowMore(!showMore)}
          className="ti-more-alt"
        ></span>
      </div>
      <div className="bubble__context">{content}</div>
      <div className="bubble__footer">
        <span className="ti-time"></span>
        <span className="bubble__time--clock">{time}</span>
        <span className="bubble__time--status">{status}</span>
      </div>
      <Dropdown
        target={showMoreRef}
        show={showMore}
        onHide={() => setShowMore(false)}
        placement={props.me ? "left-start" : "right-start"}
      >
        <Dropdown.Item onClick={() => console.log("Copy")}>Copy</Dropdown.Item>
        <Dropdown.Item onClick={() => console.log("Save")}>Save</Dropdown.Item>
        <Dropdown.Item onClick={() => console.log("Forward")}>
          Forward
        </Dropdown.Item>
        <Dropdown.Item onClick={() => console.log("Delete")}>
          Delete
        </Dropdown.Item>
      </Dropdown>
    </div>
  );
};

ChatBubble.defaultProps = {
  content: "",
  time: "",
  status: ""
};

ChatBubble.propTypes = {
  content: PropTypes.string,
  time: PropTypes.string,
  status: PropTypes.string
};

const ChatTime = (props) => {
  return (
    <div className="chat__time">
      <span className="title">{props.content}</span>
    </div>
  );
};

const getChatBubbles = (messageMap, user, selectedContact) => {
  const items = [];
  // for (let i = 0; i < 5; i++) {
  //   items.push(
  //     <ChatBubble
  //       key={i}
  //       content="Curabitur ipsum erat, vestibulum a leo a, tristique venenatis neque. Integer laoreet elementum imperdiet. Nulla malesuada nunc eu blandit consectetur"
  //     />
  //   );
  //   if (i % 2 === 0)
  //     items.push(<ChatTime key={"chattime" + i} content={"chattime " + i} />);
  //   items.push(
  //     <ChatBubble
  //       key={"me" + i}
  //       content="Curabitur ipsum erat, vestibulum a leo a, tristique venenatis neque. Integer laoreet elementum imperdiet. Nulla malesuada nunc eu blandit consectetur"
  //       me
  //     />
  //   );
  // }

  const selectedMessages = messageMap.get(selectedContact.id);

  if (selectedMessages)
    selectedMessages
      .sort((a, b) => a.timestamp < b.timestamp)
      .forEach((item) => {
        const date = new Date(item.timestamp * 1000);
        const hrMnt = date.getHours() + ":" + date.getMinutes();
        const formatter = new Intl.DateTimeFormat("en-GB", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        const dateString = formatter.format(date);
        items.push(
          <React.Fragment>
            <ChatTime key={"chattime" + item.id} content={dateString} />
            <ChatBubble
              key={"message" + item.id}
              content={item.content}
              me={item.sender.id === user.id}
              time={hrMnt}
              status={item.status}
            />
          </React.Fragment>
        );
      });
  return items;
};

const ChatScreen = ({
  logout,
  messageMap,
  user,
  getMessages,
  selectedContact,
  createMessage
}) => {
  const [showMore, setShowMore] = useState(false);
  const [isSearchActive, setSearchActive] = useState(false);
  const [content, setContent] = useState("");
  const showMoreRef = useRef(null);

  useEffect(() => {
    getMessages();
  }, []);

  const logoutUser = () => {
    logout();
  };

  const sendMessage = () => {
    createMessage(content, selectedContact);
  }

  return (
    <div className="chat">
      <div className="chat__header">
        <div className="contact-info">
          <Avatar
            src={process.env.PUBLIC_URL + "/avatar-girl.jpg"}
            size="sm"
            variant=""
          />
          <div className="contact-info__info">
            <div className="contact-info__info--name">{selectedContact.username}</div>
            <div className="contact-info__info--status">
              <span className="contacts__item--status"></span>
              <span>Online</span>
            </div>
          </div>
          <div className="chat__header--buttons">
            <span className={`search ${isSearchActive ? "active" : ""}`}>
              <span
                className="ti-search"
                onClick={(e) => setSearchActive(!isSearchActive)}
              ></span>
              <input className="chat-input__input" placeholder="Search..." />
            </span>
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
      <div className="chat__body">
        {<ChatTime content="Today" />}
        {<ChatBubble content="How are you?" />}
        {<ChatBubble content="Curabitur ipsum erat, vestibulum a leo a." me />}
        {getChatBubbles(messageMap, user, selectedContact)}
      </div>
      <div className="chat__footer">
        <div className="chat__footer--input">
          <div className="chat-input" style={{ margin: 0 }}>
            <span className="ti-search"></span>
            <input className="chat-input__input" value={content} onChange={e => setContent(e.target.value)} />
            <span className="ti-image"></span>
            <span className="ti-file"></span>
          </div>
        </div>
        <button className="chat__footer--send" onClick={sendMessage}>
          Send<span className="ti-angle-double-right"></span>
        </button>
      </div>
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

export default connect(mapStateToProps, { logout, getMessages, createMessage })(ChatScreen);
