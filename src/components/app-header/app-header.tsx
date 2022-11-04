import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { checkAuth } from "../../utils/utils";
import { NavLink, Link, useLocation } from "react-router-dom";
import styles from "./app-header.module.css";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

function AppHeader() {
  const dispatch = useDispatch();
  const isAuthorized = useSelector((state: any) => state.profile.isAuthorized);
  useEffect(() => {
    checkAuth(dispatch, isAuthorized);
  });

  const { pathname } = useLocation();
  const { name } = useSelector((state: any) => state.profile.userData);

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
          to="/feed"
          className={`text text_type_main-default text_color_inactive ${styles.link}`}
          activeStyle={{
            color: "#F2F2F3",
          }}
        >
          <ListIcon
            type={
              pathname.includes("/feed/") || pathname.endsWith("/feed")
                ? "primary"
                : "secondary"
            }
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
        <ProfileIcon type={isAuthorized ? "success" : "secondary"} />

        <p className="ml-2">
          {!isAuthorized ? "Личный кабинет" : name ? name : "Личный кабинет"}
        </p>
      </NavLink>

      <Link to="/" className={styles.header_logo}>
        <Logo />
      </Link>
    </header>
  );
}

export { AppHeader };
