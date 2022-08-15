import React from "react";
import styles from "./constructor-card.module.css";
import PropTypes from "prop-types";
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

ConstructorCard.propTypes = {
  type: PropTypes.oneOf(["top", "bottom", undefined]),
  isLocked: PropTypes.bool,
  handleClose: PropTypes.func,
  text: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

export { ConstructorCard };
