import { TAppActions } from "../actions/app/app";
import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
} from "../constants/index";
import { TIngredient, TIngredientCatalog } from "../types/data";

export type TIngedientsState = {
  items: ReadonlyArray<TIngredient>;
  itemsRequest: boolean;
  itemsFailed: boolean;
  itemsCatalog: TIngredientCatalog;
};

const ingredientsInitialState: TIngedientsState = {
  items: [],
  itemsRequest: true,
  itemsFailed: false,
  itemsCatalog: {},
};

export const ingredientsReducer = (
  state = ingredientsInitialState,
  action: TAppActions
): TIngedientsState => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        itemsRequest: true,
      };
    }

    case GET_INGREDIENTS_SUCCESS: {
      const itemsCatalog: TIngredientCatalog = {};
      action.items.forEach((item) => {
        itemsCatalog[item._id] = { ...item };
      });

      return {
        ...state,
        itemsFailed: false,
        items: action.items,
        itemsCatalog: itemsCatalog,
        itemsRequest: false,
      };
    }

    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        itemsFailed: true,
        itemsRequest: false,
        items: [],
      };
    }

    default: {
      return state;
    }
  }
};
