import {
  SET_MODAL_DATA,
  SET_AUTORIZATION_DATA,
  POST_TOKEN_REQUEST,
  POST_TOKEN_SUCCESS,
  POST_TOKEN_FAILED,
} from "../constants/index";
import { setToken } from "../../utils/utils";
import { postToken } from "../../utils/burger-api";
import { AppDispatch, AppThunk } from "../types";
import { TTokenData } from "../types/data";
import { ThunkDispatch, ThunkMiddleware } from "redux-thunk";

export interface IPostTokenAction {
  readonly type: typeof POST_TOKEN_REQUEST;
}

export interface IPostTokenSuccessAction {
  readonly type: typeof POST_TOKEN_SUCCESS;
  data: TTokenData & { success: boolean };
}

export interface IPostTokenFailedAction {
  readonly type: typeof POST_TOKEN_FAILED;
  data: TTokenData & { success: boolean };
}

export type TTokenActions =
  | IPostTokenAction
  | IPostTokenSuccessAction
  | IPostTokenFailedAction;

export const postTokenData: AppThunk =
  (refreshToken: string) => (dispatch: AppDispatch) => {
    dispatch({
      type: POST_TOKEN_REQUEST,
    });

    postToken(refreshToken)
      .then((res) => {
        setToken(res);
        dispatch({
          type: POST_TOKEN_SUCCESS,
          data: res,
        });

        dispatch({
          type: SET_AUTORIZATION_DATA,
          isAuthorized: true,
        });
      })
      .catch((res: Response) => {
        const code = res.status;
        const url = res.url;

        res.json().then((res) => {
          dispatch({
            type: POST_TOKEN_FAILED,
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
