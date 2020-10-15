import React from "react";
import PropTypes from "prop-types";
import { isToday } from "../../util/dateUtils";

const ChatTime = ({ timestamp }) => {
  const formatTimestamp = () => {
    if (!timestamp) return;
    if (isToday(timestamp)) return "Today";
    const date = new Date(timestamp);
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
