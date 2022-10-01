import React from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import {
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./forgot-password.module.css";

export function ForgotPasswordPage() {
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
    console.log(history.location.state);
    // dispatch(postRegisterData(history, pathname));
  }

  return (
    <div className={styles.container}>
      <p className="text text_type_main-medium mb-6">Восстановление пароля</p>

      <form
        name="forgotPasswordForm"
        className={styles.form}
        onSubmit={handleSubmit}
        method="POST"
      >
        <EmailInput
          onChange={handleOnChange}
          name={"email"}
          value={state && state.email ? state.email : ""}
          placeholder={"Укажите E-mail"}
          size={"default"}
        />

        <Button type="primary" size="medium" htmlType="submit">
          Восстановить
        </Button>
      </form>

      <p className="text text_type_main-default text_color_inactive mt-20">
        Вспомнили пароль?{" "}
        <Link className={styles.link} to="/login">
          Войти
        </Link>
      </p>
    </div>
  );
}
