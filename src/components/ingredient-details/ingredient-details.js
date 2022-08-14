import React from "react";
import PropTypes from "prop-types";
import styles from "./ingredient-details.module.css";
import { IngredientPropTypes } from "../../utils/constants.js";

function IngredientDetails(props) {
  return (
    <div className={`${styles.ingredientDetails} pt-10 pl-10 pb-15 pr-10`}>
      <p className="text text_type_main-large mt-3 mb-3">Детали ингредиента</p>

      <div className={`${styles.mainContainer}`}>
        <img
          src={props.image_large}
          alt={props.name}
          className={`${styles.mainImage}`}
        />
        <p className={`${styles.name} text text_type_main-medium mt-4`}>{props.name}</p>

        <div className={`${styles.componentsContainer} mt-8`}>
          <div className={`${styles.componentContainer}`}>
            <p className="text text_type_main-default text_color_inactive">
              Калории,ккал
            </p>
            <span className="text text_type_digits-default text_color_inactive">
              {props.calories}
            </span>
          </div>

          <div className={`${styles.componentContainer}`}>
            <p className="text text_type_main-default text_color_inactive">
              Белки, г
            </p>
            <span className="text text_type_digits-default text_color_inactive">
              {props.proteins}
            </span>
          </div>

          <div className={`${styles.componentContainer}`}>
            <p className="text text_type_main-default text_color_inactive">
              Жиры, г
            </p>
            <span className="text text_type_digits-default text_color_inactive">
              {props.fat}
            </span>
          </div>

          <div className={`${styles.componentContainer}`}>
            <p className="text text_type_main-default text_color_inactive">
              Углеводы, г
            </p>
            <span className="text text_type_digits-default text_color_inactive">
              {props.carbohydrates}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

IngredientDetails.propTypes = {IngredientPropTypes};

export { IngredientDetails };
