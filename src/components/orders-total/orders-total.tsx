import { FC, useMemo } from "react";
import { useSelector } from "../../services/hooks";
import { Link, useLocation } from "react-router-dom";
import styles from "./orders-total.module.css"

export const OrdersTotal: FC = () => {
  const { orders, fTotal, fTotalToday } = useSelector(
    (state) => state.ws.message
  );
  const location = useLocation();

  const ordersDone = useMemo(() => {
    return orders.filter((order) => order.status === "done");
  }, [orders]);

  const ordersPending = useMemo(() => {
    return orders.filter((order) => order.status === "pending");
  }, [orders]);

  if (!orders) {
    return null;
  }
  return (
    <div className={`pl-5 ${styles.text}`}>
      <div className={`${styles.twoColumns}`}>
        <div className={`${styles.column}`}>
          <p className="text text_type_main-medium mb-6">{`Готовы:`}</p>
          <div className={`${styles.statusContainer}`}>
            {ordersDone.map((value) => {
              return (
                <Link
                  to={{
                    pathname: `/feed/${value._id}`,
                    state: { background: location },
                  }}
                  key={value._id}
                  className={`text text_type_digits-default ${styles.link}`}
                  style={value.orderStatus.style}
                >
                  {value.number}
                </Link>
              );
            })}
          </div>
        </div>

        <div>
          <p className="text text_type_main-medium mb-6">{`В работе:`}</p>
          <div className={`${styles.statusContainer}`}>
            {ordersPending.map((value) => {
              return (
                <Link
                  to={{
                    pathname: `/feed/${value._id}`,
                    state: { background: location },
                  }}
                  key={value._id}
                  className={`text text_type_digits-default ${styles.link}`}
                  style={value.orderStatus.style}
                >
                  {value.number}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      <p className="text text_type_main-medium mt-15">{`Выполнено за все время:`}</p>
      <p className={`text text_type_digits-large ${styles.textShadow}`}>
        {fTotal}
      </p>
      <p className="text text_type_main-medium mt-15">{`Выполнено за сегодня:`}</p>
      <p className={`text text_type_digits-large ${styles.textShadow}`}>
        {fTotalToday}
      </p>
    </div>
  );
}
