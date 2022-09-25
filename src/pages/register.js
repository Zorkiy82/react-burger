import React from "react";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./register.module.css";

export function RegisterPage() {
  return (
    <div className={styles.container}>
      <p className="text text_type_main-medium">Регистрация</p>
      <spacer className="pt-6" />
      <Input
        type={"text"}
        placeholder={"Имя"}
        name={"name"}
        error={false}
        size={"default"}
      />
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
      Зарегистрироваться
      </Button>

      <p className="text text_type_main-default text_color_inactive mt-20">
      Уже зарегистрированы?{" "}
        <a className={styles.link} href="/login">
          Войти
        </a>
      </p>

    </div>
  );
}
