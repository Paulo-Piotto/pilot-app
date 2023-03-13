import OrdersPage from "../../pages/ordersPage";
import EmployeesPage from "../../pages/employeesPage";
import StoresPage from "../../pages/storesPage";
import ClientsBalancePage from "../../pages/clientsBalancePage";
import IncomesPage from "../../pages/incomesPage";
import InProgress from "../../components/generics/inProgress";
import PunchCardPage from "../../pages/punchCardPage";

const routesConfig = [
  {
    component: OrdersPage, //done
    path: "/",
    minimumAcessLevel: "basic",
    unauthorizedComponent: null,
  },
  {
    component: InProgress, //done
    path: "/employees",
    minimumAcessLevel: "admin",
    unauthorizedComponent: null,
  },
  {
    component: StoresPage, //done
    path: "/stores",
    minimumAcessLevel: "basic",
    unauthorizedComponent: null,
  },
  {
    component: ClientsBalancePage, //complicated
    path: "/clients",
    minimumAcessLevel: "basic",
    unauthorizedComponent: null,
  },
  {
    component: IncomesPage, //done
    path: "/incomes",
    minimumAcessLevel: "root",
    unauthorizedComponent: null,
  },
  {
    component: InProgress, //?
    path: "/development",
    minimumAcessLevel: "admin",
    unauthorizedComponent: null,
  },
  {
    component: InProgress, //?
    path: "/frequency",
    minimumAcessLevel: "admin",
    unauthorizedComponent: null,
  },
];

export default routesConfig;
