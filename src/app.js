import React from "react";
import { AppHeader } from "./components/app-header/app-header.js";
import { BurgerIngredients } from "./components/burger-ingredients/burger-ingredients.js";
import { BurgerConstructor } from "./components/burger-constructor/burger-constructor.js";
import { ApiUrl } from "./utils/constants.js";
import styles from "./styles.module.css";

function App() {
  const [ingredientsDataArray, setIngredientsDataArray] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [hasError, sethasError] = React.useState(false);

  React.useEffect(() => {
    setIsLoading(true);

    fetch(ApiUrl)
      .then((res) => res.json())
      .then((data) => {
        setIngredientsDataArray(data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        sethasError(true);

        alert(err);
      });
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      {!isLoading && !hasError && (
        <main className={styles.main}>
          <section>
            <p className="text text_type_main-large mt-10 mb-5">
              Соберите бургер
            </p>

            <BurgerIngredients initialData={ingredientsDataArray} />
          </section>

          <section className="pl-4">
            <BurgerConstructor
              {...{
                top: ingredientsDataArray[0],
                main: ingredientsDataArray.filter(
                  (item) => item.type !== "bun"
                ),
                bottom: ingredientsDataArray[0],
              }}
            />
          </section>
        </main>
      )}
    </div>
  );
}

export default App;
