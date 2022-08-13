import React from "react";
import styles from "./ingredient-card.module.css";
import { Modal } from "../modal/modal.js";
import { ModalOverlay } from "../modal-overlay/modal-overlay.js";

import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";

function IngredientCard(props) {

  const [ modalIsVisible,setModalIsVisible] = React.useState(false);

  const modalWindow = (
    <ModalOverlay onClose={handleCloseModal}>
      <Modal {...props}/>
    </ModalOverlay>
  );

  function handleOpenModal(){
    setModalIsVisible(true);
    console.log(props);
  }

  function handleCloseModal(){
    setModalIsVisible(false);
  }

  return (
    <li className={styles.card} onClick={handleOpenModal}>
      <img src={props.image} className={styles.image} alt={props.name} />

      <div className={styles.praiceContainer}>
        <p className="text text_type_digits-default">{props.price}</p>
        <CurrencyIcon type="primary" />
      </div>

      <p className="text text_type_main-small">{props.name}</p>
      <Counter count={1} size="default" />
      {modalIsVisible && (modalWindow)}
    </li>
  );
}

export { IngredientCard };
