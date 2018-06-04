import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as reduxAsyncConnect } from 'redux-connect';

import auth from './auth';
import user from './user';

export default combineReducers({
  routing: routerReducer,
  reduxAsyncConnect,
  auth,
  user
});
