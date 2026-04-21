import { useState } from "react";
import { useOrder } from "../context/OrderContext";
import OrderCard from "./OrderCard";
import { isValidOrder } from "../utils/orderValidation";

const OrderList = () => {
  const { orders, loading, markOrderDelivered, undoOrderDelivered } = useOrder();
  const [showDeliveredOrders, setShowDeliveredOrders] = useState(false);

  const validOrders = (Array.isArray(orders) ? orders : []).filter(isValidOrder);
  const pendingOrders = validOrders.filter(
    (order) =>
      typeof order?.status === "string" &&
      order.status.toLowerCase() === "pending"
  );
  const deliveredOrders = validOrders.filter(
    (order) =>
      typeof order?.status === "string" &&
      order.status.toLowerCase() === "delivered"
  );

  if (loading) {
    return <p>Loading orders...</p>;
  }

  return (
    <div>
      <h2>Pending Orders</h2>
      <div className="order-list">
        {!pendingOrders.length ? (
          <p>No pending orders available</p>
        ) : (
          pendingOrders.map((order) => (
            <OrderCard
              key={order.orderId}
              order={order}
              onMarkDelivered={markOrderDelivered}
            />
          ))
        )}
      </div>

      <button
        type="button"
        onClick={() => setShowDeliveredOrders((prev) => !prev)}
      >
        {showDeliveredOrders ? "Hide Delivered Orders" : "View Delivered Orders"}
      </button>

      {showDeliveredOrders && (
        <>
          <h2>Delivered Orders</h2>
          <div className="order-list">
            {!deliveredOrders.length ? (
              <p>No delivered orders available</p>
            ) : (
              deliveredOrders.map((order) => (
                <OrderCard
                  key={order.orderId}
                  order={order}
                  onUndoDelivered={undoOrderDelivered}
                />
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default OrderList;