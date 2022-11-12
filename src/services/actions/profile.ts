import {
  SET_MODAL_DATA,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILED,
  PATCH_USER_REQUEST,
  PATCH_USER_SUCCESS,
  PATCH_USER_FAILED,
  SET_USER_DATA,
  SET_AUTORIZATION_DATA,
  RESET_USER_DATA,
} from "../constants/index";
import { getCookie } from "../../utils/utils";
import { getUser, patсhUser } from "../../utils/burger-api";
import { postTokenData } from "./token";
import { AppDispatch, AppThunk } from "../types";
import { TUser } from "../types/data";

export interface IGetUserAction {
  readonly type: typeof GET_USER_REQUEST;
}
export interface IGetUserSuccessAction {
  readonly type: typeof GET_USER_SUCCESS;
  data: {
    success: boolean;
    user: TUser;
  };
}
export interface IGetUserFailedAction {
  readonly type: typeof GET_USER_FAILED;
}

export interface IPatchUserAction {
  readonly type: typeof PATCH_USER_REQUEST;
}
export interface IPatchUserSuccessAction {
  readonly type: typeof PATCH_USER_SUCCESS;
  data: {
    success: boolean;
    user: TUser;
  };
}
export interface IPatchUserFailedAction {
  readonly type: typeof PATCH_USER_FAILED;
}

export interface ISetUserDataAction {
  readonly type: typeof SET_USER_DATA;
  user: TUser;
}
export interface IResetUserDataAction {
  readonly type: typeof RESET_USER_DATA;
}
export interface ISetAutorizationDataAction {
  readonly type: typeof SET_AUTORIZATION_DATA;
  isAuthorized: boolean;
}

export type TProfileActions =
  | IGetUserAction
  | IGetUserSuccessAction
  | IGetUserFailedAction
  | IPatchUserAction
  | IPatchUserSuccessAction
  | IPatchUserFailedAction
  | ISetUserDataAction
  | IResetUserDataAction
  | ISetAutorizationDataAction;

let count = 0;

export const getUserData: AppThunk =
  (history, pathname, accessToken) => (dispatch: AppDispatch) => {
    dispatch({
      type: GET_USER_REQUEST,
    });

    getUser(accessToken)
      .then((res: any) => {
        count = 0;
        dispatch({
          type: GET_USER_SUCCESS,
          data: res,
        });

        history.replace({
          pathname: pathname,
          state: {
            ...res.user,
          },
        });
      })
      .catch((res) => {
        const code = res.status;
        const url = res.url;

        res.json().then((res: any) => {
          if (res.message === "jwt expired") {
            if (!count) {
              count += 1;
              const refreshToken = getCookie("refreshToken");
              Promise.all([postTokenData(refreshToken)]).then((data) => {
                setTimeout(() => {
                  const accessToken = getCookie("accessToken");
                  getUserData(history, pathname, accessToken);
                }, 1000);
              });
            }
          } else {
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
          }

          dispatch({
            type: GET_USER_FAILED,
            data: res,
          });
        });
      });
  };

// -----------------------------------------------------------------------------------------------

export const patchUserData: AppThunk =
  (history, pathname, accessToken, userDataObj) => (dispatch: AppDispatch) => {
    dispatch({
      type: PATCH_USER_REQUEST,
    });

    patсhUser(accessToken, userDataObj)
      .then((res: any) => {
        count = 0;
        dispatch({
          type: PATCH_USER_SUCCESS,
          data: res,
        });

        history.replace({
          pathname: pathname,
          state: {
            ...res.user,
          },
        });
      })
      .catch((res) => {
        const code = res.status;
        const url = res.url;

        res.json().then((res: any) => {
          if (res.message === "jwt expired") {
            if (!count) {
              count += 1;
              const refreshToken = getCookie("refreshToken");
              Promise.all([postTokenData(refreshToken)]).then(
                (data) => {
                  setTimeout(() => {
                    const accessToken = getCookie("accessToken");
                    patchUserData(history, pathname, accessToken, userDataObj);
                  }, 1000);
                }
              );
            }
          } else {
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
          }

          dispatch({
            type: PATCH_USER_FAILED,
            data: res,
          });
        });
      });
  };
