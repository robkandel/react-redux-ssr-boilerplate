import defaults from './defaults';
const USER_INFO = 'react-boilerplate/user/USER_INFO';
const USER_INFO_SUCCESS = 'react-boilerplate/user/USER_INFO_SUCCESS';
const USER_INFO_FAIL = 'react-boilerplate/user/USER_INFO_FAIL';

const initialState = defaults.user;

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case USER_INFO:
      return {
        ...state,
        loadingUserInfo: true,
        userInfo: {},
        errorUserInfo: {}
      };
    case USER_INFO_SUCCESS:
      return {
        ...state,
        loadingUserInfo: false,
        userInfo: action.result.success ? action.result.record : {}
      };
    case USER_INFO_FAIL:
      return {
        ...state,
        loadingUserInfo: false,
        userInfo: {},
        errorUserInfo: action.error
      };
    default:
      return state;
  }
}

export function showUserInfo(user) {
  return {
    types: [USER_INFO, USER_INFO_SUCCESS, USER_INFO_FAIL],
    promise: (client) => client.post('/api/1.0/user/show', {
      data: {
        user_id: user.id,
        id: user.id
      },
      token: user.session_token
    })
  };
}

