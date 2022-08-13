import React from "react";
import { ConstructorCard } from "../constructor-card/constructor-card";
import styles from "./ingredients-list.module.css";

function IngredientsList(props) {
  return (
    <ul className={styles.list}>
      {props.main.map((item, index) => (
        <ConstructorCard
          key={index}
          text={item.name}
          price={item.price}
          thumbnail={item.image_mobile}
        />
      ))}
    </ul>
  );
}

export { IngredientsList };
