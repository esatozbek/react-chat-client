import React, { useEffect } from "react";
import { connect } from "react-redux";
import Spinner from "ui-library/Spinner";
import Avatar from "ui-library/Avatar";
import { getGroups } from "../../store/actions/contactActions";

const GroupListItem = (props) => {
  return (
    <li className="contacts__item">
      <Avatar
        src={process.env.PUBLIC_URL + "/avatar-girl.jpg"}
        size="sm"
        variant=""
        letter="S"
        style={{ marginRight: ".8rem" }}
      />
      <div className="contacts__item--info">
        <div className="info-name">{props.title}</div>
        <div className="info-status">Some status that anyone will read</div>
      </div>
    </li>
  );
};

const GroupTab = ({ groups, groupsLoading, groupsError, getGroups }) => {
  useEffect(() => {
    if (groups.length === 0) getGroups();
  }, []);

  const groupListItems = () => {
    const items = [];
    groups.forEach((item) =>
      items.push(<GroupListItem key={item.title} title={item.title} />)
    );
    return items;
  };

  if (groupsLoading)
    return (
      <div className="loading">
        <Spinner />
      </div>
    );

  if (groupsError) return <div className="loading">Error</div>;

  return <React.Fragment>{groupListItems()}</React.Fragment>;
};

const mapStateToProps = (state) => {
  return {
    groups: state.contactReducer.groups,
    groupsLoading: state.contactReducer.groupsLoading,
    groupsError: state.contactReducer.groupsError,
  };
};

export default connect(mapStateToProps, { getGroups })(GroupTab);
