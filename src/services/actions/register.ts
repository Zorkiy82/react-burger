import {
  SET_MODAL_DATA,
  SET_USER_DATA,
  SET_AUTORIZATION_DATA,
  POST_REGISTER_REQUEST,
  POST_REGISTER_SUCCESS,
  POST_REGISTER_FAILED,
} from "../constants/index";
import { setToken } from "../../utils/utils";
import { postRegister } from "../../utils/burger-api";
import { AppDispatch, AppThunk } from "../types";
import { TRegisterData } from "../types/data";

export interface IPostRegisterAction {
  readonly type: typeof POST_REGISTER_REQUEST;
}

export interface IPostRegisterSuccessAction {
  readonly type: typeof POST_REGISTER_SUCCESS;
  data: TRegisterData;
}

export interface IPostRegisterFailedAction {
  readonly type: typeof POST_REGISTER_FAILED;
  data: any;
}

export type TRegisterActions =
  | IPostRegisterAction
  | IPostRegisterSuccessAction
  | IPostRegisterFailedAction;

export const postRegisterData: AppThunk =
  (history, pathname) => (dispatch: AppDispatch) => {
    dispatch({
      type: POST_REGISTER_REQUEST,
    });

    postRegister(history.location.state)
      .then((res: any) => {
        dispatch({
          type: POST_REGISTER_SUCCESS,
          data: res,
        });

        dispatch({
          type: SET_USER_DATA,
          user: { ...res.user },
        });

        history.replace({
          pathname: pathname,
          state: {},
        });
        setToken(res);
        dispatch({
          type: SET_AUTORIZATION_DATA,
          isAuthorized: true,
        });
      })
      .catch((res) => {
        const code = res.status;
        const url = res.url;

        res.json().then((res: any) => {
          dispatch({
            type: POST_REGISTER_FAILED,
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
