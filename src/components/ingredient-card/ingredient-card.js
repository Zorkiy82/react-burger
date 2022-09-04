import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { IngredientPropTypes } from "../../utils/constants.js";
import styles from "./ingredient-card.module.css";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";

import {
  SET_MODAL_DATA,
  SET_VIEWED_INGREDIENT,
} from "../../services/actions/app.js";

function IngredientCard(props) {
  const dispatch = useDispatch();
  const { bun, main } = useSelector((store) => store.burgerConstructor);
  const ingridientsIdArray = [bun._id, bun._id];
  main.forEach((item) => ingridientsIdArray.push(item._id));
  const counterObject = {};
  ingridientsIdArray.forEach(
    (item) =>
      (counterObject[item] = counterObject[item] ? ++counterObject[item] : 1)
  );

  function handleOpenModal() {
    dispatch({
      type: SET_VIEWED_INGREDIENT,
      data: { ...props },
    });

    dispatch({
      type: SET_MODAL_DATA,
      modalIsVisible: true,
      modalType: "ingredient",
      errorData: {},
    });
  }

  return (
    <li className={styles.card} onClick={handleOpenModal}>
      <img src={props.image} className={styles.image} alt={props.name} />

      <div className={styles.praiceContainer}>
        <p className="text text_type_digits-default">{props.price}</p>
        <CurrencyIcon type="primary" />
      </div>

      <p className="text text_type_main-small">{props.name}</p>
      {counterObject[props._id] > 0 && (
        <Counter count={counterObject[props._id]} size="default" />
      )}
    </li>
  );
}

IngredientCard.propTypes = IngredientPropTypes.isRequired;

export { IngredientCard };
