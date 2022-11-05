import { getIngredients, postOrder } from "../../utils/burger-api";
import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  GET_CONSTRUCTOR_LIST_RANDOM,
  SET_CONSTRUCTOR_LIST_BUN,
  RESET_CONSTRUCTOR_LIST,
  ADD_CONSTRUCTOR_LIST_MAIN_TO_INDEX,
  MOVE_CONSTRUCTOR_LIST_MAIN_INDEX_TO_INDEX,
  DELETE_CONSTRUCTOR_LIST_ITEM_MAIN,
  POST_ORDER_REQUEST,
  POST_ORDER_SUCCESS,
  POST_ORDER_FAILED,
  SET_MODAL_DATA,
  RESET_MODAL_DATA,
  SET_TAB_BAR_CURRENT,
  UPDATE_TAB_BAR_CURRENT,
} from "../constants";

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

export function postOrderData(ingridientsIdArray, accessToken) {
  return function (dispatch) {
    dispatch({
      type: POST_ORDER_REQUEST,
    });

    postOrder(ingridientsIdArray, accessToken)
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
