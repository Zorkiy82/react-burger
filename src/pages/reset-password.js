import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, useHistory, useLocation } from "react-router-dom";
import { checkAuth } from "../utils/utils";
import {
  Input,
  Button,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./reset-password.module.css";
import { postResetPasswordData } from "../services/actions/reset-password";

export function ResetPasswordPage() {
  const dispatch = useDispatch();
  const isAuthorized = useSelector((state) => state.profile.isAuthorized);
  useEffect(() => {
    checkAuth(dispatch, isAuthorized);
  }, [dispatch, isAuthorized]);

  const forgotSuccess = useSelector((state) => state.forgotPassword.forgotPasswordData.success);
  const resetSuccess = useSelector((state) => state.resetPassword.resetPasswordData.success);
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

  if (isAuthorized) {
    return <Redirect to={state?.from || "/"} />;
  }

  if (!forgotSuccess) {
    return <Redirect to={"/forgot-password"} />;
  }

  if (resetSuccess) {
    return <Redirect to={"/login"} />;
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
