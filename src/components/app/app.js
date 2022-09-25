import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { HomePage } from "../../pages/home";
import { LoginPage } from "../../pages/login";
import { RegisterPage } from "../../pages/register";
import { ForgotPasswordPage } from "../../pages/forgot-password";
import { ResetPasswordPage } from "../../pages/reset-password";
import { ProfilePage } from "../../pages/profile";
import { IngredientPage } from "../../pages/ingredient";
import { NotFound404Page } from "../../pages/not-found-404";
import { useSelector, useDispatch } from "react-redux";
import { AppHeader } from "../app-header/app-header.js";
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
  useEffect(() => {
    if (itemsRequest) {
      dispatch(getIngredientsData());
    }
  }, [itemsRequest, dispatch]);
  useEffect(() => {
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
      <div className={styles.main}>
        <Router>
          <Switch>
            <Route path="/" exact={true}>
              <HomePage />
            </Route>
            <Route path="/login" exact={true}>
              <LoginPage />
            </Route>
            <Route path="/register" exact={true}>
              <RegisterPage />
            </Route>
            <Route path="/forgot-password" exact={true}>
              <ForgotPasswordPage />
            </Route>
            <Route path="/reset-password" exact={true}>
              <ResetPasswordPage />
            </Route>
            <Route path="/profile" exact={true}>
              <ProfilePage />
            </Route>
            <Route path="/ingredients/:id" exact={true}>
              <IngredientPage />
            </Route>
            <Route>
              <NotFound404Page />
            </Route>
          </Switch>
        </Router>
      </div>

      {modalIsVisible && (
        <Modal onClose={handleCloseModal}>{getModalContent()}</Modal>
      )}
    </div>
  );
}

export default App;
