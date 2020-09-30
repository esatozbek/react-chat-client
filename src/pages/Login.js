import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import TextInput from "ui-library/TextInput";
import Button from "ui-library/Button";
import { login } from "../store/actions/userActions";

const Login = (props) => {
  const history = useHistory();
  const [username, setUsername] = useState("");

  const loginUser = () => {
    props.login(username).then(resp => history.push('/'));
  };

  return (
    <div className="login">
      <div className="login__box">
        <TextInput label="New User" />
        <Button className="login__button" variant="primary">
          Create User
        </Button>
      </div>
      <div className="login__box">
        <TextInput
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          label="Existing user"
        />
        <Button onClick={loginUser} className="login__button" variant="primary">
          Login
        </Button>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    login(username) {
        return dispatch(login(username)).then(resp => console.log(resp));
    },
  };
};

export default connect(null, mapDispatchToProps)(Login);
