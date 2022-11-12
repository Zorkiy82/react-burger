import {
  SET_MODAL_DATA,
  POST_FORGOT_PASSWORD_REQUEST,
  POST_FORGOT_PASSWORD_SUCCESS,
  POST_FORGOT_PASSWORD_FAILED,
} from "../constants/index";
import { postForgotPassword } from "../../utils/burger-api";
import { AppDispatch, AppThunk } from "../types";

export interface IPostForgotPasswordAction {
  readonly type: typeof POST_FORGOT_PASSWORD_REQUEST;
}

export interface IPostForgotPasswordSuccessAction {
  readonly type: typeof POST_FORGOT_PASSWORD_SUCCESS;
  data: {
    success: boolean;
    message: string;
  };
}

export interface IPostForgotPasswordFailedAction {
  readonly type: typeof POST_FORGOT_PASSWORD_FAILED;
  data: any;
}

export type TPostForgotPasswordActions =
  | IPostForgotPasswordAction
  | IPostForgotPasswordSuccessAction
  | IPostForgotPasswordFailedAction;

export const postForgotPasswordData: AppThunk =
  (history, pathname) => (dispatch: AppDispatch) => {
    dispatch({
      type: POST_FORGOT_PASSWORD_REQUEST,
    });

    postForgotPassword(history.location.state)
      .then((res) => {
        dispatch({
          type: POST_FORGOT_PASSWORD_SUCCESS,
          data: res,
        });
        history.replace({
          pathname: pathname,
          state: {},
        });

        history.push({
          pathname: "/reset-password",
          state: {},
        });
      })
      .catch((res) => {
        const code = res.status;
        const url = res.url;
        res.json().then((res: any) => {
          dispatch({
            type: POST_FORGOT_PASSWORD_FAILED,
            data: res,
          });

          dispatch({
            type: SET_MODAL_DATA,
            modalIsVisible: true,
            modalType: "error",
            errorData: {
              message: JSON.stringify(res),
              code: code,
              url: url,
            },
          });
        });
      });
  };
