import { combineReducers } from "redux";
import { ingredientsReducer } from "./ingredients";
import { constructorReducer } from "./constructor";
import { viewedIngredientReducer } from "./viewed-ingredient";
import { orderElementReducer } from "./order-element";
import { modalReducer } from "./modal";
import { tabBarReducer } from "./tab-bar";
import { registerReducer } from "./register";
import { forgotPasswordReducer } from "./forgot-password";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: constructorReducer,
  viewedIngredient: viewedIngredientReducer,
  orderElement: orderElementReducer,
  modal: modalReducer,
  tabBar: tabBarReducer,
  register: registerReducer,
  forgotPassword: forgotPasswordReducer,
});
