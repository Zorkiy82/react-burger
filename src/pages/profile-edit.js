import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { getCookie } from "../utils/utils";
import { getUserData } from "../services/actions/user";

export function ProfileEditPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { pathname, state } = useLocation();
  const {name, email} = useSelector((storege) => storege.user.userData );

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

  useEffect(() => {
    const accessToken = getCookie("accessToken");
    dispatch(getUserData(history, pathname, accessToken));
  }, [history, pathname]);

  function handleSubmit(evt) {
    evt.preventDefault();
    console.log(state);

    // alert("submit");
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
              pathname: "/profile",
              state: {
                ...state,
                name: name,
                email: email,
                password: "",
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
