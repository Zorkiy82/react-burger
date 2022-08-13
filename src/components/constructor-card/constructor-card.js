import React from "react";
import styles from "./constructor-card.module.css";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

function ConstructorCard(props) {
  return (
    <li className={`${styles.card} ${!props.isLocked ? "mr-2" : "mr-4"}`}>
      {!props.isLocked ? (
        <DragIcon type="primary" />
      ) : (
        <div
          style={{
            width: "24px",
            height: "24px",
          }}
        ></div>
      )}

      <ConstructorElement {...props} />
    </li>
  );
}

export { ConstructorCard };
