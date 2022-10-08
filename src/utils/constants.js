import PropTypes from "prop-types";

const oneSecond=1;
const oneMinute=oneSecond*60;
const oneHour=oneMinute*60;
const oneDay=oneHour*24;
const oneWeek=oneDay*7;


const accessTokenLifetime = oneMinute * 19;
const refreshTokenLifetime = oneDay;

const defaultConstructorItems = {
  bun: {
    _id: "60666c42cc7b410027a1a9b2",
    name: "Флюоресцентная булка R2-D3",
    type: "bun",
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: "https://code.s3.yandex.net/react/code/bun-01.png",
    image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
    __v: 0,
  },
  main: [
    {
      _id: "60666c42cc7b410027a1a9b5",
      name: "Говяжий метеорит (отбивная)",
      type: "main",
      proteins: 800,
      fat: 800,
      carbohydrates: 300,
      calories: 2674,
      price: 3000,
      image: "https://code.s3.yandex.net/react/code/meat-04.png",
      image_mobile: "https://code.s3.yandex.net/react/code/meat-04-mobile.png",
      image_large: "https://code.s3.yandex.net/react/code/meat-04-large.png",
      __v: 0,
    },
  ],
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
