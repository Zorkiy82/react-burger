import { useEffect } from "react";
import { useDispatch, useSelector } from "../../services/hooks";
import { checkAuth } from "../../utils/utils";
import { Link, Redirect, useHistory, useLocation } from "react-router-dom";
import {
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./forgot-password.module.css";
import { postForgotPasswordData } from "../../services/actions/forgot-password";

export function ForgotPasswordPage() {
  const dispatch = useDispatch();
  const isAuthorized = useSelector((state) => state.profile.isAuthorized);
  useEffect(() => {
    checkAuth(isAuthorized);
  });

  const history = useHistory();
  const { pathname, state } = useLocation<any>();

  function handleOnChange(evt: any) {
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

  function handleSubmit(evt: any) {
    evt.preventDefault();
    dispatch(postForgotPasswordData(history, pathname));
  }

  if (isAuthorized) {
    return <Redirect to={state?.from || "/"} />;
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
