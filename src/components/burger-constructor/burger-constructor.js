import React from "react";
import PropTypes from "prop-types";
import styles from "./burger-constructor.module.css";
import { ingredientPropTypes } from "../../utils/constants.js";
import { ConstructorCard } from "../constructor-card/constructor-card";
import { IngredientsList } from "../ingredients-list/ingredients-list";
import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

function BurgerConstructor(props) {
  const totalPrice =
    props.main.reduce((summ, item) => summ + item.price, 0) +
    props.top.price +
    props.bottom.price;

  return (
    <>
      <div className={styles.main}>
        <ConstructorCard
          type="top"
          isLocked={true}
          text={`${props.top.name} (верх)`}
          price={props.top.price}
          thumbnail={props.top.image_mobile}
        />

        <IngredientsList {...props} />

        <ConstructorCard
          type="bottom"
          isLocked={true}
          text={`${props.bottom.name} (низ)`}
          price={props.bottom.price}
          thumbnail={props.bottom.image_mobile}
        />

        <div className={`${styles.totalPriceContainer} mr-4`}>
          <div className={styles.priceContainer}>
            <p className="text text_type_digits-medium">{totalPrice}</p>
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

BurgerConstructor.propTypes = {
  main: PropTypes.arrayOf(ingredientPropTypes),
  top: ingredientPropTypes,
  bottom: ingredientPropTypes,
};

export { BurgerConstructor };
