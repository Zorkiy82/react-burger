import { TWSActions } from "../actions/wsActions";
import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
} from "../constants/index";
import { TOrderBase, TRecript } from "../types/data";

import {
  getReceipt,
  getOrderStatus,
  getReadableDate,
  getFormattedNumber,
} from "./order.utils";

type TWSOrdersArray = Array<
  TOrderBase & {
    ingredients: Array<string>;

    receipt: {
      items: Array<TRecript>;
      totalPrice: string;
    };

    orderStatus: {
      content: string;
      style: {
        color: string;
      };
    };

    readableDate: string;
  }
>;

type TWSState = {
  message: {
    orders: TWSOrdersArray;
    total: number;
    totalToday: number;
    fTotal: string;
    fTotalToday: string;
  };

  wsConnected: boolean;
};

const wsInitialState: TWSState = {
  wsConnected: false,
  message: {
    orders: [],
    total: 0,
    totalToday: 0,
    fTotal: "",
    fTotalToday: "",
  },
};

export const wsReducer = (
  state = wsInitialState,
  action: TWSActions
): TWSState => {
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

      const resOrders: TWSOrdersArray = newOrders.map((value) => {
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
          orders: resOrders,
          fTotal: getFormattedNumber(action.payload.data.total),
          fTotalToday: getFormattedNumber(action.payload.data.totalToday),
        },
      };

    default:
      return state;
  }
};
