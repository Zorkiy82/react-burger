import { SET_MODAL_DATA } from "./app";
import { getCookie, setCookie } from "../../utils/utils";
import { getUser } from "../../utils/burger-api";
import { postTokenData } from "./token";

export const GET_USER_REQUEST = "GET_USER_REQUEST";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_FAILED = "GET_USER_FAILED";

export function getUserData(history, pathname, accessToken) {
  return function (dispatch) {
    dispatch({
      type: GET_USER_REQUEST,
    });

    getUser(accessToken)
      .then((res) => {
        dispatch({
          type: GET_USER_SUCCESS,
          data: res,
        });

        history.replace({
          pathname: pathname,
          state: {
            ...res.user,
            user: { ...res.user },
          },
        });
      })
      .catch((res) => {
        const code = res.status;
        const url = res.url;

        res.json().then((res) => {
          dispatch({
            type: GET_USER_FAILED,
            data: res,
          });

          if (res.message === "jwt expired") {
            const refreshToken = getCookie("refreshToken");
            dispatch(postTokenData(refreshToken));

            // .then(() => {
            //   const accessToken = getCookie("accessToken");
            //   getUserData(history, pathname, accessToken)
            // });
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
        });
      });
  };
}
