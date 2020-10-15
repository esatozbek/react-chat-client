import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "ui-library/Spinner";
import Avatar from "ui-library/Avatar";
import {
  selectContact,
  getRecentChatUsers,
} from "../../store/actions/contactActions";
import { streamUsers } from "../../store/actions/userActions";

const ContactListItem = ({ className, user, ...props }) => {
  let status = "";
  if (user.status) status = user.status.toLowerCase();
  return (
    <li className={`contacts__item ${className}`} {...props}>
      <span className={`contacts__item--status ${status}`}></span>
      <Avatar
        src={process.env.PUBLIC_URL + "/avatar-girl.jpg"}
        size="sm"
        variant=""
        style={{ marginRight: ".8rem" }}
      />
      <div className="contacts__item--info">
        <div className="info-name">{user.username}</div>
        <div className="info-status">Some status that anyone will read</div>
      </div>
      <div className="contacts__item--status">3</div>
    </li>
  );
};

ContactListItem.propTypes = {
  user: PropTypes.object.isRequired,
};

const RecentChats = ({
  recentChatUsers,
  recentChatUsersError,
  recentChatUsersLoading,
  getRecentChatUsers,
  selectContact,
  selectedContact,
  streamUsers,
}) => {
  useEffect(() => {
    if (recentChatUsers.length === 0) getRecentChatUsers();
    streamUsers();
  }, []);

  const getRecentChats = () => {
    return recentChatUsers.map((user) => (
      <ContactListItem
        key={`user${user.id}`}
        user={user}
        onClick={() => selectContact(user)}
        className={user.id === selectedContact.id ? "selected" : ""}
      />
    ));
  };

  if (recentChatUsersLoading)
    return (
      <div className="loading">
        <Spinner />
      </div>
    );

  if (recentChatUsersError) return <div className="loading">Error</div>;

  return <React.Fragment>{getRecentChats()}</React.Fragment>;
};

const mapStateToProps = (state) => {
  return {
    recentChatUsers: state.contactReducer.recentChatUsers,
    recentChatUsersLoading: state.contactReducer.recentChatUsersLoading,
    recentChatUsersError: state.contactReducer.recentChatUsersError,
    selectedContact: state.contactReducer.selectedContact,
  };
};

export default connect(mapStateToProps, {
  getRecentChatUsers,
  selectContact,
  streamUsers,
})(RecentChats);
