import 'babel-polyfill';
// import { useScroll } from 'react-router-scroll';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { ReduxAsyncConnect } from 'redux-connect';
import createStore from './redux/create';
import ApiClient from './helpers/ApiClient';

import getRoutes from './routes';

const client = new ApiClient();
// const bHistory = useScroll(() => browserHistory)();
const dest = document.getElementById('content');
const store = createStore(browserHistory, client, window.boilerplate_data);
const history = syncHistoryWithStore(browserHistory, store);

const component = (
  <Router
    render={(props) => <ReduxAsyncConnect {...props} helpers={{ client }} filter={item => !item.deferred} />}
    history={history}>
    {getRoutes(store)}
  </Router>
);

ReactDOM.hydrate(
  <Provider store={store} key="provider">
    {component}
  </Provider>,
  dest
);

if (process.env.NODE_ENV !== 'production') {
  window.React = React; // enable debugger
}
