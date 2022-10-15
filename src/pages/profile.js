import React, { useMemo } from "react";
import { NavLink, Switch, Route, useLocation } from "react-router-dom";
import styles from "./profile.module.css";
import { ProfileEditPage } from "./profile-edit";
import { ProfileОrderHistoryPage } from "./profile-order-history";
import { ProfileExitPage } from "./profile-exit";
import { ProtectedRoute } from "../components/protected-route/protected-route";

export function ProfilePage() {
  const { pathname } = useLocation();

  const textContent = useMemo(() => {
    switch (pathname) {
      case "/profile": {
        return "В этом разделе вы можете изменить свои персональные данные";
      }
      case "/profile/orders": {
        return "В этом разделе вы можете просмотреть свою историю заказов";
      }
      case "/profile/exit": {
        return "В этом разделе вы можете выйти из профиля";
      }
      default: {
        return null;
      }
    }
  }, [pathname]);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.leftColumn}>
        <nav className={styles.nav}>
          <NavLink
            exact
            to="/profile"
            className={`text text_type_main-medium text_color_inactive ${styles.link}`}
            activeStyle={{
              color: "#F2F2F3",
            }}
          >
            Профиль
          </NavLink>

          <NavLink
            exact
            to="/profile/orders"
            className={`text text_type_main-medium text_color_inactive ${styles.link}`}
            activeStyle={{
              color: "#F2F2F3",
            }}
          >
            История заказов
          </NavLink>

          <NavLink
            exact
            to="/profile/exit"
            className={`text text_type_main-medium text_color_inactive ${styles.link}`}
            activeStyle={{
              color: "#F2F2F3",
            }}
          >
            Выход
          </NavLink>
        </nav>

        <p
          className="text text_type_main-default text_color_inactive mt-20"
          style={{ opacity: "0.4" }}
        >
          {textContent}
        </p>
      </div>
      <div className={styles.rightColumn}>
        <Switch>
          <ProtectedRoute path="/profile" exact={true}>
            <ProfileEditPage />
          </ProtectedRoute>
          <ProtectedRoute path="/profile/orders" exact={true}>
            <ProfileОrderHistoryPage />
          </ProtectedRoute>
          <ProtectedRoute path="/profile/exit" exact={true}>
            <ProfileExitPage />
          </ProtectedRoute>
        </Switch>
      </div>
    </div>
  );
}