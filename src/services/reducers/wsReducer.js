import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
} from "../actions/wsActions";

import { getReceipt } from "./order.utils";

const initialState = {
  wsConnected: false,
  message: [],
};

export const wsReducer = (state = initialState, action) => {
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
      let newOrders = [...action.payload.data.orders];
      const catalog = action.payload.catalog;

      newOrders = newOrders.map((value, index) => {
        const ingredients = value.ingredients;
        const receipt = getReceipt(ingredients, catalog);
        return { ...value, receipt: receipt };
      });

      return {
        ...state,
        message: { ...action.payload.data, orders: newOrders },
      };

    default:
      return state;
  }
};
