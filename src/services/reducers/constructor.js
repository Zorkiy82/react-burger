import {
  GET_CONSTRUCTOR_LIST_DEFAULT,
  GET_CONSTRUCTOR_LIST_RANDOM,
  SET_CONSTRUCTOR_LIST_COUNTERS,
  SET_CONSTRUCTOR_LIST_BUN,
  ADD_CONSTRUCTOR_LIST_MAIN_TO_INDEX,
  MOVE_CONSTRUCTOR_LIST_MAIN_INDEX_TO_INDEX,
  DELETE_CONSTRUCTOR_LIST_ITEM_MAIN,
} from "../actions/app";
import { defaultConstructorItems } from "../../utils/constants";
import { getRandomConstructorList } from "./constructor-get-random-list.utils";

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
      const { bunIngredient, otherIngredientsArray } = getRandomConstructorList(
        action.ingredientsData
      );

      return {
        ...state,
        bun: bunIngredient,
        main: otherIngredientsArray,
      };
    }

    case SET_CONSTRUCTOR_LIST_BUN: {
      return {
        ...state,
        bun: action.item,
      };
    }

    case ADD_CONSTRUCTOR_LIST_MAIN_TO_INDEX: {
      const newMain = [...state.main];

      if (action.dropIndex !== "bottom") {
        const newIndex = action.dropIndex === "top" ? 0 : action.dropIndex;
        newMain.splice(newIndex, 0, action.item);
      } else {
        newMain.push(action.item);
      }

      return {
        ...state,
        main: newMain,
      };
    }

    case MOVE_CONSTRUCTOR_LIST_MAIN_INDEX_TO_INDEX: {
      const newMain = [...state.main];
      const saveItem = { ...state.main[action.dragIndex] };
      const newDropIndex = action.dropIndex === "top" ? 0 : action.dropIndex;

      if (newDropIndex === "bottom") {
        newMain.push(saveItem);
        newMain.splice(action.dragIndex, 1);
      } else {
        if (newDropIndex <= action.dragIndex) {
          newMain.splice(action.dragIndex, 1);
          newMain.splice(newDropIndex, 0, saveItem);
        } else {
          newMain.splice(newDropIndex, 0, saveItem);
          newMain.splice(action.dragIndex, 1);
        }
      }

      return {
        ...state,
        main: newMain,
      };
    }

    case DELETE_CONSTRUCTOR_LIST_ITEM_MAIN: {
      const newMain = state.main.map((item) => item);
      newMain.splice(action.index, 1);
      return {
        ...state,
        main: newMain,
      };
    }

    default: {
      return state;
    }
  }
};
