import React from "react";
import styles from "./constructor-card.module.css";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

class ConstructorCard extends React.Component {
  render() {
    return (
      <li
        className={`${styles.card} ${!this.props.isLocked ? "mr-2" : "mr-4"}`}
      >
        {!this.props.isLocked ? (
          <DragIcon type="primary" />
        ) : (
          <div
            style={{
              width: "24px",
              height: "24px",
            }}
          ></div>
        )}

        <ConstructorElement {...this.props} />
      </li>
    );
  }
}

export { ConstructorCard };
