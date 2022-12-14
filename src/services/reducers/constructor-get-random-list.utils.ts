import { v4 as uuidv4 } from "uuid";
import { TIngredient } from "../types/data";
import { TBurgerConstructorState } from "./constructor";

export function getRandomConstructorList(
  ingredientsData: Array<TIngredient>
): TBurgerConstructorState {
  const bunIngredientArray = ingredientsData.filter(
    (item) => item.type === "bun"
  );
  const notBunIngredientArray = ingredientsData.filter(
    (item) => item.type !== "bun"
  );
  const numberOfOtherIngredients = Math.round(Math.random() * 7 + 1);
  const otherIngredientsArray = [];

  const bunIngredient = {
    ...bunIngredientArray[
      Math.round(Math.random() * (bunIngredientArray.length - 1))
    ],
    uuid: uuidv4(),
  };

  for (let i = 1; i <= numberOfOtherIngredients; ++i) {
    const rnd = Math.round(Math.random() * (notBunIngredientArray.length - 1));
    otherIngredientsArray.push({
      ...notBunIngredientArray[rnd],
      uuid: uuidv4(),
    });
  }

  return { bun: bunIngredient, main: otherIngredientsArray };
}
