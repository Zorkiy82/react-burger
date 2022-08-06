import React from "react";
import { AppHeader } from "./components/app-header/app-header.js";
import { BurgerIngredients } from "./components/burger-ingredients/burger-ingredients.js";
import { BurgerConstructor } from "./components/burger-constructor/burger-constructor.js";
import styles from "./styles.module.css";
import { initialData } from "./utils/data";

let mainArr = initialData.filter((item) => item.type !== "bun");

function App() {
  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>
        <section>
          <p className="text text_type_main-large mt-10 mb-5">
            Соберите бургер
          </p>

          <BurgerIngredients initialData={initialData} />
        </section>

        <section className="pl-4">
          <BurgerConstructor
            {...{
              top: initialData[0],
              main: mainArr,
              bottom: initialData[0],
            }}
          />
        </section>
      </main>
    </div>
  );
}

export default App;
