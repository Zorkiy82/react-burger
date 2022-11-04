import { FC } from "react";
import { IngredientCard } from "../ingredient-card/ingredient-card";
import styles from "./card-list.module.css";

const CardList: FC<any> = (props) => {
  return (
    <ul className={styles.cardList}>
      {props.data.map((item:any) => (
        <IngredientCard key={item._id} {...item} />
      ))}
    </ul>
  );
}

export { CardList };
