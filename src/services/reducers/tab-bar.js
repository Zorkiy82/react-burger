import { SET_TAB_BAR_CURRENT, UPDATE_TAB_BAR_CURRENT } from "../constants/index";

const tabBarlInitialState = {
  current: "one",
};

export const tabBarReducer = (state = tabBarlInitialState, action) => {
  switch (action.type) {
    case SET_TAB_BAR_CURRENT: {
      return {
        ...state,
        current: action.current,
      };
    }

    case UPDATE_TAB_BAR_CURRENT: {
      if (state.current !== action.current) {
        return {
          ...state,
          current: action.current,
        };
      }
      return { ...state };
    }

    default: {
      return state;
    }
  }
};
