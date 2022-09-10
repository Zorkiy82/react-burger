import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { TabBar } from "../tab-bar/tab-bar.js";
import { CardList } from "../card-list/card-list.js";
import styles from "./burger-ingredients.module.css";
import { UPDATE_TAB_BAR_CURRENT } from "../../services/actions/app";

function BurgerIngredients() {
  const dispatch = useDispatch();
  let templateCurrent = "";

  const { items } = useSelector((state) => state.ingredients);

  const baseRef = React.useRef();
  const idOneRef = React.useRef();
  const idTwoRef = React.useRef();
  const idThreeRef = React.useRef();

  const bunList = React.useMemo(
    () => items.filter((item) => item.type === "bun"),
    [items]
  );

  const sauceList = React.useMemo(
    () => items.filter((item) => item.type === "sauce"),
    [items]
  );

  const mainList = React.useMemo(
    () => items.filter((item) => item.type === "main"),
    [items]
  );

  function handlerOnScroll(evt) {
    const baseY = baseRef.current.getBoundingClientRect().y;
    const idOneY = idOneRef.current.getBoundingClientRect().y;
    const idTwoY = idTwoRef.current.getBoundingClientRect().y;
    const idThreeY = idThreeRef.current.getBoundingClientRect().y;
    const itemArray = [
      {
        name: "one",
        item: Math.abs(baseY - idOneY),
      },
      {
        name: "two",
        item: Math.abs(baseY - idTwoY),
      },
      {
        name: "three",
        item: Math.abs(baseY - idThreeY),
      },
    ];

    itemArray.sort((a, b) => a.item - b.item);
    if (templateCurrent !== itemArray[0].name) {
      dispatch({
        type: UPDATE_TAB_BAR_CURRENT,
        current: itemArray[0].name,
      });
    }

    templateCurrent = itemArray[0].name;
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
