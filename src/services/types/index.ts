import { ThunkAction } from "redux-thunk";
import { Action, ActionCreator } from "redux";
import { store } from "../store";
import { TAppActions } from "../actions/app/app";
import { TPostForgotPasswordActions } from "../actions/forgot-password";
import { TLoginActions } from "../actions/login";
import { TProfileActions } from "../actions/profile";
import { TRegisterActions } from "../actions/register";

type TApplicationActions =
  | TAppActions
  | TPostForgotPasswordActions
  | TLoginActions
  | TProfileActions
  | TRegisterActions;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, Action, RootState, TApplicationActions>
>;
