import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { getCookie, deleteCookie } from "../../utils/utils";
import { checkAuth } from "../../utils/utils";

import styles from "./profile-exit.module.css";
import { Redirect } from "react-router-dom";
import { RESET_USER_DATA } from "../../services/actions/profile";
import { logoutRequest } from "../../utils/burger-api";

export function ProfileExitPage() {
  const dispatch = useDispatch();
  const isAuthorized = useSelector((state) => state.profile.isAuthorized);
  useEffect(() => {
    checkAuth(dispatch, isAuthorized);
  });

  function handleSubmit(evt) {
    evt.preventDefault();
    const refreshToken = getCookie("refreshToken");

    const signOut = async () => {
      await logoutRequest(refreshToken);
      dispatch({ type: RESET_USER_DATA });
      deleteCookie("refreshToken");
      deleteCookie("accessToken");
    };

    signOut();
  }

  if (!isAuthorized) {
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
