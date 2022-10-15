import { Link, useLocation } from "react-router-dom";
import styles from "./order-card.module.css";

export function OrderCard(props) {
  const location = useLocation();
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
          <p className="text text_type_digits-default">{`#0${props.number}`}</p>
          <p className="text text_type_main-default text_color_inactive">{`${props.createdAt}`}</p>
          <p className="text text_type_main-medium">{`${props.name}`}</p>
        </div>
      </Link>
    </li>
  );
}
