import React from "react";
import Avatar from 'ui-library/Avatar';

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
        <div className="info-name">Steven Franklin</div>
        <div className="info-status">Some status that anyone will read</div>
      </div>
    </li>
  );
};

export default GroupListItem;
