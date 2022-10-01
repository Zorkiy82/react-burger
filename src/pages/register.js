import React from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import {
  Input,
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./register.module.css";
import { postRegisterData } from "../services/actions/register";

export function RegisterPage() {
  const history = useHistory();
  const dispatch = useDispatch();
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
    dispatch(postRegisterData(history, pathname));
  }

  return (
    <div className={styles.container}>
      <p className="text text_type_main-medium mb-6">Регистрация</p>

      <form
        name="registerForm"
        className={styles.form}
        onSubmit={handleSubmit}
        method="POST"
      >
        <Input
          type={"text"}
          placeholder={"Имя"}
          onChange={handleOnChange}
          name={"name"}
          error={false}
          value={state && state.name ? state.name : ""}
          size={"default"}
        />

        <EmailInput
          onChange={handleOnChange}
          name={"email"}
          value={state && state.email ? state.email : ""}
          size={"default"}
        />

        <PasswordInput
          onChange={handleOnChange}
          name={"password"}
          value={state && state.password ? state.password : ""}
          size={"default"}
          required
        />

        <Button type="primary" size="medium" htmlType="submit">
          Зарегистрироваться
        </Button>
      </form>

      <p className="text text_type_main-default text_color_inactive mt-20">
        Уже зарегистрированы?{" "}
        <Link className={styles.link} to="/login">
          Войти
        </Link>
      </p>
    </div>
  );
}
