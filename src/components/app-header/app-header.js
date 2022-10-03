import React, { useMemo } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { getCookie } from "../../utils/utils";
import styles from "./app-header.module.css";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

function AppHeader() {
  const { pathname } = useLocation();
  // const userIconType = useMemo(() => {
  //   return getCookie("accessToken") ? "success" : "secondary";
  // });
  return (
    <header className={`pb-4 pt-4 ${styles.header}`}>
      <nav className={styles.header_linkContainer}>
        <NavLink
          exact
          to="/"
          className={`text text_type_main-default text_color_inactive ${styles.link}`}
          activeStyle={{
            color: "#F2F2F3",
          }}
        >
          <BurgerIcon type={pathname === "/" ? "primary" : "secondary"} />
          <p className="ml-2">Конструктор</p>
        </NavLink>

        <NavLink
          to="/order-list"
          className={`text text_type_main-default text_color_inactive ${styles.link}`}
          activeStyle={{
            color: "#F2F2F3",
          }}
        >
          <ListIcon
            type={pathname === "/order-list" ? "primary" : "secondary"}
          />
          <p className="ml-2">Лента заказов</p>
        </NavLink>
      </nav>

      <NavLink
        to="/profile"
        className={`text text_type_main-default text_color_inactive ${styles.link}`}
        activeStyle={{
          color: "#F2F2F3",
        }}
      >
        <ProfileIcon
          type={getCookie("accessToken") ? "success" : "secondary"}
        />

        <p className="ml-2">Личный кабинет</p>
      </NavLink>

      <div className={styles.header_logo}>
        <Logo />
      </div>
    </header>
  );
}

export { AppHeader };
