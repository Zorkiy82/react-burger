import PropTypes from "prop-types";
import plus from "../images/plus-circle-o.svg";

const oneSecond = 1;
const oneMinute = oneSecond * 60;
const oneHour = oneMinute * 60;
const oneDay = oneHour * 24;
const oneWeek = oneDay * 7;

const accessTokenLifetime = oneMinute * 19;
const refreshTokenLifetime = oneDay;

const defaultConstructorItems = {
  bun: {
    name: "Пожалуйста, перенесите сюда булку и ингредиенты для создания заказа",
    price: null,
    image_mobile: plus,
  },
  main: [],
};

const IngredientPropTypes = PropTypes.shape({
  _id: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  proteins: PropTypes.number,
  fat: PropTypes.number,
  carbohydrates: PropTypes.number,
  calories: PropTypes.number,
  price: PropTypes.number,
  image: PropTypes.string,
  image_mobile: PropTypes.string,
  image_large: PropTypes.string,
  __v: PropTypes.number,
});

const ApiUrl = "https://norma.nomoreparties.space/api";

const ModalRoot = document.getElementById("react-modals");

const defaultOrderState = {
  name: "",
  success: false,
  order: {
    number: null,
  },
};

export {
  IngredientPropTypes,
  ApiUrl,
  ModalRoot,
  defaultConstructorItems,
  defaultOrderState,
  accessTokenLifetime,
  refreshTokenLifetime,
};
