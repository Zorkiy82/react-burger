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
  readonly price: number | null;
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

export type TOrder = {
  ingredients: Array<TIngredient> | [];
  _id: String;
  owner: {
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
  };

  status: "done" | "created" | "pending" | "";
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
  price: number;
};

export type TRecript = {
  _id: string;
  name: string;
  price: number | null;
  type: TIngredientTypeAll;
  image_mobile: string;
  counter: number;
};

export type TTabBar = "one" | "two" | "three";
