import { FC } from "react";
import { ConstructorCard } from "../constructor-card/constructor-card";
import styles from "./ingredients-list.module.css";

const IngredientsList: FC<any> = (props) => {
  return (
    <ul className={styles.list}>
      {props.main.map((item: any, index: number) => (
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
