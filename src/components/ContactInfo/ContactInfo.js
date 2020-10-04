import React, { useState, useRef } from "react";
import { connect } from "react-redux";
import Tab from "ui-library/Tab";
import Overlay from "ui-library/Overlay";
import Avatar from "ui-library/Avatar";
import RecentChatsTab from "./RecentChatsTab";
import GroupTab from "./GroupTab";
import ContactsTab from "./ContactsTab";
import ChatNotifications from "../ChatNotifications";

const ContactInfo = ({ user }) => {
  const notificationRef = useRef(null);
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <React.Fragment>
      <div className="contact-info">
        <Avatar
          src={process.env.PUBLIC_URL + "/avatar-girl.jpg"}
          size="sm"
          variant=""
        />
        <div className="contact-info__info">
          <div>{user.username}</div>
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
        <Tab key="chat" title="Chat">
          <div style={{ padding: ".8rem", fontWeight: "200" }}>
            Recent Chats
          </div>
          <ul className="contacts">
            <RecentChatsTab />
          </ul>
        </Tab>
        <Tab key="group" title="Group">
          <div style={{ padding: ".8rem", fontWeight: "200" }}>Groups</div>
          <ul className="contacts">
            <GroupTab />
          </ul>
        </Tab>
        <Tab key="contacts" title="Contacts">
          <div style={{ padding: ".8rem", fontWeight: "200" }}>Contacts</div>
          <ul className="contacts">
            <ContactsTab />
          </ul>
        </Tab>
      </Tab.Container>
    </React.Fragment>
  );
};

ContactInfo.defaultProps = {
  users: [],
  groups: [],
};

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
  };
};

export default connect(mapStateToProps)(ContactInfo);
