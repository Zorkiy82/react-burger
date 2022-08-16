import React from "react";
import PropTypes from "prop-types";
import styles from "./burger-constructor.module.css";
import { IngredientPropTypes } from "../../utils/constants.js";
import { ConstructorCard } from "../constructor-card/constructor-card";
import { IngredientsList } from "../ingredients-list/ingredients-list";
import { Modal } from "../modal/modal";
import { OrderDetails } from "../order-details/order-details";
import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

function BurgerConstructor(props) {
  const [modalIsVisible, setModalIsVisible] = React.useState(false);

  const modalWindow = (
    <Modal onClose={handleCloseModal}>
      <OrderDetails />
    </Modal>
  );

  const totalPrice =
    props.main.reduce((summ, item) => summ + item.price, 0) +
    props.top.price +
    props.bottom.price;

  function handleOpenModal() {
    setModalIsVisible(true);
  }

  function handleCloseModal() {
    setModalIsVisible(false);
  }

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

        <IngredientsList main={props.main} />

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

          <Button type="primary" size="large" onClick={handleOpenModal}>
            Оформить заказ
          </Button>
        </div>

        {modalIsVisible && modalWindow}
      </div>
    </>
  );
}

BurgerConstructor.propTypes = {
  main: PropTypes.arrayOf(IngredientPropTypes),
  top: IngredientPropTypes,
  bottom: IngredientPropTypes,
};

export { BurgerConstructor };
