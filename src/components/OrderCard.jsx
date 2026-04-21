const OrderCard = ({ order }) => {
  const items = Array.isArray(order.items) ? order.items : [];

  return (
    <div className="order-card" data-testid="order-item">
      <h3>Order ID: {order.orderId || "N/A"}</h3>

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
        <strong>Total Amount:</strong> ₹
        {typeof order.totalAmount === "number"
          ? order.totalAmount
          : "Not Available"}
      </p>

      <p>
        <strong>Delivery Time:</strong> {order.deliveryTime || "N/A"}
      </p>

      {Number.isFinite(order.rating) && (
        <p>
          <strong>Rating:</strong> {order.rating}
        </p>
      )}

      <div>
        <strong>Items:</strong>
        {items.length === 0 ? (
          <p>No items available</p>
        ) : (
          <ul>
            {items.map((item, index) => (
              <li key={index}>
                {item?.name || "Unnamed Item"} - ₹
                {item?.price || 0} × {item?.quantity || 0}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default OrderCard;