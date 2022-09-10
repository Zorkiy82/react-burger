import React from "react";
import PropTypes from "prop-types";
import { IngredientPropTypes } from "../../utils/constants.js";
import { ConstructorCard } from "../constructor-card/constructor-card";
import styles from "./ingredients-list.module.css";
import { v4 as uuidv4 } from "uuid";

function IngredientsList(props) {
  return (
    <ul className={styles.list}>
      {props.main.map((item,index) => (
        <ConstructorCard
          key={uuidv4()}
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

IngredientsList.propTypes = {
  main: PropTypes.arrayOf(IngredientPropTypes).isRequired,
};

export { IngredientsList };
