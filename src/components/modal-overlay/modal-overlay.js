import React from "react";
import ReactDOM from "react-dom";
import styles from "./modal-overlay.module.css";
import { ModalRoot } from "../../utils/constants.js";

function ModalOverlay() {
  return ReactDOM.createPortal(
    <div
      id="modalOverlay"
      name="overlay"
      className={styles.modalOverlay}
    ></div>,
    ModalRoot
  );
}

export { ModalOverlay };
