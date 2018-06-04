import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { IndexLink } from 'react-router';
import { logout } from 'redux/modules/auth';
import { connect } from 'react-redux';


class LogoutPage extends Component {
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

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(logout())
  };
}

function mapStateToProps(state) {
  return {
    user: state.auth.user

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LogoutPage);
