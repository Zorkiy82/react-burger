import { SET_VIEWED_INGREDIENT } from "../actions/app";

const viewedIngredientInitialState = {
  ingredientData: {},
};

export const viewedIngredientReducer = (
  state = viewedIngredientInitialState,
  action
) => {
  switch (action.type) {
    case SET_VIEWED_INGREDIENT: {
      return {
        ...state,
        ingredientData: { ...action.data },
      };
    }
    default: {
      return state;
    }
  }
};
