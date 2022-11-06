import { TAppActions } from "../actions/app/app";
import {
  POST_ORDER_REQUEST,
  POST_ORDER_SUCCESS,
  POST_ORDER_FAILED,
} from "../constants/index";
import { TOrder } from "../types/data";

export type TOrderElementState = {
  orderDataRequest: boolean;
  orderDataFailed: boolean;
  orderData: {
    success: boolean;
    name: string;
    order: TOrder;
  };
};

export const orderElementInitialState: TOrderElementState = {
  orderData: {
    success: false,
    name: "",
    order: {
      ingredients: [],
      _id: "",
      owner: {
        name: "",
        email: "",
        createdAt: "",
        updatedAt: "",
      },
      status: "",
      name: "",
      createdAt: "",
      updatedAt: "",
      number: 0,
      price: 0,
    },
  },
  orderDataRequest: false,
  orderDataFailed: false,
};

export const orderElementReducer = (
  state = orderElementInitialState,
  action: TAppActions
): TOrderElementState => {
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
        orderData: { ...orderElementInitialState.orderData },
      };
    }
    default: {
      return state;
    }
  }
};
