import React from "react";
import styles from "./ingredient-card.module.css";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";

class IngredientCard extends React.Component {
  render() {
    return (
      <li className={styles.card}>
        <img src={this.props.image} className={styles.image} />

        <div className={styles.praiceContainer}>
          <p className="text text_type_digits-default">{this.props.price}</p>
          <CurrencyIcon type="primary" />
        </div>

        <p className="text text_type_main-small">{this.props.name}</p>
        <Counter count={1} size="default" />
      </li>
    );
  }
}

export { IngredientCard };
