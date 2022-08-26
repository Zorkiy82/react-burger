import React from "react";
import styles from "./burger-constructor.module.css";
import { defaultOrderState } from "../../utils/constants.js";
import { ConstructorCard } from "../constructor-card/constructor-card";
import { IngredientsList } from "../ingredients-list/ingredients-list";
import { Modal } from "../modal/modal";
import { OrderDetails } from "../order-details/order-details";
import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { ConstructorItemsContext } from "../../services/constructor-context";
import { BurgerIngredientsContext } from "../../services/app-context.js";
import { postOrder } from "../../utils/burger-api.js";
import { ErrorDetails } from "../error-details/error-details.js";

function BurgerConstructor() {
  const [modalIsVisible, setModalIsVisible] = React.useState(false);
  const [orderState, setOrderState] = React.useState(defaultOrderState);
  const { constructorItemsState, constructorItemsDispatcher } =
    React.useContext(ConstructorItemsContext);
  const { ingredientsDataArray } = React.useContext(BurgerIngredientsContext);
  const [hasError, sethasError] = React.useState(false);
  const [erorrData, setErorrData] = React.useState({
    mesage: null,
    code: null,
    url: null,
  });

  const modalWindow = (
    <Modal onClose={handleCloseModal}>
      <OrderDetails number={orderState.order.number} />
    </Modal>
  );

  const totalPrice =
    constructorItemsState.main.reduce((summ, item) => summ + item.price, 0) +
    constructorItemsState.bun.price * 2;

  function handleClickOrderButton() {
    const ingridientsIdArray = [
      constructorItemsState.bun._id,
      constructorItemsState.bun._id,
    ];
    constructorItemsState.main.forEach((item) =>
      ingridientsIdArray.push(item._id)
    );
    postOrder(ingridientsIdArray)
      .then((data) => {
        setOrderState(data);
      })
      .catch((res) => {
        sethasError(true);
        setErorrData({
          mesage: res.statusText,
          code: res.status,
          url: res.url,
        });
      })
      .finally(() => {
        setModalIsVisible(true);
      });
  }

  function handleCloseModal() {
    setModalIsVisible(false);
  }

  function updateConstructor() {
    constructorItemsDispatcher({
      type: "random",
      ingredientsData: ingredientsDataArray,
    });
  }

  return (
    <section className={`${styles.main} pl-4`}>
      <ConstructorCard
        type="top"
        isLocked={true}
        text={`${constructorItemsState.bun.name} (верх)`}
        price={constructorItemsState.bun.price}
        thumbnail={constructorItemsState.bun.image_mobile}
      />

      <IngredientsList main={constructorItemsState.main} />

      <ConstructorCard
        type="bottom"
        isLocked={true}
        text={`${constructorItemsState.bun.name} (низ)`}
        price={constructorItemsState.bun.price}
        thumbnail={constructorItemsState.bun.image_mobile}
      />

      <div className={`${styles.totalPriceContainer} mr-4`}>
        <div className={styles.priceContainer}>
          <p
            className="text text_type_digits-medium"
            onClick={updateConstructor}
          >
            {totalPrice}
          </p>
          <CurrencyIcon type="primary" />
        </div>

        <Button type="primary" size="large" onClick={handleClickOrderButton}>
          Оформить заказ
        </Button>
      </div>

      {modalIsVisible && !hasError && modalWindow}
      {hasError && modalIsVisible && (
        <Modal onClose={handleCloseModal}>
          <ErrorDetails {...erorrData} />
        </Modal>
      )}
    </section>
  );
}

export { BurgerConstructor };
