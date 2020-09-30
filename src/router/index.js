import React from "react";
import { connect } from "react-redux";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Login from "../pages/Login";
import ChatBox from "../pages/ChatBox";

const PrivateRouteView = ({ component: Component, user, ...rest }) => {
  const isLogin = () => {
    return !!user.username;
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        isLogin() ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
  }
}

const PrivateRoute =  connect(mapStateToProps)(PrivateRouteView);

const PublicRoute = ({ component: Component, ...rest }) => {
  return <Route {...rest} render={(props) => <Component {...props} />} />;
};

const Router = (props) => {
  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoute component={ChatBox} exact path="/" />
        <PublicRoute component={Login} path="/login" />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
