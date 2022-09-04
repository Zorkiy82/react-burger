import { getIngredients, postOrder } from "../../utils/burger-api";

export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED";
export const SET_VIEWED_INGREDIENT = "SET_VIEWED_INGREDIENT";

export const GET_CONSTRUCTOR_LIST_DEFAULT = "GET_CONSTRUCTOR_LIST_DEFAULT";
export const GET_CONSTRUCTOR_LIST_RANDOM = "GET_CONSTRUCTOR_LIST_RANDOM";
export const SET_CONSTRUCTOR_LIST_COUNTERS = "SET_CONSTRUCTOR_LIST_COUNTERS";

export const POST_ORDER_REQUEST = "POST_ORDER_REQUEST";
export const POST_ORDER_SUCCESS = "POST_ORDER_SUCCESS";
export const POST_ORDER_FAILED = "POST_ORDER_FAILED";

export const SET_MODAL_DATA = "SET_MODAL_DATA";
export const RESET_MODAL_DATA = "RESET_MODAL_DATA";

export function getIngredientsData() {
  return function (dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST,
    });

    getIngredients()
      .then((res) => {
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          items: res.data,
        });
      })
      .catch((res) => {
        dispatch({
          type: GET_INGREDIENTS_FAILED,
        });
        dispatch({
          type: SET_MODAL_DATA,
          modalIsVisible: true,
          modalType: "error",
          errorData: {
            mesage: res.statusText,
            code: res.status,
            url: res.url,
          },
        });
      });
  };
}

export function postOrderData(ingridientsIdArray) {
  return function (dispatch) {
    dispatch({
      type: POST_ORDER_REQUEST,
    });

    postOrder(ingridientsIdArray)
      .then((res) => {
        dispatch({
          type: POST_ORDER_SUCCESS,
          data: res,
        });
        dispatch({
          type: SET_MODAL_DATA,
          modalIsVisible: true,
          modalType: "order",
          errorData: {},
        });
      })
      .catch((res) => {
        dispatch({
          type: POST_ORDER_FAILED,
        });

        dispatch({
          type: SET_MODAL_DATA,
          modalIsVisible: true,
          modalType: "error",
          errorData: {
            mesage: res.statusText,
            code: res.status,
            url: res.url,
          },
        });
      });
  };
}
