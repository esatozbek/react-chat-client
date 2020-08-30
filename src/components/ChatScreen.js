import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import Avatar from "ui-library/Avatar";
import Dropdown from "ui-library/Dropdown";

const ChatBubble = ({ content, ...props }) => {
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
        <span className="bubble__time--clock">10:07</span>
      </div>
      <Dropdown
        target={showMoreRef}
        show={showMore}
        onHide={() => setShowMore(false)}
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
};

ChatBubble.propTypes = {
  content: PropTypes.string,
};

const ChatTime = (props) => {
  return (
    <div className="chat__time">
      <span className="title">{props.content}</span>
    </div>
  );
};

const getChatBubbles = () => {
  const items = [];
  for (let i = 0; i < 5; i++) {
    items.push(
      <ChatBubble
        key={i}
        content="Curabitur ipsum erat, vestibulum a leo a, tristique venenatis neque. Integer laoreet elementum imperdiet. Nulla malesuada nunc eu blandit consectetur"
      />
    );
    if (i % 2 === 0) items.push(<ChatTime key={"chattime" + i} content={"chattime " + i} />);
    items.push(
      <ChatBubble
        key={"me" + i}
        content="Curabitur ipsum erat, vestibulum a leo a, tristique venenatis neque. Integer laoreet elementum imperdiet. Nulla malesuada nunc eu blandit consectetur"
        me
      />
    );
  }
  return items;
};

const ChatScreen = (props) => {
  const [showMore, setShowMore] = useState(false);
  const showMoreRef = useRef(null);

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
            <div className="contact-info__info--name">Adam Miller</div>
            <div className="contact-info__info--status">
              <span className="contacts__item--status"></span>
              <span>Online</span>
            </div>
          </div>
          <div className="chat__header--buttons">
            <span className="ti-search"></span>
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
              <Dropdown.Item onClick={() => console.log("Delete")}>
                Delete
              </Dropdown.Item>
            </Dropdown>
          </div>
        </div>
      </div>
      <div className="chat__body">
        {<ChatTime content="Today" />}
        {<ChatBubble content="How are you?" />}
        {<ChatBubble content="Curabitur ipsum erat, vestibulum a leo a." me />}
        {getChatBubbles()}
      </div>
      <div className="chat__footer">
        <div className="chat__footer--input">
          <div className="chat-input" style={{ margin: 0 }}>
            <span className="ti-search"></span>
            <input className="chat-input__input" placeholder="Search..." />
            <span className="ti-image"></span>
            <span className="ti-file"></span>
          </div>
        </div>
        <button className="chat__footer--send">
          Send<span className="ti-angle-double-right"></span>
        </button>
      </div>
    </div>
  );
};

export default ChatScreen;
