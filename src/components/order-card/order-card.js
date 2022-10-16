import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import styles from "./order-card.module.css";

export function OrderCard(props) {
  const location = useLocation();
  const { itemsCatalog } = useSelector((state) => state.ingredients);

  const totalPrice = useMemo(() => {
    const res = props.ingredients.reduce((summ, item) => {
      return summ + itemsCatalog[item].price;
    }, 0);
    return res;
  }, []);

  return (
    <li className={styles.li}>
      <Link
        className={styles.link}
        to={{
          pathname: ``,
          // state: { background: location },
        }}
      >
        <div className={styles.card}>
          <div className={styles.header}>
            <p className="text text_type_digits-default">{`#0${props.number}`}</p>
            <p className="text text_type_main-default text_color_inactive">{`${props.createdAt}`}</p>
            {/* <p className="text text_type_main-default text_color_inactive">{`${new Date(props.createdAt)}`}</p> */}
          </div>

          <p className="text text_type_main-medium">{`${props.name}`}</p>

          <div className={styles.iconContainer}>
            {props.ingredients.map((item, index) => {
              const inlineStyle = {
                left: `${index * 48}px`,
                zIndex: 100 + index * -1,
                backgroundImage: `url(${itemsCatalog[item].image_mobile})`,
              };

              return (
                <div key={index} className={styles.icon} style={inlineStyle} />
              );
            })}
          </div>
          <p className="text text_type_digits-default">{`${totalPrice}`}</p>

        </div>
      </Link>
    </li>
  );
}
