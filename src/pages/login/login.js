import { useEffect } from "react";
import { checkAuth } from "../../utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, useHistory, useLocation } from "react-router-dom";
import {
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { postLoginData } from "../../services/actions/login";
import styles from "./login.module.css";

export function LoginPage() {
  const dispatch = useDispatch();
  const isAuthorized = useSelector((state) => state.profile.isAuthorized);
  useEffect(() => {
    checkAuth(dispatch, isAuthorized);
  });

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
    dispatch(postLoginData(history, pathname));
  }

  if (isAuthorized) {
    return <Redirect to={state?.from || "/"} />;
  }

  return (
    <div className={styles.container}>
      <p className="text text_type_main-medium mb-6">Вход</p>

      <form
        name="registerForm"
        className={styles.form}
        onSubmit={handleSubmit}
        method="POST"
      >
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
          Войти
        </Button>
      </form>

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
