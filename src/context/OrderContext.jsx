import { createContext, useContext, useEffect, useReducer } from "react";
import OrderReducer from "../reducer/OrderReducer";
import { getDataset, getToken } from "../services/api";

const initialState = {
  orders: [],
  loading: true,
};

const OrderContext = createContext();

const OrderProvider = ({ children }) => {
  const [state, dispatch] = useReducer(OrderReducer, initialState);

  const markOrderDelivered = (orderId) => {
    dispatch({
      type: "MARK_ORDER_DELIVERED",
      payload: orderId,
    });
  };

  const undoOrderDelivered = (orderId) => {
    dispatch({
      type: "UNDO_ORDER_DELIVERED",
      payload: orderId,
    });
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const tokenRes = await getToken(
          "E0323048",
          "659759",
          "setA"
        );

        const rawOrders = await getDataset(
          tokenRes.token,
          tokenRes.dataUrl
        );

        const cleanedOrders = Array.isArray(rawOrders)
          ? rawOrders.filter(
              (order) =>
                order &&
                order.orderId &&
                typeof order.restaurant === "string"
            )
          : [];

        dispatch({
          type: "SET_ORDERS",
          payload: cleanedOrders,
        });
      } catch (error) {
        console.error("Error fetching orders:", error);
        dispatch({ type: "SET_ORDERS", payload: [] });
      }
    };

    fetchOrders();
  }, []);

  return (
    <OrderContext.Provider
      value={{
        orders: state.orders,
        loading: state.loading,
        markOrderDelivered,
        undoOrderDelivered,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export default OrderProvider;
export const useOrder = () => useContext(OrderContext);