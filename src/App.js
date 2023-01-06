import { HashRouter, Routes, Route } from "react-router-dom";
import Main from "./components/main";
import EmployeesPage from "./pages/employeesPage";
import StoresPage from "./pages/storesPage";
import ClientsPage from "./pages/clientsPage";
import OrdersPage from "./pages/ordersPage";
import InProgress from "./components/generics/inProgress";
import ClientsBalancePage from "./pages/clientsBalancePage";

function App() {
  return (
      <HashRouter>
        <Main />
        <Routes>
          <Route path="/" element={<OrdersPage />} />
          <Route path="/employees" element={<EmployeesPage />} />
          <Route path="/stores" element={<StoresPage />} />
          <Route path="/clients" element={<ClientsPage />} />
          <Route path="/development" element={<InProgress />} />
          <Route path="/balance" element={<ClientsBalancePage />} />
        </Routes>
      </HashRouter>
  );
}

export default App;
