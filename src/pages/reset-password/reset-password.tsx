import { FC, FormEvent, useEffect } from "react";
import { useDispatch, useSelector } from "../../services/hooks";
import { Link, Redirect, useHistory, useLocation } from "react-router-dom";
import { checkAuth } from "../../utils/utils";
import {
  Input,
  Button,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./reset-password.module.css";
import { postResetPasswordData } from "../../services/actions/reset-password";

export const ResetPasswordPage: FC = () => {
  const dispatch = useDispatch();
  const isAuthorized = useSelector((state) => state.profile.isAuthorized);
  useEffect(() => {
    checkAuth(dispatch, isAuthorized);
  });

  const forgotSuccess = useSelector(
    (state: any) => state.forgotPassword.forgotPasswordData.success
  );
  const resetSuccess = useSelector(
    (state: any) => state.resetPassword.resetPasswordData.success
  );
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

  function handleSubmit(evt: FormEvent) {
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
        <Link className={styles.link} to="/login">
          Войти
        </Link>
      </p>
    </div>
  );
}
