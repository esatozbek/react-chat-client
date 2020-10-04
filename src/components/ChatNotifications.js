import React from "react";
import Card from "ui-library/Card";
import Avatar from 'ui-library/Avatar';

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

const ChatNotifications = (props) => {
  const getListItems = () => {
    const list = [];
    for (let i = 0; i < 10; i++)
      list.push(<NotificationListItem key={"notitem" + i} />);
    return list;
  };

  return (
    <Card style={{ zIndex: 15, boxShadow: '7px 7px 10px 0px rgba(0,0,0,0.75)', border: 'none' }}>
      <Card.Header style={{ padding: '1.2rem', backgroundColor: '#0f0f1c' }}>
        <span className="notifications__title">Notifications</span>
        <span className="notifications__more">View All</span>
      </Card.Header>
      <div className="notifications__items">{getListItems()}</div>
    </Card>
  );
};

export default ChatNotifications;
