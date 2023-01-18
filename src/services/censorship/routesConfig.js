import OrdersPage from "../../pages/ordersPage";
import EmployeesPage from "../../pages/employeesPage";
import StoresPage from "../../pages/storesPage";
import ClientsBalancePage from "../../pages/clientsBalancePage";
import IncomesPage from "../../pages/incomesPage";
import InProgress from "../../components/generics/inProgress";

const routesConfig = [
    {
        component: OrdersPage,
        path: "/",
        minimumAcessLevel: "basic",
        unauthorizedComponent: null
    },
    {
        component: EmployeesPage,
        path: "/employees",
        minimumAcessLevel: "admin",
        unauthorizedComponent: null
    },
    {
        component: StoresPage,
        path: "/stores",
        minimumAcessLevel: "basic",
        unauthorizedComponent: null
    },
    {
        component: ClientsBalancePage,
        path: "/clients",
        minimumAcessLevel: "root",
        unauthorizedComponent: null
    },
    {
        component: IncomesPage,
        path: "/incomes",
        minimumAcessLevel: "basic",
        unauthorizedComponent: null
    },
    {
        component: InProgress,
        path: "/development",
        minimumAcessLevel: "basic",
        unauthorizedComponent: null
    },
]

export default routesConfig;