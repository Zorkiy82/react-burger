import React from "react";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./login.module.css";

export function LoginPage() {
  return (
    <div className={styles.container}>
      <p className="text text_type_main-medium">Вход</p>
      <spacer className="pt-6" />
      <Input
        type={"email"}
        placeholder={"E-mail"}
        name={"name"}
        error={false}
        size={"default"}
      />
      <spacer className="pt-6" />
      <Input
        type={"password"}
        placeholder={"Пароль"}
        name={"name"}
        icon={"ShowIcon"}
        // onIconClick={onIconClick}
        error={false}
        size={"default"}
      />
      <spacer className="pt-6" />

      <Button type="primary" size="medium">
        Войти
      </Button>

      <p className="text text_type_main-default text_color_inactive mt-20">
        Вы — новый пользователь?{" "}
        <a className={styles.link} href="/register">
          Зарегистрироваться
        </a>
      </p>
      <p className="text text_type_main-default text_color_inactive mt-4">
        Забыли пароль?{" "}
        <a className={styles.link} href="/forgot-password">
          Восстановить пароль
        </a>
      </p>
    </div>
  );
}
