import React from "react";
import PropTypes from 'prop-types';
import { ingredientPropTypes } from "../../utils/constants.js"
import { TabBar } from "../tab-bar/tab-bar.js";
import { CardList } from "../card-list/card-list.js";
import styles from "./burger-ingredients.module.css";

class BurgerIngredients extends React.Component {
  constructor(props) {
    super(props);
    this.bunList = this.props.initialData.filter(
      (value) => value.type === "bun"
    );

    this.sauceList = this.props.initialData.filter(
      (value) => value.type === "sauce"
    );

    this.mainList = this.props.initialData.filter(
      (value) => value.type === "main"
    );
  }

  render() {
    return (
      <>
        <TabBar />

        <div className={styles.scrollbarContainer}>
          <p className="text text_type_main-medium mt-10 mb-6" id="one">
            Булки
          </p>

          <CardList data={this.bunList} />

          <p className="text text_type_main-medium mt-10 mb-6" id="two">
            Соусы
          </p>

          <CardList data={this.sauceList} />

          <p className="text text_type_main-medium mt-10 mb-6" id="three">
            Начинки
          </p>

          <CardList data={this.mainList} />
        </div>
      </>
    );
  }
}

BurgerIngredients.propTypes = {
  initialData: PropTypes.arrayOf(ingredientPropTypes)
};

export { BurgerIngredients };
