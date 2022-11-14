import { TTokenActions } from "../actions/token";
import {
  POST_TOKEN_REQUEST,
  POST_TOKEN_SUCCESS,
  POST_TOKEN_FAILED,
} from "../constants/index";
import { TTokenData } from "../types/data";

type TTokenState = {
  tokenData: TTokenData & {
    success: boolean;
  };
  tokenDataRequest: boolean;
  tokenDataFailed: boolean;
};

const tokenInitialState: TTokenState = {
  tokenData: {
    success: false,
    accessToken: "",
    refreshToken: "",
  },
  tokenDataRequest: false,
  tokenDataFailed: false,
};

export const tokenReducer = (
  state = tokenInitialState,
  action: TTokenActions
): TTokenState => {
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
