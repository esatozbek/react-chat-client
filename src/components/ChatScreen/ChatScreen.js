import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import Avatar from "ui-library/Avatar";
import Dropdown from "ui-library/Dropdown";
import SettingsModal from "../SettingsModal";
import { addToContacts } from "../../store/actions/contactActions";
import {
  getMessages,
  createMessage,
  listenMessages,
} from "../../store/actions/messageActions";
import useConversationBody from "../../hooks/useConversationBody";
import ApiRequestService from "../../service/ApiRequestService";

const ChatScreen = ({
  messageMap,
  user,
  getMessages,
  selectedContact,
  createMessage,
  listenMessages,
}) => {
  const [showMore, setShowMore] = useState(false);
  const [isSearchActive, setSearchActive] = useState(false);
  const [content, setContent] = useState("");
  const [showSettingsModal, setSettingsModal] = useState(false);
  const showMoreRef = useRef(null);
  const getConversationBody = useConversationBody(
    user,
    messageMap,
    selectedContact
  );

  useEffect(() => {
    getMessages();
    listenMessages();

    return () => {
      ApiRequestService.cancelRequests();
    };
  }, [getMessages, listenMessages]);

  const sendMessage = () => {
    if (content) createMessage(content, selectedContact);
  };

  const handleAddContact = () => {
    addToContacts(user.id, selectedContact.id);
  };

  return (
    <React.Fragment>
      <div className="chat">
        <div className="chat__header">
          <div className="contact-info">
            {selectedContact.username && (
              <Avatar
                src={process.env.PUBLIC_URL + "/avatar-girl.jpg"}
                size="sm"
                variant=""
              />
            )}
            <div className="contact-info__info">
              <div className="contact-info__info--name">
                {selectedContact.username}
              </div>
              {selectedContact.username && (
                <div className="contact-info__info--status">
                  <span className="contacts__item--status"></span>
                  <span>Online</span>
                </div>
              )}
            </div>
            <div className="chat__header--buttons">
              {selectedContact.username && (
                <span className={`search ${isSearchActive ? "active" : ""}`}>
                  <span
                    className="ti-search"
                    onClick={(e) => setSearchActive(!isSearchActive)}
                  ></span>
                  <input
                    className="chat-input__input"
                    placeholder="Search..."
                  />
                </span>
              )}
              <span
                className="ti-settings"
                onClick={() => setSettingsModal(!showSettingsModal)}
              ></span>
              <span
                className="ti-more"
                onClick={() => setShowMore(true)}
                ref={showMoreRef}
              ></span>
              <Dropdown
                target={showMoreRef}
                show={showMore}
                onHide={() => setShowMore(false)}
                placement="bottom-start"
              >
                <Dropdown.Item onClick={handleAddContact}>
                  Add To Contacts
                </Dropdown.Item>
                <Dropdown.Item onClick={() => console.log("Save")}>
                  Add To A Group
                </Dropdown.Item>
              </Dropdown>
            </div>
          </div>
        </div>
        <div className="chat__body">{getConversationBody()}</div>
        {selectedContact.username && (
          <div className="chat__footer">
            <div className="chat__footer--input">
              <div className="chat-input" style={{ margin: 0 }}>
                <span className="ti-search"></span>
                <input
                  className="chat-input__input"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
                <span className="ti-image"></span>
                <span className="ti-file"></span>
              </div>
            </div>
            <button className="chat__footer--send" onClick={sendMessage}>
              Send<span className="ti-angle-double-right"></span>
            </button>
          </div>
        )}
      </div>
      <SettingsModal
        showModal={showSettingsModal}
        setShowModal={setSettingsModal}
      />
    </React.Fragment>
  );
};

function mapStateToProps(state) {
  return {
    user: state.userReducer.user,
    messageMap: state.messageReducer.messageMap,
    selectedContact: state.contactReducer.selectedContact,
    selectedGroup: state.contactReducer.selectedGroup,
  };
}

export default connect(mapStateToProps, {
  getMessages,
  createMessage,
  listenMessages,
})(ChatScreen);
