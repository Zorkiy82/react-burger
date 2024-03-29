import React, { useMemo, useEffect } from "react";
import { getCookie } from "../../utils/utils";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "../../services/hooks";
import { checkAuth } from "../../utils/utils";
import { useDrop } from "react-dnd";
import styles from "./burger-constructor.module.css";
import { ConstructorCard } from "../constructor-card/constructor-card";
import { IngredientsList } from "../ingredients-list/ingredients-list";
import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { postOrderData } from "../../services/actions/app/app";
import { GET_CONSTRUCTOR_LIST_RANDOM } from "../../services/constants";
import { getFormattedNumber } from "../../services/reducers/order.utils";

function BurgerConstructor() {
  const dispatch = useDispatch();
  const isAuthorized = useSelector((state) => state.profile.isAuthorized);
  const { orderDataRequest } = useSelector((state) => state.orderElement);
  useEffect(() => {
    checkAuth(isAuthorized);
  });
  const history = useHistory();
  const { bun, main } = useSelector((store) => store.burgerConstructor);
  const { items } = useSelector((state) => state.ingredients);

  const [{ isHover }, dropTarget] = useDrop({
    accept: "ingredient",
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  const totalPrice = useMemo(
    () => main.reduce((summ, item) => item.price !== null ? summ + item.price : summ
      , 0) + ((bun.price !== null) ? (bun.price * 2) : 0),
    [main, bun]
  );

  function handleClickOrderButton(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();

    if (getCookie("accessToken")) {
      const ingridientsIdArray = [bun._id, bun._id];
      main.forEach((item) => ingridientsIdArray.push(item._id));
      dispatch(postOrderData(ingridientsIdArray, getCookie("accessToken")));
    } else {
      history.replace({
        pathname: "/login",
      });
    }
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
        className={`${styles.main}${isHover ? " " + styles.mainIsHover : ""} ${styles.skeletonLoaderContainer
          }`}
        ref={dropTarget}
      >
        {orderDataRequest && (
          <div className={styles.skeletonLoader}>
            <p className="text text_type_main-large">
              Отправляем Ваш заказ
            </p>
          </div>
        )}
        <ConstructorCard
          type="top"
          isLocked={true}
          text={`${bun.name}${bun.uuid ? " (верх)" : ""}`}
          price={bun.price}
          thumbnail={bun.image_mobile}
          index="top"
          ingredientType="bun"
        />

        <IngredientsList main={main} />

        <ConstructorCard
          type="bottom"
          isLocked={true}
          text={`${bun.name}${bun.uuid ? " (низ)" : ""}`}
          price={bun.price}
          thumbnail={bun.image_mobile}
          index="bottom"
          ingredientType="bun"
        />
      </div>

      <form
        name="constructorForm"
        onSubmit={handleClickOrderButton}
        className={`${styles.totalPriceContainer} mr-4`}
      >
        <div className={styles.priceContainer}>
          <p
            className="text text_type_digits-medium"
            onClick={updateConstructor}
          >
            {getFormattedNumber(totalPrice)}
          </p>
          <CurrencyIcon type="primary" />
        </div>
        <div style={!bun.uuid || orderDataRequest ? { opacity: "0.2" } : {}}>
          <Button
            type="primary"
            size="large"
            htmlType={!bun.uuid || orderDataRequest ? "button" : "submit"}
          >
            Оформить заказ
          </Button>
        </div>
      </form>
    </section>
  );
}

export { BurgerConstructor };
