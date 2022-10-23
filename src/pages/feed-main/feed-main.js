import { useSelector } from "react-redux";
import styles from "./feed-main.module.css";
import { OrderFeed } from "../../components/order-feed/order-feed";
import { OrdersTotal } from "../../components/orders-total/orders-total";

export function FeedMainPage() {
  const connect = useSelector((store) => store.ws.wsConnected);
  return (
    <div className={styles.container}>
      <p className="text text_type_main-large mb-5">Лента заказов</p>

      <main className={styles.main}>
        {connect && (
          <>
            <OrderFeed />
            <OrdersTotal />
          </>
        )}
      </main>
    </div>
  );
}
