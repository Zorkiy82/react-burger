import React from "react";
import { AppHeader } from "./components/app-header/app-header.js";
import { IngredientCard } from "./components/ingredient-card/ingredient-card";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./styles.module.css";
import {initialData} from "./utils/data"

// import { Logo } from '@ya.praktikum/react-developer-burger-ui-components'

function App() {
  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>
        <section>
        <p className="text text_type_main-large mt-10 mb-5">Соберите бургер</p>
          <div style={{ display: "flex" }}>
            <Tab value="one" active="one">
              Булки
            </Tab>
            <Tab value="two" active="">
              Соусы
            </Tab>
            <Tab value="three" active="">
              Начинки
            </Tab>
          </div>

          <div className={ styles.ingridientsContainer }>
          <p className="text text_type_main-medium mt-10 mb-6">Булки</p>
          {initialData.map(item=><IngredientCard {...item} />)}


          {/* <IngredientCard {...initialData[0]} />
          <IngredientCard {...initialData[1]} />
          <IngredientCard {...initialData[2]} /> */}
          <p className="text text_type_main-medium mt-10 mb-6">Соусы</p>
          <p className="text text_type_main-medium mt-10 mb-6">Начинки</p>

          </div>
        </section>

        <section>
          <p>text</p>
          <p>text</p>
          <p>text</p>
          <p>text</p>
          <p>text</p>
          <p>text</p>
          <p>text</p>
          <p>text</p>
        </section>
      </main>
    </div>
  );
}

export default App;
