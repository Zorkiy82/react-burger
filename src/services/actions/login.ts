import {
  SET_MODAL_DATA,
  POST_LOGIN_REQUEST,
  POST_LOGIN_SUCCESS,
  POST_LOGIN_FAILED,
  SET_USER_DATA,
  SET_AUTORIZATION_DATA,
} from "../constants/index";
import { setToken } from "../../utils/utils";
import { postLogin } from "../../utils/burger-api";
import { AppDispatch, AppThunk } from "../types";
import { TPostLoginData } from "../types/data";

export interface IPostLoginAction {
  readonly type: typeof POST_LOGIN_REQUEST;
}

export interface IPostLoginSuccessAction {
  readonly type: typeof POST_LOGIN_SUCCESS;
  data: TPostLoginData;
}

export interface IPostLoginFailedAction {
  readonly type: typeof POST_LOGIN_FAILED;
  data: TPostLoginData;
}

export type TLoginActions =
  | IPostLoginAction
  | IPostLoginSuccessAction
  | IPostLoginFailedAction;

export const postLoginData: AppThunk =
  (history, pathname) => (dispatch: AppDispatch) => {
    dispatch({
      type: POST_LOGIN_REQUEST,
    });

    postLogin(history.location.state)
      .then((res) => {
        dispatch({
          type: POST_LOGIN_SUCCESS,
          data: res,
        });

        dispatch({
          type: SET_USER_DATA,
          user: { ...res.user },
        });

        setToken(res);

        dispatch({
          type: SET_AUTORIZATION_DATA,
          isAuthorized: true,
        });

        history.replace({
          pathname: pathname,
          state: {},
        });
      })
      .catch((res: Response) => {
        const code = res.status;
        const url = res.url;

        res.json().then((res) => {
          dispatch({
            type: POST_LOGIN_FAILED,
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
