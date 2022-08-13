import React from "react";
import PropTypes from "prop-types";
import { ingredientPropTypes } from "../../utils/constants.js";
import { TabBar } from "../tab-bar/tab-bar.js";
import { CardList } from "../card-list/card-list.js";
import styles from "./burger-ingredients.module.css";

function BurgerIngredients(props) {
  const bunList = props.initialData.filter(
    (value) => value.type === "bun"
  );

  const sauceList = props.initialData.filter(
    (value) => value.type === "sauce"
  );

  const mainList = props.initialData.filter(
    (value) => value.type === "main"
  );

  return (
    <>
      <TabBar />

      <div className={styles.scrollbarContainer}>
        <p className="text text_type_main-medium mt-10 mb-6" id="one">
          Булки
        </p>

        <CardList data={bunList} />

        <p className="text text_type_main-medium mt-10 mb-6" id="two">
          Соусы
        </p>

        <CardList data={sauceList} />

        <p className="text text_type_main-medium mt-10 mb-6" id="three">
          Начинки
        </p>

        <CardList data={mainList} />
      </div>
    </>
  );
}

BurgerIngredients.propTypes = {
  initialData: PropTypes.arrayOf(ingredientPropTypes),
};

export { BurgerIngredients };
