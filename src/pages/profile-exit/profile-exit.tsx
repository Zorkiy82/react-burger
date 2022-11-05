import { FC, FormEvent, useEffect } from "react";
import { useDispatch, useSelector } from "../../services/hooks";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { getCookie, deleteCookie } from "../../utils/utils";
import { checkAuth } from "../../utils/utils";

import styles from "./profile-exit.module.css";
import { Redirect } from "react-router-dom";
import { RESET_USER_DATA } from "../../services/constants/index";
import { logoutRequest } from "../../utils/burger-api";

export const ProfileExitPage: FC = () => {
  const dispatch = useDispatch();
  const isAuthorized = useSelector((state) => state.profile.isAuthorized);
  useEffect(() => {
    checkAuth(dispatch, isAuthorized);
  });

  function handleSubmit(evt: FormEvent) {
    evt.preventDefault();
    const refreshToken = getCookie("refreshToken");

    const signOut = async () => {
      if (typeof refreshToken === 'string') {
        await logoutRequest(refreshToken);
        dispatch({ type: RESET_USER_DATA });
        deleteCookie("refreshToken");
        deleteCookie("accessToken");
      }
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
