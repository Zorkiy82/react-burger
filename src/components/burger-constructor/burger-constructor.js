import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useDrop } from "react-dnd";
import styles from "./burger-constructor.module.css";
import { ConstructorCard } from "../constructor-card/constructor-card";
import { IngredientsList } from "../ingredients-list/ingredients-list";
import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  postOrderData,
  GET_CONSTRUCTOR_LIST_RANDOM,
} from "../../services/actions/app.js";

function BurgerConstructor() {
  const dispatch = useDispatch();
  const { bun, main } = useSelector((store) => store.burgerConstructor);
  const { items } = useSelector((state) => state.ingredients);

  const [{ isHover }, dropTarget] = useDrop({
    accept: "ingredient",
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  const totalPrice = React.useMemo(
    () => main.reduce((summ, item) => summ + item.price, 0) + bun.price * 2,
    [main, bun]
  );

  function handleClickOrderButton() {
    const ingridientsIdArray = [bun._id, bun._id];
    main.forEach((item) => ingridientsIdArray.push(item._id));

    dispatch(postOrderData(ingridientsIdArray));
  }

  function updateConstructor() {
    dispatch({
      type: GET_CONSTRUCTOR_LIST_RANDOM,
      ingredientsData: items,
    });
  }

  return (
    <section className={`pl-4`}>
      <div
        className={`${styles.main}${isHover ? " " + styles.mainIsHover : ""}`}
        ref={dropTarget}
      >
        <ConstructorCard
          type="top"
          isLocked={true}
          text={`${bun.name} (верх)`}
          price={bun.price}
          thumbnail={bun.image_mobile}
          index="top"
          ingredientType="bun"
        />

        <IngredientsList main={main} />

        <ConstructorCard
          type="bottom"
          isLocked={true}
          text={`${bun.name} (низ)`}
          price={bun.price}
          thumbnail={bun.image_mobile}
          index="bottom"
          ingredientType="bun"
        />
      </div>

      <div className={`${styles.totalPriceContainer} mr-4`}>
        <div className={styles.priceContainer}>
          <p
            className="text text_type_digits-medium"
            onClick={updateConstructor}
          >
            {totalPrice}
          </p>
          <CurrencyIcon type="primary" />
        </div>

        <Button type="primary" size="large" onClick={handleClickOrderButton}>
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}

export { BurgerConstructor };
