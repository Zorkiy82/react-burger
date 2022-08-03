import React from "react";
import styles from "./app-header.module.css";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { NavigationLink } from "../navigation-link/navigation-link";

class AppHeader extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <header className={`pb-4 pt-4 ${styles.header}`}>
        <div className={styles.header_linkContainer}>
          <NavigationLink icon={<BurgerIcon type="primary" />}>
            <p className="text text_type_main-default ml-2">Конструктор</p>
          </NavigationLink>
          <NavigationLink icon={<ListIcon type="secondary" />}>
            <p className="text text_type_main-default text_color_inactive ml-2">
              Лента заказов
            </p>
          </NavigationLink>
        </div>

        <NavigationLink icon={<ProfileIcon type="secondary" />}>
          <p className="text text_type_main-default text_color_inactive ml-2">
            Личный кабинет
          </p>
        </NavigationLink>
        <div className={styles.header_logo}>
          <Logo />
        </div>
      </header>
    );
  }
}

export { AppHeader };
