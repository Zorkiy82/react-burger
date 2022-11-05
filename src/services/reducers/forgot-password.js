import {
  POST_FORGOT_PASSWORD_REQUEST,
  POST_FORGOT_PASSWORD_SUCCESS,
  POST_FORGOT_PASSWORD_FAILED,
} from "../constants/index";

const forgotPasswordInitialState = {
  forgotPasswordData: {},
  forgotPasswordRequest: false,
  forgotPasswordFailed: false,
};

export const forgotPasswordReducer = (
  state = forgotPasswordInitialState,
  action
) => {
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
