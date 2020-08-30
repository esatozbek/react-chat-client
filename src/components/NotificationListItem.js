import React from "react";
import Avatar from "ui-library/Avatar";

const NotificationListItem = (props) => {
  return (
    <li className="notification__item">
      <Avatar
        src={process.env.PUBLIC_URL + "/avatar-girl.jpg"}
        size="sm"
        variant=""
        letter="S"
        style={{ marginRight: ".8rem" }}
      />
      <div className="notification__item--body">
        <div className="notification__item--title">Your order is placed.</div>
        <div className="notification__item--content">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </div>
        <div className="notification__item--time">
          <span className="ti-time"></span>
          <span className="notification--time">3 minutes ago</span>
        </div>
      </div>
    </li>
  );
};

export default NotificationListItem;
