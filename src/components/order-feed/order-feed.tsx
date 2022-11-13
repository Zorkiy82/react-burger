import styles from "./order-feed.module.css";
import { useSelector } from "../../services/hooks";
import { OrderCard } from "../order-card/order-card";
import { FC } from "react";

export const OrderFeed: FC<{ status?: boolean }> = ({ status }) => {
  const { orders } = useSelector((state) => state.ws.message);
  return (
    <ul className={styles.scrollbarContainer}>
      {orders &&
        orders.map((order) => (
          <OrderCard key={order._id} id={order._id} status={status} />
        ))}
    </ul>
  );
}
