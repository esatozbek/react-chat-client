import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import Tab from "ui-library/Tab";
import Overlay from "ui-library/Overlay";
import Avatar from "ui-library/Avatar";
import ContactListItem from "./ContactListItem";
import GroupListItem from "./GroupListItem";
import ListItem from "./ListItem";
import ChatNotifications from "../ChatNotifications";
import {
  getGroups,
  getContacts,
  selectContact
} from "../../store/actions/contactActions";

const groupListItems = (groups) => {
  const items = [];
  groups.forEach((item) =>
    items.push(<GroupListItem key={item.title} title={item.title} />)
  );
  return items;
};

const listContacts = (contacts) => {
  const items = [];
  // items.push(
  //   <Avatar
  //     key="avatar1"
  //     src={process.env.PUBLIC_URL + "/avatar-girl.jpg"}
  //     size="sm"
  //     variant=""
  //     letter="S"
  //     style={{ margin: ".8rem" }}
  //   />
  // );
  // for (let i = 0; i < 5; i++) {
  //   items.push(<ListItem key={"list" + i} />);
  // }
  // items.push(
  //   <Avatar
  //     key="avatar2"
  //     src={process.env.PUBLIC_URL + "/avatar-girl.jpg"}
  //     size="sm"
  //     variant=""
  //     letter="S"
  //     style={{ margin: ".8rem" }}
  //   />
  // );
  // for (let i = 0; i < 5; i++) {
  //   items.push(<ListItem key={"list2" + i} />);
  // }
  contacts.forEach((item) =>
    items.push(<ListItem key={`contact${item.id}`} name={item.username} />)
  );
  return items;
};

const ContactInfo = ({
  user,
  recentChatUsers,
  groups,
  contacts,
  selectContact
}) => {
  const notificationRef = useRef(null);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    // getUsers();
    // getGroups();
    // getContacts();
  }, []);

  const getRecentChats = () => {
    return recentChatUsers.map((user) => (
      <ContactListItem key={`user${user.id}`} username={user.username} onClick={() => selectContact(user)} />
    ));
  };

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
        <Tab key="tab1" title="Chat">
          <div style={{ padding: ".8rem", fontWeight: "200" }}>
            Recent Chats
          </div>
          <ul className="contacts">{getRecentChats()}</ul>
        </Tab>
        <Tab key="tab1" title="Group">
          <div style={{ padding: ".8rem", fontWeight: "200" }}>Groups</div>
          <ul className="contacts">{groupListItems(groups)}</ul>
        </Tab>
        <Tab key="tab1" title="Contacts">
          <div style={{ padding: ".8rem", fontWeight: "200" }}>Contacts</div>
          <ul className="contacts">{listContacts(contacts)}</ul>
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
  console.log(state);
  return {
    user: state.userReducer.user,
    recentChatUsers: state.contactReducer.recentChatUsers,
    groups: state.contactReducer.groups,
    contacts: state.contactReducer.contacts,
    messages: state.messageReducer.messages,
  };
};

export default connect(mapStateToProps, { getGroups, getContacts, selectContact })(
  ContactInfo
);
