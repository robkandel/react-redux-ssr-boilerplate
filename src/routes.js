import React from 'react';
import { IndexRoute, Route } from 'react-router';
import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth';
import {
  App,
  Home,
  Login,
  Logout,
  Profile,
  Register,
  NotFound
} from 'containers';

export default (store) => {
  const requireLogin = (nextState, replace, cb) => {
    function validSession(_user) {
      if (_user.session_expiration) {
        const exp = new Date(_user.session_expiration);
        const today = new Date();
        return exp > today;
      }
      return false;
    }
    function checkAuth() {
      const { auth: { user } } = store.getState();
      if (user && Object.keys(user).length === 0) {
        replace('/login?redirect=' + nextState.location.pathname);
      }
      cb();
    }
    const { auth: { user } } = store.getState();
    if (!isAuthLoaded(store.getState()) && user && Object.keys(user).length > 0) {
      if (!validSession(user)) {
        store.dispatch(loadAuth(user)).then(() => cb());
      } else {
        cb();
      }
    } else {
      checkAuth();
    }
  };
  return (
    <Route
      path="/"
      component={App}
      onChange={(prevState, nextState) => {
        if (nextState.location.action !== 'POP') {
          window.scrollTo(0, 0);
        }
      }}>

      { /* Home (main) route */ }
      <IndexRoute component={Home} />

      { /* Routes requiring login */ }
      <Route onEnter={requireLogin}>
        <Route path="logout" component={Logout} />
        <Route path="profile" component={Profile} />
      </Route>

      { /* Routes */ }
      <Route path="login" component={Login} />
      <Route path="register" component={Register} />

      { /* Catch all route */ }
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
