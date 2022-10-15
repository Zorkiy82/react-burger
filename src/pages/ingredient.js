import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { IngredientDetails } from "../components/ingredient-details/ingredient-details";

export function IngredientPage() {
  const { items } = useSelector((state) => state.ingredients);
  const { id } = useParams();

  const ingredientData = useMemo(() => {
    const res = items.filter((item) => item._id === id)[0];
    return res;
  }, [id, items]);

  return (
    <>
      {!ingredientData && (
        <p className="text text_type_main-large text_color_inactive">
          У нас нет такого ингредиента :-)
        </p>
      )}
      {ingredientData && <IngredientDetails {...ingredientData} />}
    </>
  );
}
