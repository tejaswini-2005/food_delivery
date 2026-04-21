import { useOrder } from "../context/OrderContext";
import OrderCard from "./OrderCard";

const OrderList = () => {
  const { orders, loading } = useOrder();

  const validOrders = (Array.isArray(orders) ? orders : []).filter((order) => {
    const items = Array.isArray(order?.items) ? order.items : [];
    const hasItems = items.length > 0;
    const hasValidQuantities = items.every(
      (item) => Number.isFinite(item?.quantity) && item.quantity > 0
    );
    const hasValidTotalAmount =
      Number.isFinite(order?.totalAmount) && order.totalAmount > 0;

    return hasItems && hasValidQuantities && hasValidTotalAmount;
  });

  if (loading) {
    return <p>Loading orders...</p>;
  }

  if (!validOrders.length) {
    return <p>No valid orders available</p>;
  }

  return (
    <div className="order-list">
      {validOrders.map((order) => (
        <OrderCard key={order.orderId} order={order} />
      ))}
    </div>
  );
};

export default OrderList;