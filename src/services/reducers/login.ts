import { TLoginActions } from "../actions/login";
import {
  POST_LOGIN_REQUEST,
  POST_LOGIN_SUCCESS,
  POST_LOGIN_FAILED,
} from "../constants/index";
import { TPostLoginData } from "../types/data";

export type TPostLoginState = {
  loginData: TPostLoginData;
  loginDataSuccess: boolean;
  loginDataRequest: boolean;
  loginDataFailed: boolean;
};

const loginInitialState: TPostLoginState = {
  loginData: {
    accessToken: "",
    refreshToken: "",
    user: {
      name: "",
      email: "",
    },
  },
  loginDataSuccess: false,
  loginDataRequest: false,
  loginDataFailed: false,
};

export const loginReducer = (
  state = loginInitialState,
  action: TLoginActions
): TPostLoginState => {
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
