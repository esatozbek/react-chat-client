import React, { useRef, useState } from "react";
import Card from "ui-library/Card";
import FlexContainer from "ui-library/FlexContainer";
import Avatar from "ui-library/Avatar";
import TextInput from "ui-library/TextInput";
import Tab from "ui-library/Tab";
import Overlay from "ui-library/Overlay";
import ContactListItem from "../components/ContactListItem";
import GroupListItem from "../components/GroupListItem";
import ListItem from "../components/ListItem";
import ChatScreen from "../components/ChatScreen";
import ChatNotifications from "../components/ChatNotifications";

const contactListItems = () => {
  const items = [];
  for (let i = 0; i < 10; i++) {
    items.push(<ContactListItem key={"contact" + i} />);
  }
  return items;
};

const groupListItems = () => {
  const items = [];
  for (let i = 0; i < 10; i++) {
    items.push(<GroupListItem key={"group" + i} />);
  }
  return items;
};

const listItems = () => {
  const items = [];
  items.push(
    <Avatar
      key="avatar1"
      src={process.env.PUBLIC_URL + "/avatar-girl.jpg"}
      size="sm"
      variant=""
      letter="S"
      style={{ margin: ".8rem" }}
    />
  );
  for (let i = 0; i < 5; i++) {
    items.push(<ListItem key={"list" + i} />);
  }
  items.push(
    <Avatar
      key="avatar2"
      src={process.env.PUBLIC_URL + "/avatar-girl.jpg"}
      size="sm"
      variant=""
      letter="S"
      style={{ margin: ".8rem" }}
    />
  );
  for (let i = 0; i < 5; i++) {
    items.push(<ListItem key={"list2" + i} />);
  }
  return items;
};

const ChatBox = (props) => {
  const notificationRef = useRef(null);
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <FlexContainer>
      <Card style={{ flex: 1 }}>
        <div className="contact-info">
          <Avatar
            src={process.env.PUBLIC_URL + "/avatar-girl.jpg"}
            size="sm"
            variant=""
          />
          <div className="contact-info__info">
            <div>User</div>
            <div className="contact-info__info--status">
              <span className="contacts__item--status"></span>
              <span>Online</span>
            </div>
          </div>
          <span
            className="ti-bell"
            ref={notificationRef}
            onClick={() => setShowNotifications(!showNotifications)}
          ></span>
          <Overlay
            target={notificationRef}
            show={showNotifications}
            placement="bottom"
            onHide={() => setShowNotifications(false)}
            showArrow
          >
            <ChatNotifications />
          </Overlay>
        </div>
        <div className="chat-input">
          <span className="ti-search"></span>
          <input className="chat-input__input" placeholder="Search..." />
        </div>
        <Tab.Container>
          <Tab key="tab1" title="Chat">
            <div style={{ margin: ".8rem", fontWeight: "200" }}>
              Recent Chats
            </div>
            <ul className="contacts">{contactListItems()}</ul>
          </Tab>
          <Tab key="tab1" title="Group">
            <div style={{ margin: ".8rem", fontWeight: "200" }}>Groups</div>
            <ul className="contacts">{groupListItems()}</ul>
          </Tab>
          <Tab key="tab1" title="Contacts">
            <div style={{ margin: ".8rem", fontWeight: "200" }}>Contacts</div>
            <ul className="contacts">{listItems()}</ul>
          </Tab>
        </Tab.Container>
      </Card>
      <Card style={{ flex: 2, marginLeft: 0 }}>
        <ChatScreen />
      </Card>
    </FlexContainer>
  );
};

export default ChatBox;
