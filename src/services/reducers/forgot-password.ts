import { TPostForgotPasswordActions } from "../actions/forgot-password";
import {
  POST_FORGOT_PASSWORD_REQUEST,
  POST_FORGOT_PASSWORD_SUCCESS,
  POST_FORGOT_PASSWORD_FAILED,
} from "../constants/index";

export type TForgotPassworState = {
  forgotPasswordData: {
    success: boolean;
    message: string;
  };
  forgotPasswordRequest: boolean;
  forgotPasswordFailed: boolean;
};

const forgotPasswordInitialState: TForgotPassworState = {
  forgotPasswordData: {
    success: false,
    message: "",
  },
  forgotPasswordRequest: false,
  forgotPasswordFailed: false,
};

export const forgotPasswordReducer = (
  state = forgotPasswordInitialState,
  action: TPostForgotPasswordActions
): TForgotPassworState => {
  switch (action.type) {
    case POST_FORGOT_PASSWORD_REQUEST: {
      return {
        ...state,
        forgotPasswordRequest: true,
      };
    }

    case POST_FORGOT_PASSWORD_SUCCESS: {
      return {
        ...state,
        forgotPasswordFailed: false,
        forgotPasswordData: action.data,
        forgotPasswordRequest: false,
      };
    }

    case POST_FORGOT_PASSWORD_FAILED: {
      return {
        ...state,
        forgotPasswordFailed: true,
        forgotPasswordRequest: false,
        forgotPasswordData: action.data,
      };
    }
    default: {
      return state;
    }
  }
};
