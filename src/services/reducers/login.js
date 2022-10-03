import {
  POST_LOGIN_REQUEST,
  POST_LOGIN_SUCCESS,
  POST_LOGIN_FAILED,
} from "../actions/login";

const loginInitialState = {
  loginData: {},
  loginDataRequest: false,
  loginDataFailed: false,
};

export const loginReducer = (state = loginInitialState, action) => {
  switch (action.type) {
    case POST_LOGIN_REQUEST: {
      return {
        ...state,
        loginDataRequest: true,
      };
    }

    case POST_LOGIN_SUCCESS: {
      return {
        ...state,
        loginDataFailed: false,
        loginData: action.data,
        loginDataRequest: false,
      };
    }

    case POST_LOGIN_FAILED: {
      return {
        ...state,
        loginDataFailed: true,
        loginDataRequest: false,
        loginData: action.data,
      };
    }
    default: {
      return state;
    }
  }
};
