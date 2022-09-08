import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useSelector, useDispatch } from "react-redux";
import { AppHeader } from "../app-header/app-header.js";
import { BurgerIngredients } from "../burger-ingredients/burger-ingredients.js";
import { BurgerConstructor } from "../burger-constructor/burger-constructor.js";
import { Modal } from "../modal/modal.js";
import { ErrorDetails } from "../error-details/error-details.js";
import { IngredientDetails } from "../ingredient-details/ingredient-details.js";
import { OrderDetails } from "../order-details/order-details.js";
import {
  getIngredientsData,
  GET_CONSTRUCTOR_LIST_RANDOM,
  RESET_MODAL_DATA,
} from "../../services/actions/app.js";
import styles from "./styles.module.css";

function App() {
  const dispatch = useDispatch();

  const { items, itemsRequest, itemsFailed } = useSelector(
    (state) => state.ingredients
  );

  const { modalIsVisible, modalType, errorData } = useSelector(
    (state) => state.modal
  );

  const { ingredientData } = useSelector((state) => state.viewedIngredient);
  const { orderData } = useSelector((state) => state.orderElement);

  React.useEffect(() => {
    if (itemsRequest) {
      dispatch(getIngredientsData());
    }
  }, [itemsRequest, dispatch]);

  React.useEffect(() => {
    if (!itemsRequest) {
      dispatch({
        type: GET_CONSTRUCTOR_LIST_RANDOM,
        ingredientsData: items,
      });
    }
  }, [items, itemsRequest, dispatch]);

  function getModalContent() {
    switch (modalType) {
      case "error": {
        return <ErrorDetails {...errorData} />;
      }
      case "ingredient": {
        return <IngredientDetails {...ingredientData} />;
      }
      case "order": {
        return <OrderDetails number={orderData.order.number} />;
      }
      default: {
        return null;
      }
    }
  }

  function handleCloseModal() {
    dispatch({ type: RESET_MODAL_DATA });
  }

  return (
    <div className={styles.app}>
      <AppHeader />
      {!itemsRequest && !itemsFailed && (
        <DndProvider backend={HTML5Backend}>
          <main className={styles.main}>
            <BurgerIngredients />

            <BurgerConstructor />
          </main>
        </DndProvider>
      )}

      {modalIsVisible && (
        <Modal onClose={handleCloseModal}>{getModalContent()}</Modal>
      )}
    </div>
  );
}

export default App;
