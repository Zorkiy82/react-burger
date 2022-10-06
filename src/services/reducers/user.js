import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILED,
} from "../actions/user";

const userInitialState = {
  userData: {},
  userDataRequest: false,
  userDataFailed: false,
};

export const userReducer = (state = userInitialState, action) => {
  switch (action.type) {
    case GET_USER_REQUEST: {
      return {
        ...state,
        userDataRequest: true,
      };
    }

    case GET_USER_SUCCESS: {
      return {
        ...state,
        userDataFailed: false,
        userData: action.data,
        userDataRequest: false,
      };
    }

    case GET_USER_FAILED: {
      return {
        ...state,
        userDataFailed: true,
        userDataRequest: false,
        userData: action.data,
      };
    }
    default: {
      return state;
    }
  }
};
