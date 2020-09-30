import React, { useRef, useState } from "react";
import { connect } from "react-redux";
import Card from "ui-library/Card";
import FlexContainer from "ui-library/FlexContainer";
import ChatScreen from "../components/ChatScreen";
import ContactInfo from '../components/ContactInfo';

const ChatBox = ({ user }) => {
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

export default connect(mapStateToProps)(ChatBox);
