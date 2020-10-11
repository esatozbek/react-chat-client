import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "ui-library/Spinner";
import Avatar from "ui-library/Avatar";
import {
  getContacts,
  listenContacts,
  selectContact,
} from "../../store/actions/contactActions";

const ListItem = ({ name, className, ...props }) => {
  return (
    <li className={`contacts__item ${className}`} {...props}>
      <div className="contacts__item--info">
        <div className="info-name">{name}</div>
      </div>
    </li>
  );
};

ListItem.propTypes = {
  name: PropTypes.string.isRequired,
};

const ContactsTab = ({
  contacts,
  contactsLoading,
  contactsError,
  getContacts,
  selectContact,
  selectedContact
}) => {
  useEffect(() => {
    if (contacts && contacts.length === 0) getContacts();
    listenContacts();
  }, [getContacts]);

  const listContacts = () => {
    const items = [];
    items.push(
      <Avatar
        key="avatar2"
        src={process.env.PUBLIC_URL + "/avatar-girl.jpg"}
        size="sm"
        variant=""
        letter="U"
        style={{ margin: ".8rem" }}
      />
    );
    if (contacts && contacts.length !== 0)
      contacts.forEach((item) =>
        items.push(
          <ListItem
            key={`contact${item.id}`}
            name={item.username}
            onClick={() => selectContact(item)}
            className={item.id === selectedContact.id ? 'selected' : ''}
          />
        )
      );
    return items;
  };

  if (contactsLoading)
    return (
      <div className="loading">
        <Spinner />
      </div>
    );

  if (contactsError) return <div className="loading">Error</div>;

  return <React.Fragment>{listContacts()}</React.Fragment>;
};

const mapStateToProps = (state) => {
  return {
    contacts: state.contactReducer.contacts,
    contactsLoading: state.contactReducer.contactsLoading,
    contactsError: state.contactReducer.contactsError,
    selectedContact: state.contactReducer.selectedContact
  };
};

export default connect(mapStateToProps, { getContacts, selectContact })(
  ContactsTab
);
