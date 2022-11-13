import { FC, useEffect, ReactElement, ReactNode } from "react";
import ReactDOM from "react-dom";
import styles from "./modal.module.css";
import { ModalOverlay } from "../modal-overlay/modal-overlay";
import { ModalRoot } from "../../utils/constants";


const Modal: FC<{ onClose: () => void, children: ReactNode }> = (props) => {
  useEffect(() => {
    window.addEventListener("keydown", handleKeydownEsc);

    return () => {
      window.removeEventListener("keydown", handleKeydownEsc);
    };
  }, []);

  function handleMouseDown(evt: any) {
    const eventId = evt.target.id;
    if (eventId === "modalOverlay" || eventId === "modalCloseButton") {
      props.onClose();
    }
  }

  function handleKeydownEsc(evt: KeyboardEvent) {
    if (evt.key === "Escape") {
      props.onClose();
    }
  }

  return ReactDOM.createPortal(
    <div className={styles.outerContainer} onMouseDown={handleMouseDown}>
      <ModalOverlay />

      <div className={styles.modal} id="modal">
        <button
          id="modalCloseButton"
          type="button"
          className={styles.closeButton}
        ></button>

        {props.children}
      </div>
    </div>,
    ModalRoot
  );
}

export { Modal };
