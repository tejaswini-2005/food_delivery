import AppRouter from "./routers/AppRouter";
import OrderProvider from "./context/OrderContext";

const App = () => {
  return (
    <OrderProvider>
      <AppRouter />
    </OrderProvider>
  );
};

export default App;