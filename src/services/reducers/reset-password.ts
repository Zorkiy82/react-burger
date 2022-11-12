import { TResetPasswordActions } from "../actions/reset-password";
import {
  POST_RESET_PASSWORD_REQUEST,
  POST_RESET_PASSWORD_SUCCESS,
  POST_RESET_PASSWORD_FAILED,
} from "../constants/index";

export type TResetPasswordState = {
  resetPasswordData:
    | Object
    | {
        success: boolean;
        message: string;
      };
  resetPasswordRequest: boolean;
  resetPasswordFailed: boolean;
};

const resetPasswordInitialState: TResetPasswordState = {
  resetPasswordData: {
    success: false,
    message: "",
  },
  resetPasswordRequest: false,
  resetPasswordFailed: false,
};

export const resetPasswordReducer = (
  state = resetPasswordInitialState,
  action: TResetPasswordActions
) => {
  switch (action.type) {
    case POST_RESET_PASSWORD_REQUEST: {
      return {
        ...state,
        resetPasswordRequest: true,
      };
    }

    case POST_RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        resetPasswordFailed: false,
        resetPasswordData: action.data,
        resetPasswordRequest: false,
      };
    }

    case POST_RESET_PASSWORD_FAILED: {
      return {
        ...state,
        resetPasswordFailed: true,
        resetPasswordRequest: false,
        resetPasswordData: action.data,
      };
    }
    default: {
      return state;
    }
  }
};
