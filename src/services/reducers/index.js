import { combineReducers } from "redux";
import { ingredientsReducer, constructorReducer, viewedElementReducer, orderElementReducer } from "./app";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: constructorReducer,
  viewedElement: viewedElementReducer,
  orderElement: orderElementReducer,
});
