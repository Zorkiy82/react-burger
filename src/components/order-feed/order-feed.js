import styles from "./order-feed.module.css";
import { useSelector, useDispatch } from "react-redux";
import { OrderCard } from "../order-card/order-card";

export function OrderFeed() {
  const { orders } = useSelector((state) => state.ws.messages);
  return (
    <ul className={styles.scrollbarContainer}>
      {orders &&
        orders.map((order) => <OrderCard key={order._id} {...order} />)}
    </ul>
  );
}
