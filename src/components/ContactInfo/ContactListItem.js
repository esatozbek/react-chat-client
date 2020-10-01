import React from "react";
import Avatar from "ui-library/Avatar";

const ContactListItem = ({ ...props }) => {
  return (
    <li className="contacts__item" {...props}>
      <span className="contacts__item--status"></span>
      <Avatar
        src={process.env.PUBLIC_URL + "/avatar-girl.jpg"}
        size="sm"
        variant=""
        style={{ marginRight: ".8rem" }}
      />
      <div className="contacts__item--info">
        <div className="info-name">{props.username}</div>
        <div className="info-status">Some status that anyone will read</div>
      </div>
      <div className="contacts__item--lastseen">5 min</div>
    </li>
  );
};

export default ContactListItem;
