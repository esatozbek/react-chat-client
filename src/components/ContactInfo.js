import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import Tab from "ui-library/Tab";
import Overlay from "ui-library/Overlay";
import Avatar from "ui-library/Avatar";
import ContactListItem from "../components/ContactListItem";
import GroupListItem from "../components/GroupListItem";
import ListItem from "../components/ListItem";
import ChatNotifications from "../components/ChatNotifications";
import {
  getUsers,
  getGroups,
  getContacts,
} from "../store/actions/contactActions";

const contactListItems = (users) => {
  const items = [];
  console.log(users);
  users.forEach((item) =>
    items.push(<ContactListItem key={item.username} username={item.username} />)
  );
  return items;
};

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
  contacts.forEach(item => items.push(<ListItem key={`contact${item.id}`} name={item.username} />));
  return items;
};

const ContactInfo = ({
  user,
  getUsers,
  getGroups,
  users,
  groups,
  getContacts,
  contacts
}) => {
  const notificationRef = useRef(null);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    getUsers();
    getGroups();
    getContacts();
  }, []);

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
          <ul className="contacts">{contactListItems(users)}</ul>
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
    users: state.contactReducer.users,
    groups: state.contactReducer.groups,
    contacts: state.contactReducer.contacts
  };
};

export default connect(mapStateToProps, { getUsers, getGroups, getContacts })(
  ContactInfo
);
