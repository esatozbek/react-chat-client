import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import TextInput from "ui-library/TextInput";
import Button from "ui-library/Button";
import LoadingButton from "ui-library/LoadingButton";
import { login } from "../store/actions/userActions";

const Login = (props) => {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  const loginUser = () => {
    setLoading(true);
    props.login(username).then((resp) => {
      setLoading(false);
      history.push("/");
    });
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
        <LoadingButton
          onClick={loginUser}
          className="login__button"
          variant="primary"
          loading={loading}
        >
          Login
        </LoadingButton>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    login(username) {
      return dispatch(login(username)).then((resp) => console.log(resp));
    },
  };
};

export default connect(null, mapDispatchToProps)(Login);
