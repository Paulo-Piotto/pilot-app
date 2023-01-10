import { HashRouter, Routes, Route } from "react-router-dom";
import Main from "./components/main";
import EmployeesPage from "./pages/employeesPage";
import StoresPage from "./pages/storesPage";
import ClientsPage from "./pages/clientsPage";
import OrdersPage from "./pages/ordersPage";
import InProgress from "./components/generics/inProgress";
import Auth from "./components/auth";
import AuthContext from "./components/context/AuthContext";
import { useContext } from "react";
import ClientsBalancePage from "./pages/clientsBalancePage";

function App() {
  const { userData } = useContext(AuthContext);

  if(!userData) return <Auth />
  return (
      <HashRouter>
        <Main />
        <Routes>
          <Route path="/" element={<OrdersPage />} />
          <Route path="/employees" element={<EmployeesPage />} />
          <Route path="/stores" element={<StoresPage />} />
          <Route path="/clients" element={<ClientsBalancePage />} />
          <Route path="/development" element={<InProgress />} />
        </Routes>
      </HashRouter>
  );
}

export default App;
