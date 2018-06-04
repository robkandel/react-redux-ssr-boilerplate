import React, { Component } from 'react';

export default class Footer extends Component {
  render() {
    const styles = require('./Global.scss');
    return (<footer className={styles.footer}>
      <div className="container containerPadding">
        <div className="row" style={{ color: '#aaa' }}>
          <div className="col centerText">
            <span className={styles.copyright}><i>&copy;&nbsp;{new Date().getFullYear()}&nbsp;Rob Kandel</i></span>
          </div>
        </div>
      </div>
    </footer>);
  }
}
