import { SET_MODAL_DATA } from "./app";
import { setCookie } from "../../utils/utils";
import { postRegister } from "../../utils/burger-api";


export const POST_REGISTER_REQUEST = "POST_REGISTER_REQUEST";
export const POST_REGISTER_SUCCESS = "POST_REGISTER_SUCCESS";
export const POST_REGISTER_FAILED = "POST_REGISTER_FAILED";



export function postRegisterData(history, pathname) {
  return function (dispatch) {
    dispatch({
      type: POST_REGISTER_REQUEST,
    });

    postRegister(history.location.state)
      .then((res) => {
        dispatch({
          type: POST_REGISTER_SUCCESS,
          data: res,
        });
        history.replace({
          pathname: pathname,
          state: {},
        });
        setCookie("accessToken", res.accessToken);
        setCookie("refreshToken", res.refreshToken);
      })
      .catch((res) => {


        const code = res.status;
        const url = res.url;

        res.json().then((res) => {
          dispatch({
            type: POST_REGISTER_FAILED,
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
