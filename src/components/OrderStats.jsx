import { useEffect } from "react";
import { useOrder } from "../context/OrderContext";
import { isValidOrder } from "../utils/orderValidation";

const OrderStats = () => {
  const { orders } = useOrder();

  const stats = (Array.isArray(orders) ? orders : []).reduce(
    (acc, order) => {
      if (!isValidOrder(order)) {
        return acc;
      }

      const status =
        typeof order?.status === "string" ? order.status.trim().toLowerCase() : "";

      if (!status) {
        return acc;
      }

      acc.totalOrders += 1;

      if (status === "delivered") {
        acc.deliveredOrders += 1;
      }

      if (status === "cancelled") {
        acc.cancelledOrders += 1;
      }

      return acc;
    },
    {
      totalOrders: 0,
      deliveredOrders: 0,
      cancelledOrders: 0,
    }
  );

  const { totalOrders, deliveredOrders, cancelledOrders } = stats;

  useEffect(() => {
    window.appState = {
      totalOrders,
      deliveredOrders,
      cancelledOrders,
    };
  }, [totalOrders, deliveredOrders, cancelledOrders]);

  return (
    <div className="app-container">
      <h1>Order Statistics</h1>

      <div style={{ display: "grid", gap: "10px", maxWidth: "420px" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <strong>Total Valid Orders</strong>
          <div data-testid="total-orders">{totalOrders}</div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <strong>Delivered Orders</strong>
          <div data-testid="delivered-orders">{deliveredOrders}</div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <strong>Cancelled Orders</strong>
          <div data-testid="cancelled-orders">{cancelledOrders}</div>
        </div>
      </div>

    </div>
  );
};

export default OrderStats;