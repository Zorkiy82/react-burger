import React from "react";
import { IngredientCard } from "../ingredient-card/ingredient-card";
import styles from "./card-list.module.css";

function CardList(props) {

    return (
      <ul className={styles.cardList} >
        {props.data.map((item) => (
          <IngredientCard key={item._id} {...item} />
        ))}
      </ul>
    );
  }


export { CardList };
