import plus from "../images/plus-circle-o.svg";
import { TBurgerConstructorState } from "../services/reducers/constructor";

const oneSecond: number = 1;
const oneMinute = oneSecond * 60;
const oneHour = oneMinute * 60;
const oneDay = oneHour * 24;
const oneWeek = oneDay * 7;
export const msInDay = oneDay * 1000;

const accessTokenLifetime = oneMinute * 19;
const refreshTokenLifetime = oneDay;

const defaultConstructorItems: TBurgerConstructorState = {
  bun: {
    name: "Пожалуйста, перенесите сюда булку и ингредиенты для создания заказа",
    price: null,
    image_mobile: plus,
    _id: '',
    fat: 0,
    proteins: 0,
    type: 'bun',
    carbohydrates: 0,
    __v: 0,
    calories: 0,
    image: '',
    image_large: '',
    uuid:'',
  },
  main: [],
};


const ApiUrl = "https://norma.nomoreparties.space/api";

const ModalRoot: any = document.getElementById("react-modals");

const defaultOrderState = {
  name: "",
  success: false,
  order: {
    number: null,
  },
};

export {
  ApiUrl,
  ModalRoot,
  defaultConstructorItems,
  defaultOrderState,
  accessTokenLifetime,
  refreshTokenLifetime,
};
