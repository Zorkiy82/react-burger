import { SET_MODAL_DATA } from "./app";
import { postResetPassword } from "../../utils/burger-api";

export const POST_RESET_PASSWORD_REQUEST = "POST_RESET_PASSWORD_REQUEST";
export const POST_RESET_PASSWORD_SUCCESS = "POST_RESET_PASSWORD_SUCCESS";
export const POST_RESET_PASSWORD_FAILED = "POST_RESET_PASSWORD_FAILED";

export function postResetPasswordData(history, pathname) {
  return function (dispatch) {
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

        // history.push({
        //   pathname: "/reset-password",
        //   state: {},
        // })
      })
      .catch((res) => {
        const code = res.status;
        const url = res.url;
        res.json().then((res) => {
          dispatch({
            type: POST_RESET_PASSWORD_FAILED,
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
