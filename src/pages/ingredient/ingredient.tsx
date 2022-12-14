import { FC, useMemo } from "react";
import { useSelector } from "../../services/hooks";
import { useParams } from "react-router-dom";
import { IngredientDetails } from "../../components/ingredient-details/ingredient-details";

export const IngredientPage: FC = () => {
  const { items } = useSelector((state) => state.ingredients);
  const { id } = useParams<{ id: string }>();

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
