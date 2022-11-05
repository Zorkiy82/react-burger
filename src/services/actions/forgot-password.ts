import {
  SET_MODAL_DATA,
  POST_FORGOT_PASSWORD_REQUEST,
  POST_FORGOT_PASSWORD_SUCCESS,
  POST_FORGOT_PASSWORD_FAILED,
} from "../constants/index";
import { postForgotPassword } from "../../utils/burger-api";
import { AppDispatch, AppThunk } from "../types";

export const postForgotPasswordData: AppThunk = (history, pathname) => (dispatch: AppDispatch) => {
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
      res.json().then((res: any) => {
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

