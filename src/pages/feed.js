import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  WS_CONNECTION_START,
  WS_CONNECTION_FINISH,
} from "../services/actions/wsActions";

import { OrderFeed } from "../components/order-feed/order-feed";
import {
  Input,
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./feed.module.css";

export function FeedPage() {
  const dispatch = useDispatch();
  // const wsSocket = useRef({});
  const wsRun = useRef(false);
  const connect = useSelector((store) => store.ws.wsConnected);

  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START });

    return () => {
      dispatch({ type: WS_CONNECTION_FINISH });
    };
  }, []);

  return (
    <div className={styles.container}>
      <p className="text text_type_main-large mb-5">Лента заказов</p>

      <main className={styles.main}>{connect && <OrderFeed />}</main>
    </div>
  );
}
