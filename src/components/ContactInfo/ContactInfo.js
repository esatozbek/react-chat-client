import React, { useState, useRef } from "react";
import { connect } from "react-redux";
import Tab from "ui-library/Tab";
import Overlay from "ui-library/Overlay";
import RecentChatsTab from "./RecentChatsTab";
// import GroupTab from "./GroupTab";
import ContactsTab from "./ContactsTab";
import ChatNotifications from "../ChatNotifications";
import { searchUsersByUsername } from "../../store/actions/userActions";
import { GroupListItem } from "./GroupTab";
import { selectContact } from "../../store/actions/contactActions";

const ContactInfo = ({ user, selectContact }) => {
  const notificationRef = useRef(null);
  const searchRef = useRef(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSearchUser, setShowSearchUser] = useState(false);
  const [searchUserInput, setSearchUserInput] = useState("");
  const [searchUserItems, setSearchUserItems] = useState([]);

  const handleSearchUser = (e) => {
    setSearchUserInput(e.target.value);
    searchUsersByUsername(e.target.value).then((resp) =>
      setSearchUserItems(resp)
    );
  };

  const handleSelectContact = (user) => {
    selectContact(user);
    setShowSearchUser(false);
  };

  return (
    <React.Fragment>
      <div className="contact-info">
        <div className="contact-info__info">
          <div>{user.username}</div>
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
      <div className="chat-input contact-info__search" ref={searchRef}>
        <span className="ti-search"></span>
        <input
          className="chat-input__input"
          placeholder="Search..."
          value={searchUserInput}
          onChange={handleSearchUser}
          onFocus={() => setShowSearchUser(true)}
          onBlur={() => setShowSearchUser(false)}
        />
        <Overlay
          target={searchRef}
          show={showSearchUser && searchUserInput.length > 2}
          placement="bottom"
          onHide={() => setShowNotifications(false)}
          showArrow
        >
          <div className="contact-info__search--items">
            {searchUserItems.length > 0 ? (
              searchUserItems.map((user) => (
                <ul key={`searchuser${user.id}`}>
                  <GroupListItem
                    title={user.username}
                    onClick={() => handleSelectContact(user)}
                  />
                </ul>
              ))
            ) : (
              <div className="info">No users found</div>
            )}
          </div>
        </Overlay>
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
        {/* <Tab key="group" title="Group">
          <div style={{ padding: ".8rem", fontWeight: "200" }}>Groups</div>
          <ul className="contacts">
            <GroupTab />
          </ul>
        </Tab> */}
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

export default connect(mapStateToProps, { selectContact })(ContactInfo);
