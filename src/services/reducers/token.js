import {
  POST_TOKEN_REQUEST,
  POST_TOKEN_SUCCESS,
  POST_TOKEN_FAILED,
} from "../constants/index";

const tokenInitialState = {
  tokenData: {},
  tokenDataRequest: false,
  tokenDataFailed: false,
};

export const tokenReducer = (state = tokenInitialState, action) => {
  switch (action.type) {
    case POST_TOKEN_REQUEST: {
      return {
        ...state,
        tokenDataRequest: true,
      };
    }

    case POST_TOKEN_SUCCESS: {
      return {
        ...state,
        tokenDataFailed: false,
        tokenData: action.data,
        tokenDataRequest: false,
      };
    }

    case POST_TOKEN_FAILED: {
      return {
        ...state,
        tokenDataFailed: true,
        tokenDataRequest: false,
        tokenData: action.data,
      };
    }
    default: {
      return state;
    }
  }
};
