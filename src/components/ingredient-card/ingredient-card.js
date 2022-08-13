import React from "react";
import styles from "./ingredient-card.module.css";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";

function IngredientCard(props) {
  return (
    <li className={styles.card}>
      <img src={props.image} className={styles.image} />

      <div className={styles.praiceContainer}>
        <p className="text text_type_digits-default">{props.price}</p>
        <CurrencyIcon type="primary" />
      </div>

      <p className="text text_type_main-small">{props.name}</p>
      <Counter count={1} size="default" />
    </li>
  );
}

export { IngredientCard };
