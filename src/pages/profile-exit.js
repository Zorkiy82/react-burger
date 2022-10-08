// import React from "react";
import { useDispatch } from "react-redux";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { getCookie, deleteCookie } from "../utils/utils";

import styles from "./profile-exit.module.css";
import { Redirect } from "react-router-dom";
import { RESET_USER_DATA } from "../services/actions/profile";
import { logoutRequest } from "../utils/burger-api";
import { isAuth } from "../utils/utils";
import { useState } from "react";

export function ProfileExitPage() {
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(isAuth());
  // const history = useHistory();
  // const { pathname, state } = useLocation();

  function handleSubmit(evt) {
    evt.preventDefault();
    const refreshToken = getCookie("refreshToken");

    const signOut = async () => {
      await logoutRequest(refreshToken);
      dispatch({ type: RESET_USER_DATA });
      deleteCookie("refreshToken");
      deleteCookie("accessToken");
      setIsLogin(isAuth());
    };

    signOut();
  }

  if (!isLogin) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <form
        name="exitForm"
        className={styles.form}
        onSubmit={handleSubmit}
        method="POST"
      >
        <Button type="primary" size="medium" htmlType="submit">
          Выйти из профиля
        </Button>
      </form>
    </div>
  );
}
