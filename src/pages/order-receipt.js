import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { OrderReceipt } from "../components/order-receipt/order-receipt";
// import { IngredientDetails } from "../components/ingredient-details/ingredient-details";

export function OrderReceiptPage() {
  const { orders } = useSelector((state) => state.ws.message);
  const { id } = useParams();

  const isOrder = useMemo(() => {
    const res = orders.some((order) => order._id === id);
    return res;
  }, [id, orders]);

  return (
    <>
      {!isOrder && (
        <p className="text text_type_main-large text_color_inactive mt-10 ml-10">
          У нас нет такого заказа :-)
        </p>
      )}
      {isOrder && <OrderReceipt />}
    </>
  );
}
