import { number } from "prop-types";

export type TDropIndex = "bottom" | "top" | number;

export type TIngredientTypeBun = "bun";
export type TIngredientTypeWithoutBun = "main" | "sauce";
export type TIngredientTypeAll = TIngredientTypeBun | TIngredientTypeWithoutBun;

export type TIngredient = {
  readonly _id: string;
  readonly name: string;
  readonly type: TIngredientTypeAll;
  readonly proteins: number;
  readonly fat: number;
  readonly carbohydrates: number;
  readonly calories: number;
  readonly price: number;
  readonly image: string;
  readonly image_mobile: string;
  readonly image_large: string;
  readonly __v: number;
};

export type TIngredientCatalog = {
  [key: string]: TIngredient;
};

export type TIngredientForConstructor = TIngredient & {
  uuid: string;
};

export type TUser = {
  name: string;
  email: string;
};

export type TOrderBase = {
  _id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  number: number;
  status: "done" | "created" | "pending" | "";
};

export type TOrderFetch = TOrderBase & {
  ingredients: Array<TIngredient> | [];
  owner: TUser & {
    createdAt: string;
    updatedAt: string;
  };
  price: number;
};

export type TOrderWS = {
  orders: Array<
    TOrderBase & {
      ingredients: Array<string>;
    }
  >;
  success?: boolean;
  total: number;
  totalToday: number;
};

export type TRecript = {
  _id: string;
  name: string;
  price: number;
  type: TIngredientTypeAll;
  image_mobile: string;
  counter: number;
};

export type TTabBar = "one" | "two" | "three";

export type TTokenData = {
  accessToken: string;
  refreshToken: string;
};

export type TPostLoginData = TTokenData & {
  user: TUser;
};

export type TRegisterData = TPostLoginData & {
  success: boolean;
};
