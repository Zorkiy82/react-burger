import React from "react";
import styles from "./modal.module.css";

function Modal(props) {
  return (
    <div className={styles.modal} id="modal">
      <button
        id="modalCloseButton"
        type="button"
        className={styles.closeButton}
        alt="Закрыть"
      ></button>
      {props.children}
    </div>
  );
}

export { Modal };
