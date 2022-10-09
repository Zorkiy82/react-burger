import React, { useEffect, useRef, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import { checkAuth } from "../utils/utils";

import {
  Input,
  EditIcon,
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./profile-edit.module.css";
import { getCookie } from "../utils/utils";
import { getUserData, patchUserData } from "../services/actions/profile";

export function ProfileEditPage() {
  const dispatch = useDispatch();
  const isAuthorized = useSelector((state) => state.profile.isAuthorized);
  useEffect(() => {
    checkAuth(dispatch, isAuthorized);
  }, [dispatch, isAuthorized]);
  const history = useHistory();
  const [isСhanged, setIsChanged] = useState(false);
  const { pathname, state } = useLocation();
  const { name, email } = useSelector((storege) => storege.profile.userData);
  const fetchRan = useRef(false);

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

    setIsChanged(
      history.location.state.name !== name ||
        history.location.state.email !== email ||
        (history.location.state.password
          ? history.location.state.password.length > 0
          : false)
    );
  }

  useEffect(() => {
    // console.log(state);
    if (fetchRan.current === false || state === null) {
        checkAuth(dispatch, isAuthorized);
        const accessToken = getCookie("accessToken");
        dispatch(getUserData(history, pathname, accessToken));
      }

    return () => {
      fetchRan.current = true;
    };
  }, [history, pathname, state]);

  function handleSubmit(evt) {
    evt.preventDefault();

    checkAuth(dispatch, isAuthorized);
    const accessToken = getCookie("accessToken");

    dispatch(patchUserData(history, pathname, accessToken, state));
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

        {isСhanged && (
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
        )}
      </form>
    </div>
  );
}
