import { ThunkAction } from "redux-thunk";
import { Action, ActionCreator } from "redux";
import { store } from "../store";
import { TAppActions } from "../actions/app/app";
import { TForgotPasswordActions } from "../actions/forgot-password";
import { TLoginActions } from "../actions/login";
import { TProfileActions } from "../actions/profile";
import { TRegisterActions } from "../actions/register";
import { TResetPasswordActions } from "../actions/reset-password";
import { TTokenActions } from "../actions/token";
import { TWSActions } from "../actions/wsActions";

type TApplicationActions =
  | TAppActions
  | TForgotPasswordActions
  | TLoginActions
  | TProfileActions
  | TRegisterActions
  | TResetPasswordActions
  | TTokenActions
  | TWSActions;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, Action, RootState, TApplicationActions>
>;
