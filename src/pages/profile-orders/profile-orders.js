import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route } from "react-router-dom";
import { getCookie } from "../../utils/utils";
import { ProfileOrdersMainPage } from "../profile-orders-main/profile-orders-main";
import { OrderReceiptPage } from "../order-receipt/order-receipt";
import {
  WS_CONNECTION_START,
  WS_CONNECTION_FINISH,
} from "../../services/actions/wsActions";

import { checkAuth } from "../../utils/utils";

export function ProfileОrdersPage() {
  const dispatch = useDispatch();
  const isAuthorized = useSelector((state) => state.profile.isAuthorized);
  useEffect(() => {
    checkAuth(dispatch, isAuthorized);
  });

  useEffect(() => {
    const token = getCookie("accessToken").split(" ")[1];
    dispatch({
      type: WS_CONNECTION_START,
      payload: {
        add: `?token=${token}`,
      },
    });

    return () => {
      dispatch({ type: WS_CONNECTION_FINISH });
    };
  }, []);
  return (
    <div>
      <Route path="/profile/orders/:id" exact={true}>
        <OrderReceiptPage />
      </Route>
      <Route path="/profile/orders" exact={true}>
        <ProfileOrdersMainPage />
      </Route>
    </div>
  );
}
