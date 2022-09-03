import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { AppHeader } from "../app-header/app-header.js";
import { BurgerIngredients } from "../burger-ingredients/burger-ingredients.js";
import { BurgerConstructor } from "../burger-constructor/burger-constructor.js";
import { Modal } from "../modal/modal.js";
import { getIngredients } from "../../utils/burger-api.js";
import { ConstructorItemsContext } from "../../services/constructor-context.js";
import { BurgerIngredientsContext } from "../../services/app-context.js";
import { defaultConstructorItems } from "../../utils/constants.js";
import { ErrorDetails } from "../error-details/error-details.js";
import { getIngredientsData } from "../../services/actions/app.js";
import styles from "./styles.module.css";

function reducer(state, action) {

  switch (action.type) {
    case "default":
      return { ...defaultConstructorItems };

    case "random": {
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
  const dispatch = useDispatch();
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
    dispatch(getIngredientsData());
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
              <BurgerIngredients />

              <BurgerConstructor />
            </main>
          </ConstructorItemsContext.Provider>
        </BurgerIngredientsContext.Provider>
      )}

      {modalIsVisible && (
        <Modal onClose={handleCloseModal}>
          <ErrorDetails {...erorrData} />
        </Modal>
      )}
    </div>
  );
}

export default App;
