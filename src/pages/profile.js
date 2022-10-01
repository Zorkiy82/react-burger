import React from "react";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import { BrowserRouter as Switch, Route } from "react-router-dom";
import styles from "./profile.module.css";
import { ProfileUserPage } from "./profile-user";
import { ProfileОrderHistory } from "./profile-order-history";
import { ProfailExitPage } from "./profile-exit";
import { NotFound404Page } from "./not-found-404";

export function ProfilePage() {
  return (
    <div>
      <h2>Страница с настройками профиля пользователя ProfilePage</h2>
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

      <p>В этом разделе вы можете изменить свои персональные данные</p>

      <Switch>
        <Route path="/profile" exact={true}>
          <ProfileUserPage />
        </Route>
        <Route path="/profile/orders" exact={true}>
          <ProfileОrderHistory />
        </Route>
        <Route path="/profile/exit" exact={true}>
          <ProfailExitPage />
        </Route>
      </Switch>
    </div>
  );
}
