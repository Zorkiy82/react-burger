import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import styles from "./order-card.module.css";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";

export function OrderCard(props) {
  const orderId = props.id;
  const location = useLocation();
  const { orders } = useSelector((state) => state.ws.message);

  const orderData = useMemo(() => {
    if (orders) {
      return orders.filter((value) => value._id === orderId)[0];
    }
  }, []);
  return (
    <li className={styles.li}>
      <Link
        className={styles.link}
        to={{
          pathname: `/feed/${orderId}`,
          state: { background: location },
        }}
      >
        <div className={styles.card}>
          <header className={styles.header}>
            <p className="text text_type_digits-default">{`#0${orderData.number}`}</p>
            <p className="text text_type_main-default text_color_inactive">{`${orderData.readableDate}`}</p>
          </header>

          <p className="text text_type_main-medium">{`${orderData.name}`}</p>

          <footer className={styles.footer}>
            <div className={styles.iconContainer}>
              {orderData.receipt.items.map((item, index, array) => {
                const inlineStyle = {
                  left:
                    index <= 5
                      ? `${index * 48}px`
                      : `${5 * 48 + (index - 5) * 4}px`,
                  zIndex: 100 + index * -1,
                  backgroundImage: `url(${item.image_mobile})`,
                };

                return (
                  <div
                    key={item._id}
                    className={styles.icon}
                    style={inlineStyle}
                  >
                    {index === 5 && array.length > 6 && (
                      <div className={styles.overlay}>
                        <p className={`text text_type_main-medium`}>{`+${
                          array.length - 6
                        }`}</p>
                      </div>
                    )}

                    {item.counter > 1 && index <= 5 && (
                      <div className={styles.counter}>
                        <p
                          className={`text text_type_main-default text_color_inactive`}
                        >
                          {`x${item.counter}`}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className={styles.priceContainer}>
              <p className="text text_type_digits-medium">
                {orderData.receipt.totalPrice}
              </p>
              <CurrencyIcon type="primary" />
            </div>
          </footer>
        </div>
      </Link>
    </li>
  );
}
