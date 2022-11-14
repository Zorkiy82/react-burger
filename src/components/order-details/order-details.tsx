import { FC, useState } from "react";
import styles from "./order-details.module.css";

const OrderDetails: FC<{ number: number }> = ({ number }) => {
  const [orderData] = useState({
    number: number,
    status: "Ваш заказ начали готовить",
    recommendation: "Дождитесь готовности на орбитальной станции",
  });

  return (
    <div className={`${styles.orderDetails} pt-30 pb-30`}>
      <div className={`${styles.container}`}>
        <p className={`${styles.orderNumber} text text_type_digits-large`}>
          {orderData.number}
        </p>

        <p className="text text_type_main-medium mt-8">идентификатор заказа</p>
        <div className={`${styles.doneIcon} mt-15`}></div>
        <p className="text text_type_main-small mt-15">{orderData.status}</p>

        <p className="text text_type_main-small text_color_inactive mt-2">
          {orderData.recommendation}
        </p>
      </div>
    </div>
  );
}

export { OrderDetails };
