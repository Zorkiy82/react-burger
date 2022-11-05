import { SET_MODAL_DATA, RESET_MODAL_DATA } from "../constants/index";

const modalInitialState = {
  modalIsVisible: false,
  modalType: "",
  errorData: {},
};

export const modalReducer = (state = modalInitialState, action) => {
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
