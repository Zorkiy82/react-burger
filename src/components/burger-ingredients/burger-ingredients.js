import React from "react";
import { TabBar } from "../tab-bar/tab-bar.js";
import { CardList } from "../card-list/card-list.js";
import { BurgerIngredientsContext } from "../../services/app-context.js";
import styles from "./burger-ingredients.module.css";

function BurgerIngredients() {
  const { ingredientsDataArray } = React.useContext(BurgerIngredientsContext);

  const bunList = ingredientsDataArray.filter((value) => value.type === "bun");

  const sauceList = ingredientsDataArray.filter(
    (value) => value.type === "sauce"
  );

  const mainList = ingredientsDataArray.filter(
    (value) => value.type === "main"
  );

  return (
    <section>
      <p className="text text_type_main-large mt-10 mb-5">Соберите бургер</p>
      <TabBar />

      <div className={styles.scrollbarContainer}>
        <p className="text text_type_main-medium mt-10 mb-6" id="one">
          Булки
        </p>

        <CardList data={bunList} />

        <p className="text text_type_main-medium mt-10 mb-6" id="two">
          Соусы
        </p>

        <CardList data={sauceList} />

        <p className="text text_type_main-medium mt-10 mb-6" id="three">
          Начинки
        </p>

        <CardList data={mainList} />
      </div>
    </section>
  );
}

export { BurgerIngredients };
