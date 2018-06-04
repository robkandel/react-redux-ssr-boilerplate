import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import Helmet from 'react-helmet';
import { showUserInfo } from 'redux/modules/user';
import { logout } from 'redux/modules/auth';

@asyncConnect([{
  promise: ({ store: { dispatch, getState } }) => {
    const promises = [];
    if (getState().auth.user) {
      promises.push(dispatch(showUserInfo(getState().auth.user)));
    }
    return Promise.all(promises);
  }
}])

class Profile extends Component {
  static propTypes = {
    userInfo: PropTypes.object.isRequired,
    errorUserInfo: PropTypes.object,
    logout: PropTypes.func.isRequired
  };

  static defaultProps = {
    errorUserInfo: {}
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { userInfo, errorUserInfo } = this.props;
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
              {Object.keys(errorUserInfo).length === 0 && <div className="col col-12">
                <h2>Hi { userInfo.first_name + ' ' + userInfo.last_name}</h2>
                <p>This is a profile page that will host all your profile info</p>
              </div>}
            </div>
            <div className="row" style={{ marginTop: '2rem' }}>
              <div className="col">
                <div className="btn btn-danger" onClick={this.props.logout} role="button" tabIndex="0">Log Out</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(logout())
  };
}

function mapStateToProps(state) {
  return {
    userInfo: state.user.userInfo,
    errorUserInfo: state.user.errorUserInfo

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
