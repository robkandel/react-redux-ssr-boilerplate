import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { LoginForm } from 'components';

export default class Login extends Component {
  render() {
    return (<div>
      <Helmet title="Login" />
      <div className="contentPage">
        <div className="contentMaxWidth">
          <div className="contentTitleBlock">
            <h1 className="pageTitle">Log in</h1>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>);
  }
}
