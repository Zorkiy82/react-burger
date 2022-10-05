import React from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";

import {
  Input,
  EditIcon,
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
// import { Link, NavLink, useHistory, useLocation } from "react-router-dom";
import styles from "./profile-edit.module.css";

export function ProfileEditPage() {
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
    alert('submit')
    // dispatch(postRegisterData(history, pathname));
  }
  return (
    <div>
      <form
        name="editForm"
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
          placeholder={"Логин"}
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
        <div className={styles.container}>
          <Link
            className={`text text_type_main-default ${styles.link}`}
            to={{
              pathname: pathname,
              state: {
                name: "Kolya",
                email: "Kolya@ya.ya",
                password: "777",
              },
            }}
          >
            Отмена
          </Link>

          <Button type="primary" size="medium" htmlType="submit">
            Сохранить
          </Button>
        </div>
      </form>
    </div>
  );
}
