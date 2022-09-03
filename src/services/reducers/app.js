import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
} from "../actions/app";
import { defaultConstructorItems } from "../../utils/constants";

// Хранилище всех полученных ингредиентов
const ingredientsInitialState = {
  items: [],
  itemsRequest: false,
  itemsFailed: false,
};

export const ingredientsReducer = (state = ingredientsInitialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        itemsRequest: true,
      };
    }

    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        itemsFailed: false,
        items: action.items,
        itemsRequest: false,
      };
    }

    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        itemsFailed: true,
        itemsRequest: false,
        mesage: action.mesage,
        code: action.code,
        url: action.url,
      };
    }

    default: {
      return state;
    }
  }
};

// Хранилище всех ингредиентов в текущем конструкторе бургера
const constructorInitialState = {
  items: defaultConstructorItems,
};

export const constructorReducer = (state = constructorInitialState, action) => {
  switch (action.type) {
    // case ADD_ITEM: {
    //   return state;
    // }
    default: {
      return state;
    }
  }
};

// Хранилище текущего просматриваемого ингредиента
const viewedElementInitialState = {
  viewedElement: {},
};

export const viewedElementReducer = (
  state = viewedElementInitialState,
  action
) => {
  switch (action.type) {
    // case ADD_ITEM: {
    //   return state;
    // }
    default: {
      return state;
    }
  }
};

//Хранилище элемента текущего заказа
const orderElementInitialState = {
  orderElement: {},
};

export const orderElementReducer = (
  state = orderElementInitialState,
  action
) => {
  switch (action.type) {
    // case ADD_ITEM: {
    //   return state;
    // }
    default: {
      return state;
    }
  }
};
