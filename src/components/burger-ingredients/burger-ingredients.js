import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { TabBar } from "../tab-bar/tab-bar.js";
import { CardList } from "../card-list/card-list.js";
import styles from "./burger-ingredients.module.css";
import { SET_TAB_BAR_CURRENT } from "../../services/actions/app";

function BurgerIngredients() {
  const dispatch = useDispatch();
  const { current } = useSelector((state) => state.tabBar);

  const { items } = useSelector((state) => state.ingredients);

  const baseRef = React.useRef();
  const idOneRef = React.useRef();
  const idTwoRef = React.useRef();
  const idThreeRef = React.useRef();

  const bunList = React.useMemo(
    () => items.filter((distance) => distance.type === "bun"),
    [items]
  );

  const sauceList = React.useMemo(
    () => items.filter((distance) => distance.type === "sauce"),
    [items]
  );

  const mainList = React.useMemo(
    () => items.filter((distance) => distance.type === "main"),
    [items]
  );

  function handlerOnScroll() {
    const baseY = baseRef.current.getBoundingClientRect().y;
    const idOneY = idOneRef.current.getBoundingClientRect().y;
    const idTwoY = idTwoRef.current.getBoundingClientRect().y;
    const idThreeY = idThreeRef.current.getBoundingClientRect().y;
    const distanceArray = [
      {
        name: "one",
        distance: Math.abs(baseY - idOneY),
      },
      {
        name: "two",
        distance: Math.abs(baseY - idTwoY),
      },
      {
        name: "three",
        distance: Math.abs(baseY - idThreeY),
      },
    ];

    distanceArray.sort((a, b) => a.distance - b.distance);

    if (distanceArray[0].name !== current) {
      dispatch({
        type: SET_TAB_BAR_CURRENT,
        current: distanceArray[0].name,
      });
    }
  }

  return (
    <section>
      <p className="text text_type_main-large mt-10 mb-5">Соберите бургер</p>
      <TabBar />

      <div
        className={styles.scrollbarContainer}
        ref={baseRef}
        onScroll={handlerOnScroll}
      >
        <p
          className="text text_type_main-medium mt-10 mb-6"
          id="one"
          ref={idOneRef}
        >
          Булки
        </p>

        <CardList data={bunList} />

        <p
          className="text text_type_main-medium mt-10 mb-6"
          id="two"
          ref={idTwoRef}
        >
          Соусы
        </p>

        <CardList data={sauceList} />

        <p
          className="text text_type_main-medium mt-10 mb-6"
          id="three"
          ref={idThreeRef}
        >
          Начинки
        </p>

        <CardList data={mainList} />
      </div>
    </section>
  );
}

export { BurgerIngredients };
