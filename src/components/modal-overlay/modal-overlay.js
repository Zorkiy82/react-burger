import React from "react";
import ReactDOM from "react-dom";
import styles from "./modal-overlay.module.css";
import { ModalRoot } from "../../utils/constants.js";

function ModalOverlay(props) {
  function handleClick(evt) {
    const eventId = evt.target.id;

    if (eventId === "modalOverlay" || eventId === "modalCloseButton") {
      props.onClose();
    } else {
      console.dir(evt.target.id);
    }
  }

  // function handleKeyDown(evt) {
  //   console.dir(evt);
  // }
  return ReactDOM.createPortal(
    <div
      id="modalOverlay"
      name="overlay"
      className={styles.modalOverlay}
      onMouseDown={handleClick}
    >
      {props.children}
    </div>,
    ModalRoot
  );
}

export { ModalOverlay };
