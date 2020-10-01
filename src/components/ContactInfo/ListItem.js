import React from "react";
import PropTypes from "prop-types";

const ListItem = ({ name }) => {
  return (
    <li className="contacts__item">
      <div className="contacts__item--info">
        <div className="info-name">{name}</div>
      </div>
    </li>
  );
};

ListItem.propTypes = {
  name: PropTypes.string.isRequired,
};

export default ListItem;
