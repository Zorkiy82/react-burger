import { SET_MODAL_DATA } from "./app";
import { setToken } from "../../utils/utils";
import { postLogin } from "../../utils/burger-api";
import { SET_USER_DATA, SET_AUTORIZATION_DATA } from "./profile";

export const POST_LOGIN_REQUEST = "POST_LOGIN_REQUEST";
export const POST_LOGIN_SUCCESS = "POST_LOGIN_SUCCESS";
export const POST_LOGIN_FAILED = "POST_LOGIN_FAILED";

export function postLoginData(history, pathname) {
  return function (dispatch) {
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
      .catch((res) => {
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
              mesage: JSON.stringify(res),
              code: code,
              url: url,
            },
          });
        });
      });
  };
}
