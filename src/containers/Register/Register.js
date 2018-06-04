import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { RegistrationForm } from 'components';

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const styles = require('./Register.scss');
    return (
      <div className={styles.registrationPage}>
        <Helmet title="Register" />
        <div className="contentPage">
          <div className="contentMaxWidth">
            <div className="contentTitleBlock">
              <h1 className="pageTitle">Register</h1>
              <RegistrationForm />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
