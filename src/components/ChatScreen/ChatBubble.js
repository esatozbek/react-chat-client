import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import Dropdown from "ui-library/Dropdown";

const ChatBubble = ({ content, status, timestamp, ...props }) => {
  const [showMore, setShowMore] = useState(false);
  const showMoreRef = useRef(null);

  const formatTimestamp = () => {
    if (!timestamp) return;
    const date = new Date(timestamp * 1000);
    const hrMnt = date.getHours() + ":" + date.getMinutes();
    return hrMnt;
  };

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
        <span className="bubble__time--clock">{formatTimestamp()}</span>
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
  timestamp: null,
  status: "",
};

ChatBubble.propTypes = {
  content: PropTypes.string,
  time: PropTypes.number,
  status: PropTypes.string,
};

export default ChatBubble;
