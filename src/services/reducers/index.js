import { combineReducers } from "redux";
import {
  ingredientsReducer,
  constructorReducer,
  viewedIngredientReducer,
  orderElementReducer,
  modalReducer,
} from "./app";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: constructorReducer,
  viewedIngredient: viewedIngredientReducer,
  orderElement: orderElementReducer,
  modal: modalReducer,
});
