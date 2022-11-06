import {
  GET_CONSTRUCTOR_LIST_RANDOM,
  SET_CONSTRUCTOR_LIST_BUN,
  RESET_CONSTRUCTOR_LIST,
  ADD_CONSTRUCTOR_LIST_MAIN_TO_INDEX,
  MOVE_CONSTRUCTOR_LIST_MAIN_INDEX_TO_INDEX,
  DELETE_CONSTRUCTOR_LIST_ITEM_MAIN,
} from "../constants/index";
import { defaultConstructorItems } from "../../utils/constants";
import { getRandomConstructorList } from "./constructor-get-random-list.utils";
import { TAppActions } from "../actions/app/app";
import { TIngredientForConstructor } from "../types/data";

export type TBurgerConstructorState = {
  bun: TIngredientForConstructor;
  main: Array<TIngredientForConstructor>;
};

const constructorInitialState: TBurgerConstructorState = {
  ...defaultConstructorItems,
};

export const constructorReducer = (
  state = constructorInitialState,
  action: TAppActions
): TBurgerConstructorState => {
  switch (action.type) {
    case GET_CONSTRUCTOR_LIST_RANDOM: {
      const { bun, main } = getRandomConstructorList(action.ingredientsData);

      return {
        ...state,
        bun: bun,
        main: main,
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

    case RESET_CONSTRUCTOR_LIST: {
      return { ...constructorInitialState };
    }

    default: {
      return state;
    }
  }
};
