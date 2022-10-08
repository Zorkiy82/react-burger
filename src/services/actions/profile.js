import { SET_MODAL_DATA } from "./app";
import { getCookie } from "../../utils/utils";
import { getUser, patсhUser } from "../../utils/burger-api";
import { postTokenData } from "./token";

export const GET_USER_REQUEST = "GET_USER_REQUEST";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_FAILED = "GET_USER_FAILED";

export const PATCH_USER_REQUEST = "PATCH_USER_REQUEST";
export const PATCH_USER_SUCCESS = "PATCH_USER_SUCCESS";
export const PATCH_USER_FAILED = "PATCH_USER_FAILED";

export const SET_USER_DATA = "SET_USER_DATA";
export const RESET_USER_DATA = "RESET_USER_DATA";

let count = 0;

export function getUserData(history, pathname, accessToken) {
  return function (dispatch) {
    dispatch({
      type: GET_USER_REQUEST,
    });

    getUser(accessToken)
      .then((res) => {
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

        res.json().then((res) => {
          if (res.message === "jwt expired") {
            if (!count) {
              count += 1;
              const refreshToken = getCookie("refreshToken");
              Promise.all([dispatch(postTokenData(refreshToken))]).then(
                (data) => {
                  setTimeout(() => {
                    // console.log("Куку");
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
}

// -----------------------------------------------------------------------------------------------

export function patchUserData(history, pathname, accessToken, userDataObj) {
  return function (dispatch) {
    dispatch({
      type: PATCH_USER_REQUEST,
    });

    patсhUser(accessToken, userDataObj)
      .then((res) => {
        count=0;
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

        res.json().then((res) => {
          if (res.message === "jwt expired") {
            if (!count) {
              count += 1;
              const refreshToken = getCookie("refreshToken");
              Promise.all([dispatch(postTokenData(refreshToken))]).then(
                (data) => {
                  setTimeout(() => {
                    // console.log("Куку");
                    const accessToken = getCookie("accessToken");
                    dispatch(patchUserData(history, pathname, accessToken, userDataObj));
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
}
