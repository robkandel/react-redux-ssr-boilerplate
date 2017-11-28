import React, { Component } from 'react';
import Helmet from 'react-helmet';
import config from '../../config';

export default class Home extends Component {
  render() {
    const styles = require('./Home.scss');
    return (
      <div className={styles.home}>
        <Helmet title="Home" />
        <div className={styles.textWrap}>
          <div className="container centerText">
            <h1 className={styles.siteTitle}>{config.app.title}</h1>
            <h5 className={styles.siteTagline} dangerouslySetInnerHTML={{ __html: config.app.description }} />
          </div>
        </div>
      </div>
    );
  }
}
