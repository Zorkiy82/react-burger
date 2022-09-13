import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./tab-bar.module.css";
import { SET_TAB_BAR_CURRENT } from "../../services/actions/app";

function TabBar() {
  const dispatch = useDispatch();

  const { current } = useSelector((state) => state.tabBar);

  function handlerOnClick(value) {
    document.querySelector(`#${value}`).scrollIntoView({ behavior: "smooth" });
    dispatch({
      type: SET_TAB_BAR_CURRENT,
      current: value,
    });
  }

  return (
    <div className={styles.tabBarContainer}>
      <Tab value="one" active={current === "one"} onClick={handlerOnClick}>
        Булки
      </Tab>
      <Tab value="two" active={current === "two"} onClick={handlerOnClick}>
        Соусы
      </Tab>
      <Tab value="three" active={current === "three"} onClick={handlerOnClick}>
        Начинки
      </Tab>
    </div>
  );
}

export { TabBar };
