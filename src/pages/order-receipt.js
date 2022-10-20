import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { OrderReceipt } from "../components/order-receipt/order-receipt";
// import { IngredientDetails } from "../components/ingredient-details/ingredient-details";

export function OrderReceiptPage() {
  const { orders } = useSelector((state) => state.ws.message);
  const { id } = useParams();
    // TODO исправить баг при переходе по прямой ссылке из браузера
  const isOrder = useMemo(() => {
    let res = false;
    if (orders) {
      res = orders.some((order) => order._id === id);
    }
    return res;
  }, [id, orders]);

  return (
    <>
      {!isOrder && !orders && (
        <p className="text text_type_main-large text_color_inactive mt-10 ml-10">
          Загружаем данные заказа...
        </p>
      )}

      {!isOrder && orders && (
        <p className="text text_type_main-large text_color_inactive mt-10 ml-10">
          У нас нет такого заказа :-)
        </p>
      )}
      {isOrder && <OrderReceipt />}
    </>
  );
}