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
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

  export default OrderProvider;
  export const useOrder = () => useContext(OrderContext);