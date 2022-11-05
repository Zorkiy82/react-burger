export type TIngredientTypeBun = "bun";
export type TIngredientTypeWithoutBun = "main" | "sauce";
export type TIngredientTypeAll = TIngredientTypeBun | TIngredientTypeWithoutBun

export type TIngredient<T> = {
  readonly _id: string,
  readonly name: string,
  readonly type: T,
  readonly proteins: number,
  readonly fat: number,
  readonly carbohydrates: number,
  readonly calories: number,
  readonly price: number | null,
  readonly image: string,
  readonly image_mobile: string,
  readonly image_large: string,
  readonly __v: number,
}

export type TDropIndex = "bottom" | "top" | number;
