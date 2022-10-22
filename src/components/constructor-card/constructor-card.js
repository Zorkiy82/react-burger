import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { useDrag, useDrop } from "react-dnd";
import styles from "./constructor-card.module.css";
import PropTypes from "prop-types";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  DELETE_CONSTRUCTOR_LIST_ITEM_MAIN,
  handleDropAction,
} from "../../services/actions/app";

function ConstructorCard(props) {
  const dispatch = useDispatch();

  const [, dragRef] = useDrag({
    type: "ingredient",
    item: {
      data: {},
      action: "move",
      ingredientType: props.ingredientType,
      dragIndex: props.index,
    },
  });

  const [{ isHover, dragItem }, dropRef] = useDrop({
    accept: "ingredient",
    collect: (monitor) => ({
      isHover: monitor.isOver(),
      dragItem: monitor.getItem(),
    }),
    drop(itemData) {
      dispatch(
        handleDropAction({
          ...itemData,
          dropIndex: props.index,
        })
      );
    },
  });

  const dropPadding = useMemo(() => {
    if (isHover) {
      if (dragItem.ingredientType === "bun") {
        return {};
      }
    }

    return props.index === "top" && isHover
      ? { paddingBottom: "80px" }
      : isHover
      ? { paddingTop: "96px" }
      : {};
  }, [props.index, isHover]);

  function deleteConstructorElement() {
    dispatch({
      type: DELETE_CONSTRUCTOR_LIST_ITEM_MAIN,
      index: props.index,
    });
  }

  return (
    <li
      ref={dropRef}
      className={`${styles.resetLi} ${
        props.index === "top" ? "pb-4" : props.index !== 0 ? "pt-4" : ""
      }`}
      style={dropPadding}
    >
      <div
        className={`${styles.card} ${!props.isLocked ? "mr-2" : "mr-4"}`}
        ref={dragRef}
      >
        {!props.isLocked ? (
          <DragIcon type="primary" />
        ) : (
          <div className={styles.spacer} />
        )}

        <ConstructorElement {...props} handleClose={deleteConstructorElement} />
      </div>
    </li>
  );
}

ConstructorCard.propTypes = {
  type: PropTypes.oneOf(["top", "bottom", undefined]),
  isLocked: PropTypes.bool,
  handleClose: PropTypes.func,
  text: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  price: PropTypes.number,
};

export { ConstructorCard };
