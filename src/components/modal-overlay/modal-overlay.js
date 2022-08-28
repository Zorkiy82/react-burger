import React from "react";

import styles from "./modal-overlay.module.css";

function ModalOverlay() {
  return (
    <div id="modalOverlay" name="overlay" className={styles.modalOverlay}></div>
  );
}

export { ModalOverlay };
