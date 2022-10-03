import React from "react";

import {
  Input,
  EditIcon,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
// import { Link, NavLink, useHistory, useLocation } from "react-router-dom";
import styles from "./profile-user.module.css";

export function ProfileUserPage() {
  return (
    <div>
      <form
        name="userDataForm"
        className={styles.form}
        // onSubmit={handleSubmit}
        method="POST"
      >
        <Input
          type={"text"}
          placeholder={"Имя"}
          icon={"EditIcon"}
          name={"name"}
          error={false}
          size={"default"}
        />

        <Input
          type={"email"}
          placeholder={"Логин"}
          icon={"EditIcon"}
          name={"email"}
          error={false}
          size={"default"}
        />

        <Input
          type={"password"}
          placeholder={"Пароль"}
          icon={"EditIcon"}
          name={"password"}
          error={false}
          size={"default"}
        />
      </form>
    </div>
  );
}
