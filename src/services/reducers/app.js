import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  SET_VIEWED_INGREDIENT,
  GET_CONSTRUCTOR_LIST_DEFAULT,
  GET_CONSTRUCTOR_LIST_RANDOM,
  SET_CONSTRUCTOR_LIST_COUNTERS,
  POST_ORDER_REQUEST,
  POST_ORDER_SUCCESS,
  POST_ORDER_FAILED,
  SET_MODAL_DATA,
  RESET_MODAL_DATA,
} from "../actions/app";
import { defaultConstructorItems } from "../../utils/constants";

// Хранилище всех полученных от API ингредиентов
const ingredientsInitialState = {
  items: [],
  itemsRequest: true,
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
        items: [],
      };
    }

    default: {
      return state;
    }
  }
};

// Хранилище всех ингредиентов в текущем конструкторе бургера
const constructorInitialState = {
  ...defaultConstructorItems,
};

export const constructorReducer = (state = constructorInitialState, action) => {
  switch (action.type) {
    case SET_CONSTRUCTOR_LIST_COUNTERS: {
      return {
        ...state,
        countersObject: action.countersObject,
      };
    }

    case GET_CONSTRUCTOR_LIST_DEFAULT: {
      return {
        ...state,
        ...defaultConstructorItems,
      };
    }

    case GET_CONSTRUCTOR_LIST_RANDOM: {
      const bunIngredientArray = action.ingredientsData.filter(
        (item) => item.type === "bun"
      );
      const notBunIngredientArray = action.ingredientsData.filter(
        (item) => item.type !== "bun"
      );
      const numberOfOtherIngredients = Math.round(Math.random() * 7 + 1);
      const otherIngredientsArray = [];

      const bunIngredient =
        bunIngredientArray[
          Math.round(Math.random() * (bunIngredientArray.length - 1))
        ];

      for (let i = 1; i <= numberOfOtherIngredients; ++i) {
        const rnd = Math.round(
          Math.random() * (notBunIngredientArray.length - 1)
        );
        otherIngredientsArray.push(notBunIngredientArray[rnd]);
      }
      return {
        ...state,
        bun: bunIngredient,
        main: otherIngredientsArray,
      };
    }
    default: {
      return state;
    }
  }
};

// Хранилище текущего просматриваемого ингредиента
const viewedIngredientInitialState = {
  ingredientData: {},
};

export const viewedIngredientReducer = (
  state = viewedIngredientInitialState,
  action
) => {
  switch (action.type) {
    case SET_VIEWED_INGREDIENT: {
       return {
        ...state,
        ingredientData: {...action.data},
       };
    }
    default: {
      return state;
    }
  }
};

//Хранилище элемента текущего заказа
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

//Хранилище модального окна
const modalInitialState = {
  modalIsVisible: false,
  modalType: '',
  errorData: {},
};

export const modalReducer = (state = modalInitialState, action) => {
  switch (action.type) {
    case SET_MODAL_DATA: {
      return {
        modalIsVisible: action.modalIsVisible,
        modalType: action.modalType,
        errorData: {...action.errorData},
      };
    }
    case RESET_MODAL_DATA: {
      return {
        ...modalInitialState,
      };
    }
    default: {
      return state;
    }
  }
};
