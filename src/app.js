import React from "react";
import { AppHeader } from "./components/app-header/app-header.js";
import { BurgerIngredients } from "./components/burger-ingredients/burger-ingredients.js";
import { BurgerConstructor } from "./components/burger-constructor/burger-constructor.js";
import { Modal } from "./components/modal/modal.js";
import { getIngredients } from "./utils/burger-api.js";
import { ConstructorItemsContext } from "./services/constructor-context.js";
import { BurgerIngredientsContext } from "./services/app-context.js";
import { defaultConstructorItems } from "./utils/constants.js";
import styles from "./styles.module.css";

function reducer(state, action) {
  switch (action.type) {
    case "default":
      return { ...defaultConstructorItems };

    case "random": {
      // console.log(action.ingredientsData)
      const bunIngredientArray = action.ingredientsData.filter(
        (item) => item.type === "bun"
      );
      const notBunIngredientArray = action.ingredientsData.filter(
        (item) => item.type !== "bun"
      );
      const numberOfOtherIngredients = Math.round(Math.random() * 7 + 1);
      const otherIngredientsArray = [];

      const bunIngredient =
        bunIngredientArray[
          Math.round(Math.random() * (bunIngredientArray.length - 1))
        ];

      for (let i = 1; i <= numberOfOtherIngredients; ++i) {
        const rnd = Math.round(
          Math.random() * (notBunIngredientArray.length - 1)
        );
        otherIngredientsArray.push(notBunIngredientArray[rnd]);
      }
      return {
        bun: bunIngredient,
        main: otherIngredientsArray,
      };
    }

    default:
      throw new Error(`Wrong type of action: ${action.type}`);
  }
}

function App() {
  const [ingredientsDataArray, setIngredientsDataArray] = React.useState([]);

  const [constructorItemsState, constructorItemsDispatcher] = React.useReducer(
    reducer,
    { bun: {}, main: [] },
    undefined
  );

  const [isLoading, setIsLoading] = React.useState(false);
  const [modalIsVisible, setModalIsVisible] = React.useState(false);
  const [hasError, sethasError] = React.useState(false);
  const [erorrData, setErorrData] = React.useState({
    mesage: null,
    code: null,
    url: null,
  });

  React.useEffect(() => {
    getIngredients()
      .then((data) => {
        setIsLoading(true);
        constructorItemsDispatcher({
          type: "random",
          ingredientsData: data.data,
        });
        setIngredientsDataArray(data.data);
      })
      .catch((res) => {
        setIsLoading(false);
        sethasError(true);
        setErorrData({
          mesage: res.statusText,
          code: res.status,
          url: res.url,
        });
        setModalIsVisible(true);
      });
  }, []);

  function handleCloseModal() {
    setModalIsVisible(false);
  }

  return (
    <div className={styles.app}>
      <AppHeader />
      {isLoading && !hasError && (
        <BurgerIngredientsContext.Provider
          value={{ ingredientsDataArray, setIngredientsDataArray }}
        >
          <ConstructorItemsContext.Provider
            value={{ constructorItemsState, constructorItemsDispatcher }}
          >
            <main className={styles.main}>
              <section>
                <p className="text text_type_main-large mt-10 mb-5">
                  Соберите бургер
                </p>

                <BurgerIngredients initialData={ingredientsDataArray} />
              </section>

              <section className="pl-4">
                <BurgerConstructor />
              </section>
            </main>
          </ConstructorItemsContext.Provider>
        </BurgerIngredientsContext.Provider>
      )}

      {modalIsVisible && (
        <Modal onClose={handleCloseModal}>
          <div className="pt-10 pr-10 pb-10 pl-10">
            <p className="text text_type_main-large text_color_inactive">{`Ошибка ${erorrData.code}`}</p>
            <p className="text text_type_main-default text_color_inactive mt-10">{`url: ${erorrData.url}`}</p>
            <p className="text text_type_main-default text_color_inactive mt-8">{`${erorrData.mesage}`}</p>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default App;
