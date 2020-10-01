import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Card from "ui-library/Card";
import FlexContainer from "ui-library/FlexContainer";
import ChatScreen from "../components/ChatScreen";
import ContactInfo from '../components/ContactInfo/ContactInfo';
import {
  getRecentChatUsers,
  getGroups,
  getContacts,
} from "../store/actions/contactActions";
import { getMessages } from "../store/actions/messageActions";

const ChatBox = ({ getRecentChatUsers, getGroups, getContacts}) => {
  useEffect(() => {
    getRecentChatUsers();
    getGroups();
    getContacts();
    getMessages();
  }, []);

  return (
    <FlexContainer>
      <Card style={{ flex: 1 }}>
        <ContactInfo />
      </Card>
      <Card style={{ flex: 2, marginLeft: 0 }}>
        <ChatScreen />
      </Card>
    </FlexContainer>
  );
};

ChatBox.defaultProps = {
  user: {}
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
  };
};

export default connect(mapStateToProps, { getRecentChatUsers, getGroups, getContacts })(ChatBox);
