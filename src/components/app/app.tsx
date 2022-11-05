import { useEffect } from "react";
import { checkAuth } from "../../utils/utils";
import { Switch, Route, useLocation, useHistory } from "react-router-dom";
import { HomePage } from "../../pages/home/home";
import { LoginPage } from "../../pages/login/login";
import { RegisterPage } from "../../pages/register/register";
import { ForgotPasswordPage } from "../../pages/forgot-password/forgot-password";
import { ResetPasswordPage } from "../../pages/reset-password/reset-password";
import { ProfilePage } from "../../pages/profile/profile";
import { FeedPage } from "../../pages/feed/feed";
import { OrderReceiptPage } from "../../pages/order-receipt/order-receipt";
import { IngredientPage } from "../../pages/ingredient/ingredient";
import { NotFound404Page } from "../../pages/not-found-404/not-found-404";
import { useSelector, useDispatch } from "react-redux";
import { AppHeader } from "../app-header/app-header";
import { Modal } from "../modal/modal";
import { ErrorDetails } from "../error-details/error-details";
import { OrderDetails } from "../order-details/order-details";
import { getIngredientsData } from "../../services/actions/app.js";
import { RESET_MODAL_DATA } from "../../services/constants";
import styles from "./styles.module.css";

const App = () => {
  const dispatch: any = useDispatch();
  const isAuthorized = useSelector((state: any) => state.profile.isAuthorized);
  useEffect(() => {
    checkAuth(dispatch, isAuthorized);
  });

  const location: any = useLocation();
  const history = useHistory();
  const background: any = location.state && location.state.background;

  const { itemsRequest } = useSelector((state: any) => state.ingredients);

  const { modalIsVisible, modalType, errorData } = useSelector(
    (state: any) => state.modal
  );

  const { orderData } = useSelector((state: any) => state.orderElement);

  useEffect(() => {
    if (itemsRequest) {
      dispatch(getIngredientsData());
    }
  }, [itemsRequest, dispatch]);

  const getModalContent = (): any => {
    switch (modalType) {
      case "error": {
        return <ErrorDetails {...errorData} />;
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

  function back() {
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
          <Route path="/feed">
            <FeedPage />
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
      {background && (
        <Route path="/feed/:id">
          <Modal onClose={back}>
            <OrderReceiptPage />
          </Modal>
        </Route>
      )}
      {background && (
        <Route path="/profile/orders/:id">
          <Modal onClose={back}>
            <OrderReceiptPage />
          </Modal>
        </Route>
      )}
    </div>
  );
}

export default App;
