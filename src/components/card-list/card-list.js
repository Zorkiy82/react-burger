import React from "react";
import { IngredientCard } from "../ingredient-card/ingredient-card";
import styles from "./card-list.module.css";

class CardList extends React.Component {
  render() {
    return (
      <ul className={styles.cardList}>
        {this.props.data.map((item) => (
          <IngredientCard key={item._id} {...item} />
        ))}
      </ul>
    );
  }
}

export { CardList };
