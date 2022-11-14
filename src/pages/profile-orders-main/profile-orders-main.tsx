import { FC } from "react";
import { OrderFeed } from "../../components/order-feed/order-feed";

export const ProfileOrdersMainPage: FC = () => {
  return (
    <div className="mt-10">
      <OrderFeed status={true} />
    </div>
  );
}
