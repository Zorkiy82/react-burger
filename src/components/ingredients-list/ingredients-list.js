import React from "react";
import PropTypes from "prop-types";
import { IngredientPropTypes } from "../../utils/constants.js";
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

IngredientsList.propTypes = {
  main: PropTypes.arrayOf(IngredientPropTypes).isRequired,
};

export { IngredientsList };
