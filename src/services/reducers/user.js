import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILED,
  SET_USER_DATA,
} from "../actions/user";

const userInitialState = {
  userData: {},
  userDataSuccess: false,
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
        userDataSuccess: true,
        userData: { ...action.data.user },
        userDataRequest: false,
      };
    }

    case SET_USER_DATA: {
      return {
        ...state,
        userData: { ...action.user },
      };
    }

    case GET_USER_FAILED: {
      return {
        ...state,
        userDataFailed: true,
        userDataSuccess: false,
        userDataRequest: false,
        // userData: action.data,
      };
    }
    default: {
      return state;
    }
  }
};
