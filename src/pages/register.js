import React from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./register.module.css";

export function RegisterPage() {
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
      <p className="text text_type_main-medium">Регистрация</p>
      <spacer className="pt-6" />
      <Input
        type={"text"}
        placeholder={"Имя"}
        onChange={handleOnChange}
        name={"name"}
        value = {state && state.name ? state.name : ""}
        error={false}
        size={"default"}
      />
      <spacer className="pt-6" />
      <Input
        type={"email"}
        onChange={handleOnChange}
        placeholder={"E-mail"}
        name={"email"}
        value = {state && state.email ? state.email : ""}
        error={false}
        size={"default"}
      />
      <spacer className="pt-6" />
      <Input
        type={"password"}
        onChange={handleOnChange}
        placeholder={"Пароль"}
        name={"password"}
        value = {state && state.password ? state.password : ""}
        icon={"ShowIcon"}
        // onIconClick={onIconClick}
        error={false}
        size={"default"}
      />
      <spacer className="pt-6" />

      <Button type="primary" size="medium">
        Зарегистрироваться
      </Button>

      <p className="text text_type_main-default text_color_inactive mt-20">
        Уже зарегистрированы?{" "}
        <Link className={styles.link} to="/login">
          Войти
        </Link>
      </p>
    </div>
  );
}
