import React from "react";
import { AppHeader } from "./components/app-header/app-header.js";
import { BurgerIngredients } from "./components/burger-ingredients/burger-ingredients.js";
import { BurgerConstructor } from "./components/burger-constructor/burger-constructor.js";
import { Modal } from "./components/modal/modal.js";
import { ApiUrl } from "./utils/constants.js";
import styles from "./styles.module.css";

function App() {
  const [ingredientsDataArray, setIngredientsDataArray] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [hasError, sethasError] = React.useState(false);
  const [errorMesage, setErrorMesage] = React.useState("");
  const [erorrCode, setErorrCode] = React.useState(null);
  const [erorrUrl, setErorrUrl] = React.useState(null);
  const [modalIsVisible, setModalIsVisible] = React.useState(false);

  React.useEffect(() => {
    fetch(ApiUrl)
      .then(checkReponse)
      .then((data) => {
        setIsLoading(true);
        setIngredientsDataArray(data.data);
      })
      .catch((err) => {
        setIsLoading(false);
        sethasError(true);
        setErrorMesage(err);
        setModalIsVisible(true);
      });
  }, []);

  const checkReponse = (res) => {
    if (res.ok) {
      return res.json();
    } else {
      setErorrCode(res.status);
      setErorrUrl(res.url);
      return res.json().then((err) => Promise.reject(err));
    }
  };

  function handleCloseModal() {
    setModalIsVisible(false);
  }

  return (
    <div className={styles.app}>
      <AppHeader />
      {isLoading && !hasError && (
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

      {modalIsVisible && (
        <Modal onClose={handleCloseModal}>
          <div className="pt-10 pr-10 pb-10 pl-10">
            <p className="text text_type_main-large text_color_inactive">{`Ошибка ${erorrCode}`}</p>
            <p className="text text_type_main-default text_color_inactive mt-10">{`url: ${erorrUrl}`}</p>
            <p className="text text_type_main-default text_color_inactive mt-8">{`${errorMesage}`}</p>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default App;
