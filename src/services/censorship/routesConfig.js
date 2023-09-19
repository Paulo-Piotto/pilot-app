import OrdersPage from "../../pages/ordersPage";
import EmployeesPage from "../../pages/employeesPage";
import StoresPage from "../../pages/storesPage";
import ClientsBalancePage from "../../pages/clientsBalancePage";
import IncomesPage from "../../pages/incomesPage";
import InProgress from "../../components/generics/inProgress";
import PunchCardPage from "../../pages/punchCardPage";
import PaymentsPage from "../../pages/paymentsPage";
import FoodControlPage from "../../pages/foodControlPage";
import LoansPage from "../../pages/loansPage";

const routesConfig = [
  {
    component: OrdersPage, //done
    path: "/",
    minimumAcessLevel: "basic",
    unauthorizedComponent: null,
  },
  {
    component: EmployeesPage, //done
    path: "/employees",
    minimumAcessLevel: "admin",
    unauthorizedComponent: null,
  },
  {
    component: PaymentsPage, //done
    path: "/payments",
    minimumAcessLevel: "admin",
    unauthorizedComponent: null,
  },
  {
    component: FoodControlPage, //done
    path: "/foodControl",
    minimumAcessLevel: "basic",
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
    component: PunchCardPage, //?
    path: "/frequency",
    minimumAcessLevel: "admin",
    unauthorizedComponent: null,
  },
  {
    component: LoansPage, //?
    path: "/loans",
    minimumAcessLevel: "admin",
    unauthorizedComponent: null,
  },
];

export default routesConfig;
