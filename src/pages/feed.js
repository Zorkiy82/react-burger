import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import { FeedMainPage } from "./feed-main";
import { OrderReceiptPage } from "./order-receipt";

import {
  WS_CONNECTION_START,
  WS_CONNECTION_FINISH,
} from "../services/actions/wsActions";

export function FeedPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: WS_CONNECTION_START,
      payload: {
        add: "/all",
      },
    });

    return () => {
      dispatch({ type: WS_CONNECTION_FINISH });
    };
  }, []);

  return (
    <Switch>
      <Route path="/feed" exact={true}>
        <FeedMainPage />
      </Route>
      <Route path="/feed/:id">
        <OrderReceiptPage />
      </Route>
    </Switch>
  );
}
