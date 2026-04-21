const OrderReducer = (state, action) => {
  switch (action.type) {
    case "SET_ORDERS":
      return {
        ...state,
        orders: Array.isArray(action.payload) ? action.payload : [],
        loading: false,
      };

    case "MARK_ORDER_DELIVERED": {
      const orderId = Number(action.payload);

      if (!Number.isInteger(orderId)) {
        return state;
      }

      let hasUpdated = false;

      const updatedOrders = state.orders.map((order) => {
        if (Number(order?.orderId) !== orderId) {
          return order;
        }

        const currentStatus =
          typeof order?.status === "string" ? order.status.toLowerCase() : "";

        if (currentStatus === "delivered") {
          return order;
        }

        hasUpdated = true;
        return {
          ...order,
          status: "Delivered",
        };
      });

      if (!hasUpdated) {
        return state;
      }

      return {
        ...state,
        orders: updatedOrders,
      };
    }

    case "UNDO_ORDER_DELIVERED": {
      const orderId = Number(action.payload);

      if (!Number.isInteger(orderId)) {
        return state;
      }

      let hasUpdated = false;

      const updatedOrders = state.orders.map((order) => {
        if (Number(order?.orderId) !== orderId) {
          return order;
        }

        const currentStatus =
          typeof order?.status === "string" ? order.status.toLowerCase() : "";

        if (currentStatus !== "delivered") {
          return order;
        }

        hasUpdated = true;
        return {
          ...order,
          status: "Pending",
        };
      });

      if (!hasUpdated) {
        return state;
      }

      return {
        ...state,
        orders: updatedOrders,
      };
    }

    default:
      return state;
  }
};

export default OrderReducer;