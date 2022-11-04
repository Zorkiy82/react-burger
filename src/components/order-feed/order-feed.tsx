import styles from "./order-feed.module.css";
import { useSelector } from "react-redux";
import { OrderCard } from "../order-card/order-card";
import { FC } from "react";

export const OrderFeed: FC<any> = (props) => {
  const { orders } = useSelector((state: any) => state.ws.message);
  return (
    <ul className={styles.scrollbarContainer}>
      {orders &&
        orders.map((order: any) => (
          <OrderCard key={order._id} id={order._id} status={props.status} />
        ))}
    </ul>
  );
}
