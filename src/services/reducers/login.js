import {
  POST_LOGIN_REQUEST,
  POST_LOGIN_SUCCESS,
  POST_LOGIN_FAILED,
} from "../constants/index";

const loginInitialState = {
  loginData: {},
  loginDataSuccess: false,
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
        loginDataSuccess: true,
        loginDataFailed: false,
        loginData: action.data,
        loginDataRequest: false,
      };
    }

    case POST_LOGIN_FAILED: {
      return {
        ...state,
        loginDataSuccess: false,
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
