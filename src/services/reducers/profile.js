import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILED,
  PATCH_USER_REQUEST,
  PATCH_USER_SUCCESS,
  PATCH_USER_FAILED,
  SET_USER_DATA,
  RESET_USER_DATA,
  SET_AUTORIZATION_DATA
} from "../actions/profile";

const profileInitialState = {
  userData: {},
  isAuthorized: false,
  getUserDataSuccess: false,
  getUserDataRequest: false,
  getUserDataFailed: false,
  patchUserDataSuccess: false,
  patchUserDataRequest: false,
  patchUserDataFailed: false,
};

export const profileReducer = (state = profileInitialState, action) => {
  switch (action.type) {
    case GET_USER_REQUEST: {
      return {
        ...state,
        getUserDataRequest: true,
      };
    }

    case PATCH_USER_REQUEST: {
      return {
        ...state,
        patchUserDataRequest: true,
      };
    }

    case GET_USER_SUCCESS: {
      return {
        ...state,
        getUserDataFailed: false,
        getUserDataSuccess: true,
        userData: { ...action.data.user },
        getUserDataRequest: false,
      };
    }

    case PATCH_USER_SUCCESS: {
      return {
        ...state,
        patchUserDataFailed: false,
        patchUserDataSuccess: true,
        userData: { ...action.data.user },
        patchUserDataRequest: false,
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
        getUserDataFailed: true,
        getUserDataSuccess: false,
        getUserDataRequest: false,
      };
    }

    case PATCH_USER_FAILED: {
      return {
        ...state,
        patchUserDataFailed: true,
        patchUserDataSuccess: false,
        patchUserDataRequest: false,
      };
    }

    case RESET_USER_DATA: {
      return {
        ...profileInitialState,
      };
    }

    case SET_AUTORIZATION_DATA: {
      return {
        ...state,
        isAuthorized: action.isAuthorized,
      };
    }

    default: {
      return state;
    }
  }
};
