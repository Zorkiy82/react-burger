import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styles from "./order-receipt.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

export function OrderReceipt() {
  const { orders } = useSelector((state) => state.ws.message);
  const { id } = useParams();
  const orderData = useMemo(() => {
    const res = orders.filter((order) => order._id === id)[0];
    return res;
  }, [id, orders]);

  if (!orderData) {
    return null;
  }

  return (
    <div className={`pt-15 pl-10 pb-10 pr-10 ${styles.main}`}>
      <p className="text text_type_digits-default">{`#${orderData.number}`}</p>
      <p className="text text_type_main-medium mt-10">{`${orderData.name}`}</p>

      <p
        className="text text_type_main-small mt-3"
        style={orderData.orderStatus.style}
      >{`${orderData.orderStatus.content}`}</p>

      <p className="text text_type_main-medium mt-15">{`Состав:`}</p>
      <div className={`${styles.scrollbarContainer} mt-6`}>
        {orderData.receipt.items.map((item, index, array) => {
          const inlineStyle = {
            backgroundImage: `url(${item.image_mobile})`,
          };

          return (
            <div key={item._id} className={`${styles.rowContainer} mr-6`}>
              <div className={styles.rowContainer}>
                <div className={styles.icon} style={inlineStyle}></div>
                <p className="text text_type_main-default ml-4">{`${item.name}`}</p>
              </div>

              <div className={`${styles.priceContainer} ml-4`}>
                <p className="text text_type_digits-default">
                  {`${item.counter} x ${item.price}`}
                </p>
                <CurrencyIcon type="primary" />
              </div>
            </div>
          );
        })}
      </div>
      <footer className={`${styles.rowContainer} mt-10`}>
        <p className="text text_type_main-default text_color_inactive">{`${orderData.readableDate}`}</p>
        <div className={styles.priceContainer}>
          <p className="text text_type_digits-default">
            {orderData.receipt.totalPrice}
          </p>
          <CurrencyIcon type="primary" />
        </div>
      </footer>
    </div>
  );
}
