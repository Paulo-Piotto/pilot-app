import axios from "axios";
import Config from "../pilot-app.config";

const { serverBaseURL: URL } = Config;

const EmployeesService = {
  getEmployees: (filterString) =>
    axios.get(`${URL}/employees?${filterString ?? ""}`),
  deleteEmployee: (id) => axios.delete(`${URL}/employees?id=${id}`),
  registerEmployee: (newEmployee) =>
    axios.post(`${URL}/employees`, newEmployee),
  updateEmployee: (employeeData) => axios.put(`${URL}/employees`, employeeData),
  searchEmployeeByName: (employeeName) =>
    axios.get(`${URL}/employees?name=${employeeName}`),
};

const StoresService = {
  getAllStores: () => axios.get(`${URL}/stores`),
  updateStore: (updateData) => axios.put(`${URL}/stores`, updateData),
  deleteStore: (id) => axios.delete(`${URL}/stores?id=${id}`),
  registerStore: (newStore) => axios.post(`${URL}/stores`, newStore),
  searchStoreByName: (storeName) =>
    axios.get(`${URL}/stores?name=${storeName}`),
};

const ClientsService = {
  getAllClients: () => axios.get(`${URL}/clients?includeArchived=false`),
  deleteClient: (id) => axios.delete(`${URL}/clients?id=${id}`),
  registerClient: (newClient) => axios.post(`${URL}/clients`, newClient),
  searchClient: (filterString) => {
    return axios.get(`${URL}/clients?${filterString}`);
  },
  updateClient: (updateData) => axios.put(`${URL}/clients`, updateData),
  getClientsBalance: (filterString) => {
    return axios.get(`${URL}/clients/balance?${filterString}`);
  },
};

const OrdersService = {
  getAllOrders: () => axios.get(`${URL}/orders`),
  filterOrders: (searchSettings) =>
    axios.get(
      `${URL}/orders?initialDate=${searchSettings.initialDate}&endDate=${searchSettings.endDate}&store=${searchSettings.store}&client=${searchSettings.client}&order=${searchSettings.order}`
    ),
  addOrder: (orderData) => axios.post(`${URL}/orders`, orderData),
  updateOrder: (orderData) => axios.put(`${URL}/orders`, orderData),
  deleteOrder: (id) => axios.delete(`${URL}/orders?id=${id}`),
  deleteMany: (deleteSettings) =>
    axios.delete(`${URL}/orders/many`, { data: { deleteSettings } }),
};

const AuthService = {
  register: (registrationData) =>
    axios.post(`${URL}/users/register`, registrationData),
  login: (loginData) => axios.post(`${URL}/users/login`, loginData),
};

const IncomesService = {
  getAllIncomes: () => axios.get(`${URL}/incomes`),
  filterIncomes: (searchSettings) =>
    axios.get(
      `${URL}/incomes?initialDate=${searchSettings.initialDate}&endDate=${searchSettings.endDate}&client=${searchSettings.client}`
    ),
  addIncome: (incomeData) => axios.post(`${URL}/incomes`, incomeData),
  deleteIncome: (id) => axios.delete(`${URL}/incomes?id=${id}`),
};

const UsersService = {
  getAllUsersData: (token) =>
    axios.get(`${URL}/users`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
  updateUser: (userData, token) =>
    axios.put(`${URL}/users`, userData, {
      headers: { Authorization: `Bearer ${token}` },
    }),
};

const PunchCardService = {
  getAllPunchCardsData: (filterString, token) =>
    axios.get(`${URL}/frequency${filterString ?? ""}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  getPunchCardsByClients: (filterString, token) =>
    axios.get(`${URL}/frequency/clients${filterString ?? ""}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  getPunchCardsByEmployees: (filterString, token) =>
    axios.get(`${URL}/frequency/employees${filterString ?? ""}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  getEmptyPunchCards: (token) =>
    axios.get(`${URL}/frequency/empty`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  massAction: (massActionConfig, token) =>
    axios.post(`${URL}/frequency/massaction`, massActionConfig, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  create: (data, token) =>
    axios.post(`${URL}/frequency`, data, {
      headers: { Authorization: `Bearer ${token}` },
    }),
  delete: (id, token) =>
    axios.delete(`${URL}/frequency/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
};

const PaymentsService = {
  getEmployeesWorkedDays: (filterString, token) =>
    axios.get(`${URL}/workedDays?${filterString ?? ""}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  getPeriodWorkingDays: (filterString, token) =>
    axios.get(`${URL}/workedDays/workingDays?${filterString ?? ""}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};

const FoodControlService = {
  getFoodOrders: (filterString, token) =>
    axios.get(`${URL}/employeesFood?${filterString ?? ""}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  deleteFoodOrder: (deleteSettings, token) =>
    axios.delete(`${URL}/employeesFood?${deleteSettings ?? ""}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  createFoodOrder: (foodOrder, token) =>
    axios.post(`${URL}/employeesFood`, foodOrder, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  updateFoodOrder: (foodOrder, token) =>
    axios.put(`${URL}/employeesFood`, foodOrder, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  getMenu: (token) =>
    axios.get(`${URL}/menu`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};

export {
  EmployeesService,
  StoresService,
  ClientsService,
  OrdersService,
  AuthService,
  IncomesService,
  UsersService,
  PunchCardService,
  PaymentsService,
  FoodControlService,
};
