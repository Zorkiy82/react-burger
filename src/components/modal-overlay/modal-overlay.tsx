import { FC } from "react";
import styles from "./modal-overlay.module.css";

const ModalOverlay: FC = () => {
  return (
    <div id="modalOverlay" className={styles.modalOverlay}></div>
  );
}

export { ModalOverlay };
