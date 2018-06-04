import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { register, emailCheck } from 'redux/modules/auth';

class RegistrationForm extends Component {
  static propTypes = {
    register: PropTypes.func.isRequired,
    emailCheck: PropTypes.func.isRequired,
    registering: PropTypes.bool,
    registrationError: PropTypes.bool,
    registrationErrorText: PropTypes.object,
    isCheckingEmail: PropTypes.bool,
    checkResult: PropTypes.bool,
    user: PropTypes.object
  }

  static defaultProps = {
    user: {},
    registering: false,
    registrationError: false,
    registrationErrorText: {},
    isCheckingEmail: false,
    checkResult: true
  }

  constructor(props) {
    super(props);
    this.state = {
      step: 0,
      email: Object.keys(this.props.user).length === 0 ? '' : this.props.user.email,
      password: '',
      firstName: Object.keys(this.props.user).length === 0 ? '' : this.props.user.fist_name,
      lastName: Object.keys(this.props.user).length === 0 ? '' : this.props.user.last_name,
      phoneNumber: Object.keys(this.props.user).length === 0 ? '' : this.props.user.phone_number,
      emailError: false,
      passwordError: false,
      firstNameError: false,
      lastNameError: false,
      phoneNumberError: false,
      emailExists: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isCheckingEmail && !nextProps.isCheckingEmail && nextProps.checkResult) {
      this.setState({ step: 1 });
    }
    if (this.props.isCheckingEmail && !nextProps.isCheckingEmail && !nextProps.checkResult) {
      this.setState({ emailError: true, passwordError: false, emailExists: true });
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.props.registering) {
      return false;
    }
    if (this.state.step === 0) {
      if (this.state.email !== '' && this.state.password !== '' && this.validateEmail(this.state.email) && this.validPassword(this.state.password)) {
        this.state.formData = new FormData();
        this.state.formData.append('email', this.state.email.trim());
        this.state.formData.append('password', this.state.password.trim());
        this.state.formData.append('password_confirmation', this.state.password.trim());
        this.setState({ emailError: false, passwordError: false, emailExists: false });
        this.props.emailCheck(this.state.email.trim());
      } else {
        if (this.state.email === '' || !this.validateEmail(this.state.email)) {
          this.setState({ emailError: true });
        } else {
          this.setState({ errorError: false });
        }
        if (this.state.password === '' || !this.validPassword(this.state.password)) {
          this.setState({ passwordError: true });
        } else {
          this.setState({ passwordError: false });
        }
      }
    }
    if (this.state.step === 1) {
      if (this.state.firstName !== '' && this.state.lastName !== '' && this.state.phoneNumber !== '' && this.validatePhone(this.state.phoneNumber)) {
        this.state.formData.append('first_name', this.state.firstName.trim());
        this.state.formData.append('last_name', this.state.lastName.trim());
        this.state.formData.append('phone_number', this.state.phoneNumber.trim().replace(/ /g, '').substring(0, 13));
        this.props.register(this.state.formData);
      } else {
        if (this.state.firstName === '') {
          this.setState({ firstNameError: true });
        } else {
          this.setState({ firstNameError: false });
        }
        if (this.state.lastName === '') {
          this.setState({ lastNameError: true });
        } else {
          this.setState({ lastNameError: false });
        }
        if (this.state.phoneNumber === '' || !this.validatePhone(this.state.phoneNumber)) {
          this.setState({ phoneNumberError: true });
        } else {
          this.setState({ phoneNumberError: false });
        }
      }
    }
  }

  validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;'":\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  validPassword(password) {
    return password.trim().length >= 6 && password.trim().length <= 128;
  }

  validatePhone(phone) {
    const phoneNumber = phone.replace(/\D/g, '');
    const num = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    return phoneNumber.substring(0, 10).match(num);
  }

  formatPhoneNumber(number) {
    let val = number.replace(/\D/g, '');
    val = val.substring(0, 10);
    const size = val.length;
    if (size === 0) {
      return val;
    }
    if (size < 4) {
      val = '( ' + val;
    } else if (size < 7) {
      val = '(' + val.substring(0, 3) + ') ' + val.substring(3, 6);
    } else {
      val = '(' + val.substring(0, 3) + ') ' + val.substring(3, 6) + ' - ' + val.substring(6, 10);
    }
    return val;
  }

  render() {
    const { registering, registrationError, registrationErrorText, isCheckingEmail, checkResult } = this.props;
    return (<form className="formWrapper" onSubmit={this.handleSubmit}>
      {this.state.step === 0 && <div className="formStep">
        <div className="inputWrapper">
          <label htmlFor="reg_email">Email Address</label>
          <div className="input-group">
            <input type="text" id="reg_email" placeholder="Enter your email address" className={(this.state.emailError || !checkResult) ? 'form-control is-invalid' : 'form-control no-error'} value={this.state.email} onChange={(event) => this.setState({ email: event.target.value })} />
            <div className={(this.state.emailError || !checkResult) ? 'input-group-append error' : 'input-group-append'}>
              <span className="input-group-text" style={{ backgroundColor: '#fff' }}><i className="fas fa-envelope" aria-hidden="true" /></span>
            </div>
            {this.state.emailExists && <div className="invalid-feedback" style={{ marginTop: '.25rem', fontSize: '.875rem', color: '#dc3545', display: 'block' }}>This email already exists, please choose another email or login</div>}
          </div>
        </div>
        <div className="inputWrapper">
          <label htmlFor="reg_password">Password</label>
          <div className="input-group">
            <input type="password" id="reg_password" placeholder="Create a password" className={(this.state.passwordError) ? 'form-control is-invalid' : 'form-control no-error'} value={this.state.password} onChange={(event) => this.setState({ password: event.target.value })} />
            <div className={(this.state.passwordError) ? 'input-group-append error' : 'input-group-append'}>
              <span className="input-group-text" style={{ backgroundColor: '#fff' }}><i className="fas fa-unlock-alt" aria-hidden="true" /></span>
            </div>
          </div>
          {this.state.passwordError && <div className="invalid-feedback" style={{ marginTop: '.25rem', fontSize: '.875rem', color: '#dc3545', display: 'block' }}>Passwords need to be at least 6 characters long</div>}
        </div>
        <button className="btn btn-primary" style={{ display: 'block', width: '100%' }} onClick={this.handleSubmit}>{isCheckingEmail ? <i className="fa fa-circle-o-notch fa-spin fa-1x fa-fw" /> : 'Sign up'}</button>
      </div>}
      {this.state.step === 1 && <div className="formStep">
        <div className="row">
          <div className="col col-12 col-md-6">
            <div className="inputWrapper">
              <label htmlFor="reg_firstName">First Name</label>
              <div className="input-group">
                <input type="text" id="reg_firstName" placeholder="First Name" className={(this.state.firstNameError) ? 'form-control is-invalid' : 'form-control no-error'} value={this.state.firstName} onChange={(event) => this.setState({ firstName: event.target.value })} />
                <div className={(this.state.firstNameError) ? 'input-group-append error' : 'input-group-append'}>
                  <span className="input-group-text" style={{ backgroundColor: '#fff' }}><i className="fas fa-user" aria-hidden="true" /></span>
                </div>
              </div>
            </div>
          </div>
          <div className="col col-12 col-md-6">
            <div className="inputWrapper">
              <label htmlFor="reg_lastName">Last Name</label>
              <div className="input-group">
                <input type="text" id="reg_lastName" placeholder="Last Name" className={(this.state.lastNameError) ? 'form-control is-invalid' : 'form-control no-error'} value={this.state.lastName} onChange={(event) => this.setState({ lastName: event.target.value })} />
                <div className={(this.state.lastNameError) ? 'input-group-append error' : 'input-group-append'}>
                  <span className="input-group-text" style={{ backgroundColor: '#fff' }}><i className="fas fa-user" aria-hidden="true" /></span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col col-12 col-md-12">
            <div className="inputWrapper">
              <label htmlFor="reg_phoneNumber">Phone Number</label>
              <div className="input-group">
                <input type="tel" id="reg_phoneNumber" placeholder="Phone Number" className={(this.state.phoneNumberError) ? 'form-control is-invalid' : 'form-control no-error'} value={this.formatPhoneNumber(this.state.phoneNumber)} onChange={(event) => this.setState({ phoneNumber: event.target.value })} />
                <div className={(this.state.phoneNumberError) ? 'input-group-append error' : 'input-group-append'}>
                  <span className="input-group-text" style={{ backgroundColor: '#fff' }}><i className="fas fa-phone" aria-hidden="true" /></span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {registrationError && <div className="invalid-feedback" style={{ marginTop: '.25rem', fontSize: '.875rem', color: '#dc3545' }}>{registrationErrorText.error}</div>}
        <button className="btn btn-primary" style={{ display: 'block', width: '100%' }} onClick={this.handleSubmit}>{registering ? <i className="fa fa-circle-o-notch fa-spin fa-1x fa-fw" /> : 'Complete Registration'}</button>
      </div>}
    </form>);
  }
}


function mapDispatchToProps(dispatch) {
  return {
    register: (formData) => dispatch(register(formData)),
    emailCheck: (email) => dispatch(emailCheck(email))
  };
}

function mapStateToProps(state) {
  return {
    registering: state.auth.registering,
    user: state.auth.user,
    registrationError: state.auth.registrationError,
    registrationErrorText: state.auth.registrationErrorText,
    isCheckingEmail: state.auth.isCheckingEmail,
    checkResult: state.auth.checkResult

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm);
