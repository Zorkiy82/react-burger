import { TRegisterActions } from "../actions/register";
import {
  POST_REGISTER_REQUEST,
  POST_REGISTER_SUCCESS,
  POST_REGISTER_FAILED,
} from "../constants/index";
import { TRegisterData } from "../types/data";

export type TRegisterState = {
  registerData: TRegisterData;
  registerDataRequest: boolean;
  registerDataFailed: boolean;
};

const registerInitialState: TRegisterState = {
  registerData: {
    success: false,
    user: {
      name: "",
      email: "",
    },
    accessToken: "",
    refreshToken: "",
  },
  registerDataRequest: false,
  registerDataFailed: false,
};

export const registerReducer = (
  state = registerInitialState,
  action: TRegisterActions
): TRegisterState => {
  switch (action.type) {
    case POST_REGISTER_REQUEST: {
      return {
        ...state,
        registerDataRequest: true,
      };
    }

    case POST_REGISTER_SUCCESS: {
      return {
        ...state,
        registerDataFailed: false,
        registerData: action.data,
        registerDataRequest: false,
      };
    }

    case POST_REGISTER_FAILED: {
      return {
        ...state,
        registerDataFailed: true,
        registerDataRequest: false,
        registerData: action.data,
      };
    }
    default: {
      return state;
    }
  }
};
