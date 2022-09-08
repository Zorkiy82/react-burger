import React from "react";
import { useDispatch } from "react-redux";
import styles from "./constructor-card.module.css";
import PropTypes from "prop-types";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { DELETE_CONSTRUCTOR_LIST_ITEM_MAIN } from "../../services/actions/app";

function ConstructorCard(props) {
  const dispatch = useDispatch();

  function deleteConstructorElement() {
    dispatch({
      type: DELETE_CONSTRUCTOR_LIST_ITEM_MAIN,
      index: props.index,
    });
    console.log(props.index);
  }

  return (
    <li className={`${styles.card} ${!props.isLocked ? "mr-2" : "mr-4"}`}>
      {!props.isLocked ? (
        <DragIcon type="primary" />
      ) : (
        <div className={styles.spacer} />
      )}

      <ConstructorElement {...props} handleClose={deleteConstructorElement} />
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
