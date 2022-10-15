import React, { useEffect } from "react";
import { checkAuth } from "../../utils/utils";
import { Switch, Route, useLocation, useHistory } from "react-router-dom";
import { HomePage } from "../../pages/home";
import { LoginPage } from "../../pages/login";
import { RegisterPage } from "../../pages/register";
import { ForgotPasswordPage } from "../../pages/forgot-password";
import { ResetPasswordPage } from "../../pages/reset-password";
import { ProfilePage } from "../../pages/profile";
import { OrderListPage } from "../../pages/order-list";
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
  RESET_MODAL_DATA,
} from "../../services/actions/app.js";
import styles from "./styles.module.css";

function App() {
  const dispatch = useDispatch();
  const isAuthorized = useSelector((state) => state.profile.isAuthorized);
  useEffect(() => {
    checkAuth(dispatch, isAuthorized);
  }, [dispatch, isAuthorized]);

  const location = useLocation();
  const history = useHistory();
  const background = location.state && location.state.background;

  const { itemsRequest } = useSelector((state) => state.ingredients);

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

  function back(evt) {
    // evt.stopPropagation();
    history.goBack();
  }

  return (
    <div className={styles.app}>
      <AppHeader />
      <div className={styles.main}>
        <Switch location={background || location}>
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
          <Route path="/profile">
            <ProfilePage />
          </Route>
          <Route path="/order-list" exact={true}>
            <OrderListPage />
          </Route>
          <Route path="/ingredients/:id" exact={true}>
            <IngredientPage />
          </Route>
          <Route>
            <NotFound404Page />
          </Route>
        </Switch>
      </div>

      {modalIsVisible && (
        <Modal onClose={handleCloseModal}>{getModalContent()}</Modal>
      )}
      {background && (
        <Route path="/ingredients/:id">
          <Modal onClose={back}>
            <IngredientPage />
          </Modal>
        </Route>
      )}
    </div>
  );
}

export default App;
