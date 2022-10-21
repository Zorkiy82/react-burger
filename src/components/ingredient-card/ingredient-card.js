import React, { useMemo } from "react";
import { useDrag } from "react-dnd";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { IngredientPropTypes } from "../../utils/constants.js";
import { v4 as uuidv4 } from "uuid";
import styles from "./ingredient-card.module.css";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { getFormattedNumber } from "../../services/reducers/order.utils.js";

function IngredientCard(props) {
  const location = useLocation();
  const { bun, main } = useSelector((store) => store.burgerConstructor);
  const [, dragRef] = useDrag({
    type: "ingredient",
    item: {
      data: {
        ...props,
        uuid: uuidv4(),
      },
      action: "add",
      ingredientType: props.type,
      dragIndex: null,
    },
  });

  const counter = useMemo(() => {
    const ingridientsIdArray = [bun._id, bun._id];
    main.forEach((item) => ingridientsIdArray.push(item._id));
    const countObject = {};
    ingridientsIdArray.forEach(
      (item) =>
        (countObject[item] = countObject[item] ? ++countObject[item] : 1)
    );
    return countObject[props._id];
  }, [bun, main, props._id]);

  return (
    <li className={styles.li}>
      <Link
        className={styles.link}
        to={{
          pathname: `/ingredients/${props._id}`,
          state: { background: location },
        }}
      >
        <div className={styles.card} ref={dragRef}>
          <img src={props.image} className={styles.image} alt={props.name} />

          <div className={styles.praiceContainer}>
            <p className="text text_type_digits-default">{getFormattedNumber(props.price)}</p>
            <CurrencyIcon type="primary" />
          </div>

          <p className="text text_type_main-small">{props.name}</p>
        </div>

        {counter > 0 && <Counter count={counter} size="default" />}
      </Link>
    </li>
  );
}

IngredientCard.propTypes = IngredientPropTypes.isRequired;

export { IngredientCard };
