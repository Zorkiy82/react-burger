import React from "react";
import ReactDOM from "react-dom";
import styles from "./modal-overlay.module.css";
import { ModalRoot } from "../../utils/constants.js";

function ModalOverlay(props) {

  React.useEffect(() => {
    window.addEventListener("keydown", handleKeydownEsc);

    return () => {
      window.removeEventListener("keydown", handleKeydownEsc);
    };

  });

  function handleMouseDown(evt) {
    const eventId = evt.target.id;
    if (eventId === "modalOverlay" || eventId === "modalCloseButton") {
      props.onClose();
    }
  }

  function handleKeydownEsc(evt) {
    if (evt.key === "Escape") {
      props.onClose();
    }
  }

  return ReactDOM.createPortal(
    <div
      id="modalOverlay"
      name="overlay"
      className={styles.modalOverlay}
      onMouseDown={handleMouseDown}
    >
      {props.children}
    </div>,
    ModalRoot
  );
}

export { ModalOverlay };
