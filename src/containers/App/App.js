import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import Helmet from 'react-helmet';
import { push } from 'react-router-redux';
import { isLoaded as isAuthLoaded, load as loadAuth, logout } from 'redux/modules/auth';
import { Header, Footer } from 'components';
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

class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    user: PropTypes.object,
    location: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired,
    push: PropTypes.func.isRequired,
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
      this.props.push(redirect || '/profile');
    }
    if (Object.keys(this.props.user).length > 0 && Object.keys(nextProps.user).length === 0) {
      this.props.push('/');
    }
  }

  logout = (event) => {
    event.preventDefault();
    this.props.logout();
  }

  render() {
    const styles = require('./App.scss');
    return (
      <div className={styles.app}>
        <Helmet {...config.app.head} />
        <Header />
        <div className={styles.appContent}>
          {this.props.children}
        </div>
        <Footer />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    push: (url) => dispatch(push(url)),
    logout: () => dispatch(logout())
  };
}

function mapStateToProps(state) {
  return {
    user: state.auth.user

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
