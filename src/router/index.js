import React from "react";
import { connect } from "react-redux";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";
import Login from "../pages/Login";
import ChatBox from "../pages/ChatBox";

const PrivateRoute = ({
  component: Component,
  isAllowed,
  redirectTo,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAllowed ? <Component {...props} /> : <Redirect to={redirectTo} />
      }
    />
  );
};

const PublicRoute = ({ component: Component, ...rest }) => {
  return <Route {...rest} render={(props) => <Component {...props} />} />;
};

export const history = createBrowserHistory();

const Router = ({ user }) => {
  const isLogin = () => {
    return !!user.username;
  };

  return (
    <BrowserRouter>
      <PublicRoute isAllowed={!isLogin()} component={Login} path="/login" />
      <PrivateRoute
        isAllowed={isLogin()}
        component={ChatBox}
        exact
        path="/"
        redirectTo="/login"
      />
    </BrowserRouter>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
  };
};

export default connect(mapStateToProps)(Router);
