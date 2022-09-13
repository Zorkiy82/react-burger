import {
  POST_ORDER_REQUEST,
  POST_ORDER_SUCCESS,
  POST_ORDER_FAILED,
} from "../actions/app";

const orderElementInitialState = {
  orderData: {},
  orderDataRequest: false,
  orderDataFailed: false,
};

export const orderElementReducer = (
  state = orderElementInitialState,
  action
) => {
  switch (action.type) {
    case POST_ORDER_REQUEST: {
      return {
        ...state,
        orderDataRequest: true,
      };
    }

    case POST_ORDER_SUCCESS: {
      return {
        ...state,
        orderDataFailed: false,
        orderData: action.data,
        orderDataRequest: false,
      };
    }

    case POST_ORDER_FAILED: {
      return {
        ...state,
        orderDataFailed: true,
        orderDataRequest: false,
        orderData: [],
      };
    }
    default: {
      return state;
    }
  }
};
