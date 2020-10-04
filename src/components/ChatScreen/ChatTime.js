import React from "react";
import PropTypes from "prop-types";

const ChatTime = ({ timestamp }) => {
  const formatTimestamp = () => {
    if (!timestamp) return;
    const date = new Date(timestamp * 1000);
    const formatter = new Intl.DateTimeFormat("en-GB", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return formatter.format(date);
  };

  return (
    <div className="chat__time">
      <span className="title">{formatTimestamp(timestamp)}</span>
    </div>
  );
};

ChatTime.propTypes = {
  timestamp: PropTypes.number.isRequired,
};

export default ChatTime;
