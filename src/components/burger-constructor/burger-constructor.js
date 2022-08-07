import React from "react";
import PropTypes from 'prop-types';
import styles from "./burger-constructor.module.css";
import { ingredientPropTypes } from "../../utils/constants.js"
import { ConstructorCard } from "../constructor-card/constructor-card";
import { IngredientsList } from "../ingredients-list/ingredients-list";
import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

class BurgerConstructor extends React.Component {
  constructor(props) {
    super(props);

    this.totalPrice =
      this.props.main.reduce((summ, item) => summ + item.price, 0) +
      this.props.top.price +
      this.props.bottom.price;
  }
  render() {
    return (
      <>
        <div className={styles.main}>
          <ConstructorCard
            type="top"
            isLocked={true}
            text={`${this.props.top.name} (верх)`}
            price={this.props.top.price}
            thumbnail={this.props.top.image_mobile}
          />

          <IngredientsList {...this.props} />

          <ConstructorCard
            type="bottom"
            isLocked={true}
            text={`${this.props.bottom.name} (низ)`}
            price={this.props.bottom.price}
            thumbnail={this.props.bottom.image_mobile}
          />

          <div className={`${styles.totalPriceContainer} mr-4`}>
            <div className={styles.priceContainer}>
              <p className="text text_type_digits-medium">{this.totalPrice}</p>
              <CurrencyIcon type="primary" />
            </div>

            <Button type="primary" size="large">
              Оформить заказ
            </Button>
          </div>
        </div>
      </>
    );
  }
}



BurgerConstructor.propTypes = {
  main: PropTypes.arrayOf(ingredientPropTypes),
  top: ingredientPropTypes,
  bottom: ingredientPropTypes,
};

export { BurgerConstructor };
