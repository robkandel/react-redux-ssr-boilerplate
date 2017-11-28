import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import Helmet from 'react-helmet';
import { push } from 'react-router-redux';
import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth';
import * as authActions from 'redux/modules/auth';
import { IndexLink, Link } from 'react-router';
import config from '../../config';

@asyncConnect([{
  promise: ({ store: { dispatch, getState } }) => {
    const promises = [];
    if (getState().auth.user && Object.keys(getState().auth.user).length > 0 && !isAuthLoaded(getState())) {
      promises.push(dispatch(loadAuth(getState().auth.user)));
    }
    return Promise.all(promises);
  }
}])

@connect(
  state => ({
    user: state.auth.user,
  }), { ...authActions, pushState: push })

export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    user: PropTypes.object,
    location: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired,
    pushState: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired
  };

  static contextTypes = {
    store: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired
  };

  static defaultProps = {
    user: {}
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.user && Object.keys(this.props.user).length === 0 && Object.keys(nextProps.user).length > 0) {
      const redirect = this.props.router.location.query && this.props.router.location.query.redirect;
      this.props.pushState(redirect || '/profile');
    }
    if (Object.keys(this.props.user).length > 0 && Object.keys(nextProps.user).length === 0) {
      this.props.pushState('/');
    }
  }

  logout = (event) => {
    event.preventDefault();
    this.props.logout();
  }

  render() {
    const { user } = this.props;
    const styles = require('./App.scss');
    return (
      <div className={styles.app}>
        <Helmet {...config.app.head} />
        <header className={styles.header}>
          <div className={styles.inner}>
            <div className="row">
              <div className={styles.logo + ' col col-12 col-md-8 col-xl-10'}>
                <IndexLink to="/" className={styles.navLink + ' textBtn'}>
                  <span className={styles.siteTitle}>{config.app.title}</span>
                </IndexLink>
              </div>
              <div className={styles.menuWrapper + ' col col-12 col-md-4 col-xl-2'}>
                <nav className={styles.mainNav}>
                  {(!user || (user && Object.keys(user).length === 0)) && <div className="row">
                    <div className={styles.navItem + ' col'}>
                      <Link to="/login" className={styles.navLink + ' textBtn'}>Login</Link>
                    </div>
                    <div className={styles.navItem + ' col'}>
                      <Link to="/register" className="btn btn-acw">Sign up</Link>
                    </div>
                  </div>}
                  {user && Object.keys(user).length !== 0 && <div className="row">
                    <div className={styles.navItem + ' col'}>
                      <Link to="/profile" className={styles.navLink + ' textBtn'}>Profile</Link>
                    </div>
                    <div className={styles.navItem + ' col'}>
                      <Link to="/logout" className={styles.navLink + ' btn btn-danger'} onClick={(event) => this.logout(event)}>Logout</Link>
                    </div>
                  </div>}
                </nav>
              </div>
            </div>
          </div>
        </header>
        <div className={styles.appContent}>
          {this.props.children}
        </div>
        <footer className={styles.footer}>
          <div className="container containerPadding">
            <div className="row" style={{ margin: '2rem 0 -3rem', color: '#aaa' }}>
              <div className="col centerText">
                <span className={styles.copyright}><i>&copy;&nbsp;{new Date().getFullYear()}&nbsp;Built by Little Long Doggie Stuidos, LLC</i></span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}
