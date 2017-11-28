import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as authActions from 'redux/modules/auth';
import { Link } from 'react-router';

@connect(
  state => ({
    logingIn: state.auth.logingIn,
    loginError: state.auth.loginError
  }), authActions)

export default class LoginForm extends Component {
  static propTypes = {
    login: PropTypes.func.isRequired,
    logingIn: PropTypes.bool,
    loginError: PropTypes.bool
  }

  static defaultProps = {
    logingIn: false,
    loginError: false
  };

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      usernameError: false,
      passwordError: false
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.username !== '' && this.state.password !== '') {
      this.props.login(this.state.username, this.state.password);
      this.setState({ password: '' });
    } else {
      if (this.state.username === '') {
        this.setState({ usernameError: true });
      } else {
        this.setState({ usernameError: false });
      }
      if (this.state.password === '') {
        this.setState({ passwordError: true });
      } else {
        this.setState({ passwordError: false });
      }
    }
  }

  render() {
    const { logingIn, loginError } = this.props;
    return (<form className="formWrapper" onSubmit={this.handleSubmit}>
      {loginError && <div className="invalid-feedback" style={{ marginBottom: '1rem', fontSize: '.875rem', color: '#dc3545', display: 'block' }}>Incorrect Email/Password</div>}
      <div className={(this.state.usernameError || loginError) ? 'form-group has-danger' : 'form-group'}>
        <label htmlFor="reg_email">Email Address</label>
        <div className="input-group">
          <input type="text" id="reg_email" placeholder="Enter your email address" className={(this.state.usernameError || loginError) ? 'form-control is-invalid' : 'form-control no-error'} value={this.state.username} onChange={(event) => this.setState({ username: event.target.value })} style={{ borderRight: 'none' }} />
          <span className={(this.state.usernameError || loginError) ? 'input-group-addon is-invalid' : 'input-group-addon no-error'} style={{ backgroundColor: '#fff', borderLeft: 'none' }}><i className="fa fa-envelope-o" aria-hidden="true" /></span>
        </div>
      </div>
      <div className={(this.state.passwordError || loginError) ? 'form-group has-danger' : 'form-group'}>
        <label htmlFor="reg_password">Password</label>
        <div className="input-group">
          <input type="password" id="reg_password" placeholder="Create a password" className={(this.state.passwordError || loginError) ? 'form-control is-invalid' : 'form-control no-error'} value={this.state.password} onChange={(event) => this.setState({ password: event.target.value })} style={{ borderRight: 'none' }} />
          <span className={(this.state.passwordError || loginError) ? 'input-group-addon is-invalid' : 'input-group-addon no-error'} style={{ backgroundColor: '#fff', borderLeft: 'none' }}><i className="fa fa-lock" aria-hidden="true" /></span>
        </div>
      </div>
      <button className="btn btn-primary" style={{ display: 'block', width: '100%' }} onClick={this.handleSubmit}>{logingIn ? <i className="fa fa-circle-o-notch fa-spin fa-1x fa-fw" /> : 'Log in'}</button>
      <div className="row" style={{ marginTop: '1rem' }}>
        <div className="col">
          <Link to="/register">Don't have an account? Sign Up!</Link>
        </div>
      </div>
    </form>);
  }
}
