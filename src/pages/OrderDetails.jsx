import { useParams } from "react-router-dom";
import { useOrder } from "../context/OrderContext";

const OrderDetails = () => {
  const { id } = useParams();
  const { orders, loading } = useOrder();

  const parsedId = Number(id);
  const isIdValid = Number.isInteger(parsedId) && parsedId > 0;

  const order = isIdValid
    ? orders.find((o) => Number(o?.orderId) === parsedId)
    : undefined;

  const calculatedItems = Array.isArray(order?.items)
    ? order.items.map((item) => {
        const price = Number.isFinite(item?.price) ? item.price : 0;
        const quantity = Number.isFinite(item?.quantity) ? item.quantity : 0;

        return {
          name: item?.name || "Unknown Item",
          subtotal: price * quantity,
        };
      })
    : [];

  const orderSummary = order
    ? {
        orderId: order.orderId,
        items: calculatedItems,
        totalAmount: Number.isFinite(order.totalAmount) ? order.totalAmount : 0,
      }
    : null;

  if (loading) {
    return <p>Loading order details...</p>;
  }

  if (!isIdValid || !orderSummary) {
    return <h2>Order not found</h2>;
  }

  return (
    <div className="app-container">
      <h1>Order Details</h1>

      <p>
        <strong>Order ID:</strong> {orderSummary.orderId}
      </p>

      <p>
        <strong>Customer:</strong> {order.customerName || "Unkown"}
      </p>

      <p>
        <strong>Restaurant:</strong> {order.restaurant || "Unknown"}
      </p>

      <p>
        <strong>Status:</strong> {order.status || "Unknown"}
      </p>

      <p>
        <strong>Items:</strong>
      </p>

      {orderSummary.items.length ? (
        <ul>
          {orderSummary.items.map((item, index) => (
            <li key={`${item.name}-${index}`}>
              {item.name} - Subtotal: {item.subtotal}
            </li>
          ))}
        </ul>
      ) : (
        <p>No items available</p>
      )}

      <p>
        <strong>Total Amount:</strong> {orderSummary.totalAmount}
      </p>
    </div>
  );
};

export default OrderDetails;