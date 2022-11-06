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
              Promise.all([dispatch(postTokenData(refreshToken))]).then(
                (data) => {
                  setTimeout(() => {
                    const accessToken = getCookie("accessToken");
                    dispatch(getUserData(history, pathname, accessToken));
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
                mesage: JSON.stringify(res),
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
              Promise.all([dispatch(postTokenData(refreshToken))]).then(
                (data) => {
                  setTimeout(() => {
                    const accessToken = getCookie("accessToken");
                    dispatch(
                      patchUserData(history, pathname, accessToken, userDataObj)
                    );
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
                mesage: JSON.stringify(res),
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
