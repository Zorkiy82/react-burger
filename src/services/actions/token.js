import { SET_MODAL_DATA } from "./app";
import { setToken } from "../../utils/utils";
import { postToken } from "../../utils/burger-api";
import { SET_AUTORIZATION_DATA } from "./profile";

export const POST_TOKEN_REQUEST = "POST_TOKEN_REQUEST";
export const POST_TOKEN_SUCCESS = "POST_TOKEN_SUCCESS";
export const POST_TOKEN_FAILED = "POST_TOKEN_FAILED";

export function postTokenData(refreshToken) {
  return function (dispatch) {
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
      .catch((res) => {
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
              mesage: JSON.stringify(res),
              code: code,
              url: url,
            },
          });
        });
      });
  };
}
