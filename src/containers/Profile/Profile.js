import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import * as authActions from 'redux/modules/auth';

@connect(
  state => ({
    user: state.auth.user
  }), authActions)

export default class Profile extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { user } = this.props;
    const styles = require('./Profile.scss');
    return (
      <div className={styles.profilePage}>
        <Helmet title="Profile" />
        <div className="contentPage">
          <div className="contentMaxWidth">
            <div className="contentTitleBlock">
              <h1 className="pageTitle">Profile</h1>
            </div>
            <div className="row" style={{ marginTop: '2rem' }}>
              <h2>Hi your user id is: {user.id}</h2>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
