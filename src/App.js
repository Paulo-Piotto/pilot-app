import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./components/main";
import EmployeesPage from "./pages/employeesPage";
import StoresPage from "./pages/storesPage";
import ClientsPage from "./pages/clientsPage";
import OrdersPage from "./pages/ordersPage";

function App() {
  return (
      <BrowserRouter>
        <Main />
        <Routes>
          <Route path="/" element={<OrdersPage />} />
          <Route path="/employees" element={<EmployeesPage />} />
          <Route path="/stores" element={<StoresPage />} />
          <Route path="/clients" element={<ClientsPage />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
