import React from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import {
  Input,
  Button,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./reset-password.module.css";
import { postResetPasswordData } from "../services/actions/reset-password";

export function ResetPasswordPage() {
  const dispatch = useDispatch();
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

  function handleSubmit(evt) {
    evt.preventDefault();
    dispatch(postResetPasswordData(history, pathname));
  }

  return (
    <div className={styles.container}>
      <p className="text text_type_main-medium mb-6">Восстановление пароля</p>

      <form
        name="resetPasswordForm"
        className={styles.form}
        onSubmit={handleSubmit}
        method="POST"
      >
        <PasswordInput
          onChange={handleOnChange}
          name={"password"}
          value={state && state.password ? state.password : ""}
          size={"default"}
          required
        />

        <Input
          type={"text"}
          placeholder={"Введите код из письма"}
          name={"token"}
          value={state && state.token ? state.token : ""}
          error={false}
          size={"default"}
          onChange={handleOnChange}
        />

        <Button type="primary" size="medium" htmlType="submit">
          Сохранить
        </Button>
      </form>

      <p className="text text_type_main-default text_color_inactive mt-20">
        Вспомнили пароль?{" "}
        <Link className={styles.link} href="/login">
          Войти
        </Link>
      </p>
    </div>
  );
}
