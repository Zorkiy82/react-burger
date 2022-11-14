import { FC } from "react";
import { TIngredient } from "../../services/types/data";
import { IngredientCard } from "../ingredient-card/ingredient-card";
import styles from "./card-list.module.css";

const CardList: FC<{ data: Array<TIngredient> }> = ({ data }) => {
  return (
    <ul className={styles.cardList}>
      {data.map((item: TIngredient) => (
        <IngredientCard key={item._id} {...item} />
      ))}
    </ul>
  );
}

export { CardList };
