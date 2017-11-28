import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { IndexLink } from 'react-router';
import * as authActions from 'redux/modules/auth';
import { connect } from 'react-redux';

@connect(
  state => ({ user: state.auth.user }),
  authActions)

export default class LogoutPage extends Component {
  static propTypes = {
    logout: PropTypes.func.isRequired
  }
  render() {
    return (<div className="contentPage">
      <div className="contentMaxWidth">
        <div className="logoutBtn">
          <IndexLink to="/" className="btn btn-primary" onClick={this.props.logout}>Log out</IndexLink>
        </div>
      </div>
    </div>);
  }
}
