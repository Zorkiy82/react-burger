import React from "react";
import PropTypes from 'prop-types';
import styles from "./burger-constructor.module.css";
import { ConstructorCard } from "../constructor-card/constructor-card";
import { IngredientsList } from "../ingredients-list/ingredients-list";
import {
  ConstructorElement,
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

const ingredientPropTypes = PropTypes.shape({
  _id: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  proteins: PropTypes.number,
  fat: PropTypes.number,
  carbohydrates: PropTypes.number,
  calories: PropTypes.number,
  price: PropTypes.number,
  image: PropTypes.string,
  image_mobile: PropTypes.string,
  image_large: PropTypes.string,
  __v: PropTypes.number,
});

BurgerConstructor.propTypes = {
  main: PropTypes.arrayOf(ingredientPropTypes),
  top: ingredientPropTypes,
  bottom: ingredientPropTypes,
};

export { BurgerConstructor };
