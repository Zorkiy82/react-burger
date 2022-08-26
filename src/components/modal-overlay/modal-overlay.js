import React from "react";
import { isPropertySignature } from "typescript";
import styles from "./modal-overlay.module.css";

function ModalOverlay(props) {
  return (
    <div id="modalOverlay" name="overlay" className={styles.modalOverlay}>
      {props.children}
    </div>
  );
}

export { ModalOverlay };
