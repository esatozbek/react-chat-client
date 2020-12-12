import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import Modal from "ui-library/Modal";
import Card from "ui-library/Card";
import Title from "ui-library/Title";
import Button from "ui-library/Button";
import { logout } from "../store/actions/userActions";

const SettingsModal = ({ showModal, setShowModal }) => {
  const history = useHistory();
  const logoutUser = () => {
    logout();
    history.push("/login");
  };

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Card className="settings__container">
        <Card.Header>
          <Title title="Settings" />
        </Card.Header>
        <Card.Body></Card.Body>
        <Card.Footer>
          <Button variant="danger" className="pull-right" onClick={logoutUser}>
            Logout
          </Button>
        </Card.Footer>
      </Card>
    </Modal>
  );
};

export default connect(null, { logout })(SettingsModal);
