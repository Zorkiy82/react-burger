import { FC, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useDrag, useDrop } from "react-dnd";
import styles from "./constructor-card.module.css";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { handleDropAction } from "../../services/actions/app";
import { DELETE_CONSTRUCTOR_LIST_ITEM_MAIN } from "../../services/constants";

const ConstructorCard: FC<any> = (props) => {
  const dispatch: any = useDispatch();

  const [{ isDrag }, dragRef] = useDrag({
    type: "ingredient",
    item: {
      data: {},
      action: "move",
      ingredientType: props.ingredientType,
      dragIndex: props.index,
    },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  const [{ isHover, dragItem }, dropRef]: any = useDrop({
    accept: "ingredient",
    collect: (monitor) => ({
      isHover: monitor.isOver(),
      dragItem: monitor.getItem(),
    }),
    drop(itemData: any) {
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
    <>
      {!isDrag && (
        <li
          ref={dropRef}
          className={`${styles.resetLi} ${props.index === "top" ? "pb-4" : props.index !== 0 ? "pt-4" : ""
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
            <ConstructorElement
              {...props}
              handleClose={deleteConstructorElement}
            />
          </div>
        </li>
      )}
    </>
  );
}

export { ConstructorCard };
