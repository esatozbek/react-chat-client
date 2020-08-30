import React from "react";
import Card from "ui-library/Card";
import NotificationListItem from "./NotificationListItem";

const getListItems = () => {
  const list = [];
  for (let i = 0; i < 10; i++)
    list.push(<NotificationListItem key={"notitem" + i} />);
  return list;
};

const ChatNotifications = (props) => {
  return (
    <Card style={{ zIndex: 10, boxShadow: '7px 7px 10px 0px rgba(0,0,0,0.75)' }}>
      <Card.Header style={{ padding: '.8rem' }}>
        <span className="notifications__title">Notifications</span>
        <span className="notifications__more">View All</span>
      </Card.Header>
      <div className="notifications__items">{getListItems()}</div>
    </Card>
  );
};

export default ChatNotifications;