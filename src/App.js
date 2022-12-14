import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./components/main";
import EmployeesPage from "./pages/employeesPage";
import StoresPage from "./pages/storesPage";

function App() {
  return (
      <BrowserRouter>
        <Main />
        <Routes>
          <Route path="/employees" element={<EmployeesPage />} />
          <Route path="/stores" element={<StoresPage />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
