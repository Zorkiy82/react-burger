import React from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./login.module.css";

export function LoginPage() {
  const history = useHistory();
  const { pathname, state } = useLocation();

  function handleOnChange(evt) {
    const key = evt.target.name;
    const value = evt.target.value;

    history.replace({
      pathname: pathname,
      state: {
        ...state,
        [key]: value,
      },
    });
  }

  return (
    <div className={styles.container}>
      <p className="text text_type_main-medium">Вход</p>
      <spacer className="pt-6" />
      <Input
        type={"email"}
        placeholder={"E-mail"}
        name={"email"}
        value = {state && state.email ? state.email : ""}
        error={false}
        size={"default"}
        onChange={handleOnChange}
      />
      <spacer className="pt-6" />
      <Input
        type={"password"}
        placeholder={"Пароль"}
        name={"password"}
        value = {state && state.password ? state.password : ""}
        icon={"ShowIcon"}
        // onIconClick={onIconClick}
        error={false}
        size={"default"}
        onChange={handleOnChange}
      />
      <spacer className="pt-6" />

      <Button type="primary" size="medium">
        Войти
      </Button>

      <p className="text text_type_main-default text_color_inactive mt-20">
        Вы — новый пользователь?{" "}
        <Link className={styles.link} to="/register">
          Зарегистрироваться
        </Link>
      </p>
      <p className="text text_type_main-default text_color_inactive mt-4">
        Забыли пароль?{" "}
        <Link className={styles.link} to="/forgot-password">
          Восстановить пароль
        </Link>
      </p>
    </div>
  );
}
