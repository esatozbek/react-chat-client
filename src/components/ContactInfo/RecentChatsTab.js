import React, { useEffect } from "react";
import { connect } from "react-redux";
import Spinner from "ui-library/Spinner";
import Avatar from "ui-library/Avatar";
import {
  selectContact,
  getRecentChatUsers,
} from "../../store/actions/contactActions";

const ContactListItem = ({ className, ...props }) => {
  return (
    <li className={`contacts__item ${className}`} {...props}>
      <span className="contacts__item--status"></span>
      <Avatar
        src={process.env.PUBLIC_URL + "/avatar-girl.jpg"}
        size="sm"
        variant=""
        style={{ marginRight: ".8rem" }}
      />
      <div className="contacts__item--info">
        <div className="info-name">{props.username}</div>
        <div className="info-status">Some status that anyone will read</div>
      </div>
      <div className="contacts__item--lastseen">5 min</div>
    </li>
  );
};

const RecentChats = ({
  recentChatUsers,
  recentChatUsersError,
  recentChatUsersLoading,
  getRecentChatUsers,
  selectContact,
  selectedContact
}) => {
  useEffect(() => {
    if (recentChatUsers.length === 0) getRecentChatUsers();
  }, []);

  const getRecentChats = () => {
    return recentChatUsers.map((user) => (
      <ContactListItem
        key={`user${user.id}`}
        username={user.username}
        onClick={() => selectContact(user)}
        className={user.id === selectedContact.id ? 'selected' : ''}
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

export default connect(mapStateToProps, { getRecentChatUsers, selectContact })(
  RecentChats
);
