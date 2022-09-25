import React from "react";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./reset-password.module.css";

export function ResetPasswordPage() {
  return (
    <div className={styles.container}>
      <p className="text text_type_main-medium">Восстановление пароля</p>
      <spacer className="pt-6" />

      <Input
        type={"password"}
        placeholder={"Введите новый пароль"}
        name={"name"}
        icon={"ShowIcon"}
        // onIconClick={onIconClick}
        error={false}
        size={"default"}
      />

      <spacer className="pt-6" />

      <Input
        type={"text"}
        placeholder={"Введите код из письма"}
        name={"name"}
        error={false}
        size={"default"}
      />

      <spacer className="pt-6" />

      <Button type="primary" size="medium">
      Сохранить
      </Button>

      <p className="text text_type_main-default text_color_inactive mt-20">
        Вспомнили пароль?{" "}
        <a className={styles.link} href="/login">
          Войти
        </a>
      </p>
    </div>
  );
}
