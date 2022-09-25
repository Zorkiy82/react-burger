import React from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./reset-password.module.css";

export function ResetPasswordPage() {
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
      <p className="text text_type_main-medium">Восстановление пароля</p>
      <spacer className="pt-6" />

      <Input
        type={"password"}
        placeholder={"Введите новый пароль"}
        name={"password"}
        value = {state && state.password ? state.password : ""}
        icon={"ShowIcon"}
        // onIconClick={onIconClick}
        error={false}
        size={"default"}
        onChange={handleOnChange}
      />

      <spacer className="pt-6" />

      <Input
        type={"text"}
        placeholder={"Введите код из письма"}
        name={"token"}
        value = {state && state.token ? state.token : ""}
        error={false}
        size={"default"}
        onChange={handleOnChange}
      />

      <spacer className="pt-6" />

      <Button type="primary" size="medium">
      Сохранить
      </Button>

      <p className="text text_type_main-default text_color_inactive mt-20">
        Вспомнили пароль?{" "}
        <Link className={styles.link} href="/login">
          Войти
        </Link>
      </p>
    </div>
  );
}
