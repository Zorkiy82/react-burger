import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import styles from "./modal.module.css";
import { ModalOverlay } from "../modal-overlay/modal-overlay";
import { ModalRoot } from "../../utils/constants.js";

function Modal(props) {
  React.useEffect(() => {
    window.addEventListener("keydown", handleKeydownEsc);

    return () => {
      window.removeEventListener("keydown", handleKeydownEsc);
    };
  }, []);

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
    <div className={styles.modal} id="modal" onMouseDown={handleMouseDown}>
      <button
        id="modalCloseButton"
        type="button"
        className={styles.closeButton}
        alt="Закрыть"
      ></button>
      {props.children}
      <ModalOverlay />
    </div>,
    ModalRoot
  );
}

Modal.propTypes = {
  onClose: PropTypes.func,
};

export { Modal };
