import {
  SET_MODAL_DATA,
  POST_FORGOT_PASSWORD_REQUEST,
  POST_FORGOT_PASSWORD_SUCCESS,
  POST_FORGOT_PASSWORD_FAILED,
} from "../constants/index";
import { postForgotPassword } from "../../utils/burger-api";

export function postForgotPasswordData(history, pathname) {
  return function (dispatch) {
    dispatch({
      type: POST_FORGOT_PASSWORD_REQUEST,
    });

    postForgotPassword(history.location.state)
      .then((res) => {
        dispatch({
          type: POST_FORGOT_PASSWORD_SUCCESS,
          data: res,
        });
        history.replace({
          pathname: pathname,
          state: {},
        });

        history.push({
          pathname: "/reset-password",
          state: {},
        });
      })
      .catch((res) => {
        const code = res.status;
        const url = res.url;
        res.json().then((res) => {
          dispatch({
            type: POST_FORGOT_PASSWORD_FAILED,
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
