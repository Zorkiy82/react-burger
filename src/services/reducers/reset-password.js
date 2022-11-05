import {
  POST_RESET_PASSWORD_REQUEST,
  POST_RESET_PASSWORD_SUCCESS,
  POST_RESET_PASSWORD_FAILED,
} from "../constants/index";

const resetPasswordInitialState = {
  resetPasswordData: {},
  resetPasswordRequest: false,
  resetPasswordFailed: false,
};

export const resetPasswordReducer = (
  state = resetPasswordInitialState,
  action
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
