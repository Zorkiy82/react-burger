import { FC } from "react";
import { TIngredientForConstructor } from "../../services/types/data";
import { ConstructorCard } from "../constructor-card/constructor-card";
import styles from "./ingredients-list.module.css";

const IngredientsList: FC<{ main: TIngredientForConstructor[] }> = ({ main }) => {
  return (
    <ul className={styles.list}>
      {main.map((item, index: number) => (
        <ConstructorCard
          key={item.uuid}
          text={item.name}
          price={item.price}
          index={index}
          thumbnail={item.image_mobile}
          ingredientType={item.type}
        />
      ))}
    </ul>
  );
}

export { IngredientsList };
