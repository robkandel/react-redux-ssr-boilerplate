import cookie from 'js-cookie';
import defaults from './defaults';
const LOAD = 'react-boilerplate/auth/LOAD';
const LOAD_SUCCESS = 'react-boilerplate/auth/LOAD_SUCCESS';
const LOAD_FAIL = 'react-boilerplate/auth/LOAD_FAIL';
const LOGIN = 'react-boilerplate/auth/LOGIN';
const LOGIN_SUCCESS = 'react-boilerplate/auth/LOGIN_SUCCESS';
const LOGIN_FAIL = 'react-boilerplate/auth/LOGIN_FAIL';
const LOGOUT_SUCCESS = 'react-boilerplate/auth/LOGOUT_SUCCESS';
const EMAIL_CHECK = 'react-boilerplate/auth/EMAIL_CHECK';
const EMAIL_CHECK_SUCCESS = 'react-boilerplate/auth/EMAIL_CHECK_SUCCESS';
const EMAIL_CHECK_FAIL = 'react-boilerplate/auth/EMAIL_CHECK_FAIL';
const REGISTER = 'react-boilerplate/auth/REGISTER';
const REGISTER_SUCCESS = 'react-boilerplate/auth/REGISTER_SUCCESS';
const REGISTER_FAIL = 'react-boilerplate/auth/REGISTER_FAIL';

const initialState = defaults.auth;

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      if (action.result.success) {
        cookie.set('_REACT_REDUX_SSR_BOILERPLATE', action.result.record, { path: '/', expires: new Date(action.result.record.expires) });
      }
      return {
        ...state,
        loading: false,
        loaded: true,
        user: action.result.success ? action.result.record : {}
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    case LOGIN:
      return {
        ...state,
        logingIn: true,
      };
    case LOGIN_SUCCESS:
      cookie.set('_REACT_REDUX_SSR_BOILERPLATE', action.result.record, { path: '/', expires: new Date(action.result.record.expires) });
      return {
        ...state,
        loaded: true,
        logingIn: false,
        user: action.result.record
      };
    case LOGIN_FAIL:
      return {
        ...state,
        logingIn: false,
        user: {},
        loginError: true,
        loginErrorText: action.error
      };
    case LOGOUT_SUCCESS:
      cookie.remove('_REACT_REDUX_SSR_BOILERPLATE', { path: '' });
      return {
        ...state,
        loggingOut: false,
        user: {}
      };
    case REGISTER:
      return {
        ...state,
        registering: true,
        registrationError: false,
        user: {}
      };
    case REGISTER_SUCCESS:
      cookie.set('_REACT_REDUX_SSR_BOILERPLATE', action.result.record, { path: '/', expires: new Date(action.result.record.expires) });
      return {
        ...state,
        registering: false,
        loaded: true,
        registrationError: false,
        user: action.result.record
      };
    case REGISTER_FAIL:
      return {
        ...state,
        registering: false,
        registrationError: true,
        registrationErrorText: action.error
      };
    case EMAIL_CHECK:
      return {
        ...state,
        isCheckingEmail: true,
        checkResult: null
      };
    case EMAIL_CHECK_SUCCESS:
      return {
        ...state,
        isCheckingEmail: false,
        checkResult: action.result.success
      };
    case EMAIL_CHECK_FAIL:
      return {
        ...state,
        isCheckingEmail: false,
        checkResult: null
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.auth && globalState.auth.loaded;
}

export function load(user) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.post('/api/1.0/user/session/renew', {
      data: {
        user_id: user.user_id,
        session_renewal_token: user.session_renewal_token,
        session_token: user.session_token
      },
      token: user.session_token
    })
  };
}

export function emailCheck(email) {
  return {
    types: [EMAIL_CHECK, EMAIL_CHECK_SUCCESS, EMAIL_CHECK_FAIL],
    promise: (client) => client.post('/api/1.0/user/email-check', {
      data: {
        email
      }
    })
  };
}

export function login(email, password) {
  return {
    types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
    promise: (client) => client.post('/api/1.0/login', {
      data: {
        email,
        password
      }
    })
  };
}

export function register(data) {
  return {
    types: [REGISTER, REGISTER_SUCCESS, REGISTER_FAIL],
    promise: (client) => client.post('/api/1.0/user/new', {
      data
    })
  };
}

export function logout() {
  return {
    type: LOGOUT_SUCCESS
  };
}

