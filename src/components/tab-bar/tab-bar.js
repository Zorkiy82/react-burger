import React from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./tab-bar.module.css";

function TabBar() {
  const [current, setCurrent] = React.useState("one");
  window.location.href = `#${current}`;
  return (
    <div className={styles.tabBarContainer}>
      <Tab value="one" active={current === "one"} onClick={setCurrent}>
        Булки
      </Tab>
      <Tab value="two" active={current === "two"} onClick={setCurrent}>
        Соусы
      </Tab>
      <Tab value="three" active={current === "three"} onClick={setCurrent}>
        Начинки
      </Tab>
    </div>
  );
}

export { TabBar };
