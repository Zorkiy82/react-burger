import { getIngredients, postOrder } from "../../utils/burger-api";

export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED";
export const SET_VIEWED_INGREDIENT = "SET_VIEWED_INGREDIENT";

export const GET_CONSTRUCTOR_LIST_DEFAULT = "GET_CONSTRUCTOR_LIST_DEFAULT";
export const GET_CONSTRUCTOR_LIST_RANDOM = "GET_CONSTRUCTOR_LIST_RANDOM";
export const SET_CONSTRUCTOR_LIST_COUNTERS = "SET_CONSTRUCTOR_LIST_COUNTERS";
export const SET_CONSTRUCTOR_LIST_BUN = "SET_CONSTRUCTOR_LIST_BUN";
export const RESET_CONSTRUCTOR_LIST = "RESET_CONSTRUCTOR_LIST";
export const ADD_CONSTRUCTOR_LIST_MAIN_TO_INDEX =
  "ADD_CONSTRUCTOR_LIST_MAIN_TO_INDEX";
export const MOVE_CONSTRUCTOR_LIST_MAIN_INDEX_TO_INDEX =
  "MOVE_CONSTRUCTOR_LIST_MAIN_INDEX_TO_INDEX";

export const DELETE_CONSTRUCTOR_LIST_ITEM_MAIN =
  "DELETE_CONSTRUCTOR_LIST_ITEM_MAIN";

export const POST_ORDER_REQUEST = "POST_ORDER_REQUEST";
export const POST_ORDER_SUCCESS = "POST_ORDER_SUCCESS";
export const POST_ORDER_FAILED = "POST_ORDER_FAILED";

export const SET_MODAL_DATA = "SET_MODAL_DATA";
export const RESET_MODAL_DATA = "RESET_MODAL_DATA";

export const SET_TAB_BAR_CURRENT = "SET_TAB_BAR_CURRENT";
export const UPDATE_TAB_BAR_CURRENT = "UPDATE_TAB_BAR_CURRENT";

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
        const code = res.status;
        const url = res.url;
        res.json().then((res) => {
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
        dispatch({
          type: RESET_CONSTRUCTOR_LIST,
        });
      })
      .catch((res) => {
        const code = res.status;
        const url = res.url;
        res.json().then((res) => {
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

export function handleDropAction({
  action,
  data,
  dragIndex,
  dropIndex,
  ingredientType,
}) {
  return function (dispatch) {
    if (action === "add") {
      if (ingredientType === "bun") {
        dispatch({ type: SET_CONSTRUCTOR_LIST_BUN, item: data });
      } else {
        dispatch({
          type: ADD_CONSTRUCTOR_LIST_MAIN_TO_INDEX,
          item: data,
          dropIndex: dropIndex,
        });
      }
    }

    if (action === "move") {
      if (ingredientType !== "bun") {
        dispatch({
          type: MOVE_CONSTRUCTOR_LIST_MAIN_INDEX_TO_INDEX,
          dragIndex: dragIndex,
          dropIndex: dropIndex,
        });
      }
    }
  };
}
