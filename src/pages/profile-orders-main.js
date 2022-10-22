import { OrderFeed } from "../components/order-feed/order-feed";

export function ProfileOrdersMainPage() {
  return (
    <div className="mt-10">
      <OrderFeed status={true} />
    </div>
  );
}
