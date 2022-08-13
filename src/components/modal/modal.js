import React from "react";
import styles from "./modal.module.css";

function Modal(props) {
  return (
    <div className={`${styles.modal} pt-10 pr-10 pb-15 pl-10`} id="modal">
      <button
        id="modalCloseButton"
        type="button"
        className={styles.closeButton}
        alt="Закрыть"
      ></button>
      <p className="text text_type_main-large">Детали ингредиента</p>
      <img src={props.image_large} alt={props.name} />
      <p className="text text_type_main-medium">{props.name}</p>
    </div>
  );
}

export { Modal };
