import { combineReducers } from "redux";
import {
  ingredientsReducer,
  constructorReducer,
  viewedIngredientReducer,
  orderElementReducer,
  modalReducer,
  tabBarReducer,
} from "./app";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: constructorReducer,
  viewedIngredient: viewedIngredientReducer,
  orderElement: orderElementReducer,
  modal: modalReducer,
  tabBar: tabBarReducer,
});
