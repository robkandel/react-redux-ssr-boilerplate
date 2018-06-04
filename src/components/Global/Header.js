import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout } from 'redux/modules/auth';
import { IndexLink, Link } from 'react-router';
import config from '../../config';


class Header extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  logout = (event) => {
    event.preventDefault();
    this.props.logout();
  }

  render() {
    const { user } = this.props;
    const styles = require('./Global.scss');
    return (<header className={styles.header}>
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
                  <Link to="/register" className="btn btn-primary">Sign up</Link>
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
    </header>);
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

export default connect(mapStateToProps, mapDispatchToProps)(Header);
