import { TAppActions } from "../actions/app/app";
import {
  SET_TAB_BAR_CURRENT,
  UPDATE_TAB_BAR_CURRENT,
} from "../constants/index";
import { TTabBar } from "../types/data";

type TTabBarState = {
  current: TTabBar;
};

const tabBarlInitialState: TTabBarState = {
  current: "one",
};

export const tabBarReducer = (
  state = tabBarlInitialState,
  action: TAppActions
): TTabBarState => {
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
