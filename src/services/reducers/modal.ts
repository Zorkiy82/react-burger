import { TAppActions } from "../actions/app/app";
import { SET_MODAL_DATA, RESET_MODAL_DATA } from "../constants/index";

type TModalState = {
  modalIsVisible: boolean;
  modalType: "error" | "order" | "";
  errorData: {
    mesage: string;
    code: number | null;
    url: string;
  };
};

const modalInitialState: TModalState = {
  modalIsVisible: false,
  modalType: "",
  errorData: {
    mesage: "",
    code: null,
    url: "",
  },
};

export const modalReducer = (
  state = modalInitialState,
  action: TAppActions
): TModalState => {
  switch (action.type) {
    case SET_MODAL_DATA: {
      return {
        modalIsVisible: action.modalIsVisible,
        modalType: action.modalType,
        errorData: { ...action.errorData },
      };
    }
    case RESET_MODAL_DATA: {
      return {
        ...modalInitialState,
      };
    }
    default: {
      return state;
    }
  }
};
