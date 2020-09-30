import React from "react";
import { connect } from "react-redux";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Login from "../pages/Login";
import ChatBox from "../pages/ChatBox";

const PrivateRoute = ({ component: Component, isAllowed, redirectTo, ...rest }) => {
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

const Router = ({ user }) => {
  const isLogin = () => {
    return !!user.username;
  };

  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoute isAllowed={isLogin()} component={ChatBox} exact path="/" redirectTo="/login" />
        <PrivateRoute isAllowed={!isLogin()} component={Login} path="/login" redirectTo="/" />
      </Switch>
    </BrowserRouter>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
  };
};

export default connect(mapStateToProps)(Router);;
