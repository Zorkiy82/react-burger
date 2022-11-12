import { TWSActions } from "../actions/wsActions";
import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
} from "../constants/index";

import {
  getReceipt,
  getOrderStatus,
  getReadableDate,
  getFormattedNumber,
} from "./order.utils";

const initialState = {
  wsConnected: false,
  message: [],
};

export const wsReducer = (state = initialState, action:TWSActions) => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true,
      };

    case WS_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false,
      };

    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false,
      };

    case WS_GET_MESSAGE:
      let newOrders = [...action.payload.data.orders]
        .sort((a, b) => {
          if (b.updatedAt > a.updatedAt) {
            return 1;
          } else if (b.updatedAt < a.updatedAt) {
            return -1;
          } else {
            return 0;
          }
        })
        .filter((value, index) => index <= 49);

      const catalog = action.payload.catalog;

      newOrders = newOrders.map((value, index) => {
        const ingredients = value.ingredients;
        const status = value.status;
        const createdAt = value.createdAt;
        const receipt = getReceipt(ingredients, catalog);
        const orderStatus = getOrderStatus(status);
        const readableDate = getReadableDate(createdAt);

        return {
          ...value,
          receipt: receipt,
          orderStatus: orderStatus,
          readableDate: readableDate,
        };
      });

      return {
        ...state,
        message: {
          ...action.payload.data,
          orders: newOrders,
          fTotal: getFormattedNumber(action.payload.data.total),
          fTotalToday: getFormattedNumber(action.payload.data.totalToday),
        },
      };

    default:
      return state;
  }
};
