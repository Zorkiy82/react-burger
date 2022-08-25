import React from "react";
import { IngredientPropTypes } from "../../utils/constants.js";
import styles from "./ingredient-card.module.css";
import { Modal } from "../modal/modal.js";
import { IngredientDetails } from "../ingredient-details/ingredient-details";
import { ConstructorItemsContext } from "../../services/constructor-context";

import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";

function IngredientCard(props) {
  const [modalIsVisible, setModalIsVisible] = React.useState(false);
  const [count, setCount] = React.useState(0);
  const { constructorItemsState } = React.useContext(ConstructorItemsContext);

  const modalWindow = (
    <Modal onClose={handleCloseModal}>
      <IngredientDetails {...props} />
    </Modal>
  );

  React.useEffect(() => {
    setCount(getCount(props._id, props.type));
  });

  function handleOpenModal() {
    setModalIsVisible(true);
  }

  function handleCloseModal() {
    setModalIsVisible(false);
  }

  function getCount(id, type) {
    let count = 0;

    if (type === "bun") {
      if (id === constructorItemsState.bun._id) {
        count = 2;
      }
    }

    if (type !== "bun") {
      count = constructorItemsState.main.filter(
        (item) => item._id === id
      ).length;
    }

    return count;
  }

  return (
    <li className={styles.card} onClick={handleOpenModal}>
      <img src={props.image} className={styles.image} alt={props.name} />

      <div className={styles.praiceContainer}>
        <p className="text text_type_digits-default">{props.price}</p>
        <CurrencyIcon type="primary" />
      </div>

      <p className="text text_type_main-small">{props.name}</p>
      {count > 0 && <Counter count={count} size="default" />}
      {modalIsVisible && modalWindow}
    </li>
  );
}

IngredientCard.propTypes = { IngredientPropTypes };

export { IngredientCard };
