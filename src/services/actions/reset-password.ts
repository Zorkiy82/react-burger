import {
  SET_MODAL_DATA,
  POST_RESET_PASSWORD_REQUEST,
  POST_RESET_PASSWORD_SUCCESS,
  POST_RESET_PASSWORD_FAILED,
} from "../constants/index";
import { postResetPassword } from "../../utils/burger-api";
import { AppDispatch, AppThunk } from "../types";

export interface IPostResetPasswordAction {
  readonly type: typeof POST_RESET_PASSWORD_REQUEST;
}

export interface IPostResetPasswordSuccessAction {
  readonly type: typeof POST_RESET_PASSWORD_SUCCESS;
  data: {
    success: boolean;
    message: string;
  };
}

export interface IPostResetPasswordFailedAction {
  readonly type: typeof POST_RESET_PASSWORD_FAILED;
  data: any;
}

export type TResetPasswordActions =
  | IPostResetPasswordAction
  | IPostResetPasswordSuccessAction
  | IPostResetPasswordFailedAction;

export const postResetPasswordData: AppThunk =
  (history, pathname) => (dispatch: AppDispatch) => {
    dispatch({
      type: POST_RESET_PASSWORD_REQUEST,
    });

    postResetPassword(history.location.state)
      .then((res) => {
        dispatch({
          type: POST_RESET_PASSWORD_SUCCESS,
          data: res,
        });
        history.replace({
          pathname: pathname,
          state: {},
        });
      })
      .catch((res: any) => {
        const code = res.status;
        const url = res.url;
        res.json().then((res: any) => {
          dispatch({
            type: POST_RESET_PASSWORD_FAILED,
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
