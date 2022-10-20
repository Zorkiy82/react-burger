import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
} from "../actions/app";

const ingredientsInitialState = {
  items: [],
  itemsRequest: true,
  itemsFailed: false,
};

export const ingredientsReducer = (state = ingredientsInitialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        itemsRequest: true,
      };
    }

    case GET_INGREDIENTS_SUCCESS: {
        const itemsCatalog = {};
        action.items.forEach(item=>{
          itemsCatalog[item._id]={...item};
        })


      return {
        ...state,
        itemsFailed: false,
        items: action.items,
        itemsCatalog: itemsCatalog,
        itemsRequest: false,
      };
    }

    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        itemsFailed: true,
        itemsRequest: false,
        items: [],
      };
    }

    default: {
      return state;
    }
  }
};