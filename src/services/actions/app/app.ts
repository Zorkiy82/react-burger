import { getIngredients, postOrder } from "../../../utils/burger-api";

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
} from "../../constants";

import { AppDispatch, AppThunk } from "../../types";
import {
  TDropIndex,
  TIngredient,
  TIngredientForConstructor,
  TOrder,
} from "../../types/data";

export interface IGetIngredientsAction {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
}
export interface IGetIngredientsSuccessAction {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  items: Array<TIngredient>;
}
export interface IGetIngredientsFailedAction {
  readonly type: typeof GET_INGREDIENTS_FAILED;
}

export interface IGetConstructorListRandomAction {
  readonly type: typeof GET_CONSTRUCTOR_LIST_RANDOM;
  readonly ingredientsData: Array<TIngredient>;
}
export interface ISetConstructorListBunAction {
  readonly type: typeof SET_CONSTRUCTOR_LIST_BUN;
  readonly item: TIngredientForConstructor;
}
export interface IResetConstructorListAction {
  readonly type: typeof RESET_CONSTRUCTOR_LIST;
}
export interface IAddConstructorListMainToIndexAction {
  readonly type: typeof ADD_CONSTRUCTOR_LIST_MAIN_TO_INDEX;
  readonly dropIndex: TDropIndex;
  readonly item: TIngredientForConstructor;
}
export interface IMoveConstructorListMainIndexToIndexAction {
  readonly type: typeof MOVE_CONSTRUCTOR_LIST_MAIN_INDEX_TO_INDEX;
  readonly dropIndex: TDropIndex;
  readonly dragIndex: number;
}
export interface IDeleteConstructorListItemMainAction {
  readonly type: typeof DELETE_CONSTRUCTOR_LIST_ITEM_MAIN;
  readonly index: number;
}

export interface IPosrOrderAction {
  readonly type: typeof POST_ORDER_REQUEST;
}
export interface IPosrOrderSuccessAction {
  readonly type: typeof POST_ORDER_SUCCESS;
  data: {
    success: boolean;
    name: string;
    order: TOrder;
  };
}
export interface IPosrOrderFailedAction {
  readonly type: typeof POST_ORDER_FAILED;
}

export interface ISetModalDataAction {
  readonly type: typeof SET_MODAL_DATA;
  modalIsVisible: boolean;
  modalType: "error" | "order" | "";
  errorData: {
    mesage: string;
    code: number | null;
    url: string;
  };
}

export interface IResetModalDataAction {
  readonly type: typeof RESET_MODAL_DATA;
}

export interface ISetTabBarCurrentAction {
  readonly type: typeof SET_TAB_BAR_CURRENT;
}
export interface IUpdateTabBarCurrentAction {
  readonly type: typeof UPDATE_TAB_BAR_CURRENT;
}

export type TAppActions =
  | IGetIngredientsAction
  | IGetIngredientsSuccessAction
  | IGetIngredientsFailedAction
  | IGetConstructorListRandomAction
  | ISetConstructorListBunAction
  | IResetConstructorListAction
  | IAddConstructorListMainToIndexAction
  | IMoveConstructorListMainIndexToIndexAction
  | IDeleteConstructorListItemMainAction
  | IPosrOrderAction
  | IPosrOrderSuccessAction
  | IPosrOrderFailedAction
  | IResetModalDataAction
  | ISetTabBarCurrentAction
  | IUpdateTabBarCurrentAction
  | ISetModalDataAction;

export const getIngredientsData: AppThunk = () => (dispatch: AppDispatch) => {
  dispatch({
    type: GET_INGREDIENTS_REQUEST,
  });

  getIngredients()
    .then((res: any) => {
      dispatch({
        type: GET_INGREDIENTS_SUCCESS,
        items: res.data,
      });
    })
    .catch((res) => {
      const code = res.status;
      const url = res.url;
      res.json().then((res: any) => {
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

export const postOrderData: AppThunk =
  (ingridientsIdArray: Array<string>, accessToken: string) =>
  (dispatch: AppDispatch) => {
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
        res.json().then((res: any) => {
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

export const handleDropAction: AppThunk =
  ({ action, data, dragIndex, dropIndex, ingredientType }) =>
  (dispatch: AppDispatch) => {
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
