import {
  POST_REGISTER_REQUEST,
  POST_REGISTER_SUCCESS,
  POST_REGISTER_FAILED,
} from "../constants/index";

const registerInitialState = {
  registerData: {},
  registerDataRequest: false,
  registerDataFailed: false,
};

export const registerReducer = (state = registerInitialState, action) => {
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
