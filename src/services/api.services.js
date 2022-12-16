import axios from 'axios';

const URL = 'http://localhost:5000';

function getAllEmployees(){
    return axios.get(`${URL}/employees`);
}

function registerEmployee(newEmployee){
    return axios.post(`${URL}/employees`, newEmployee);
}

function searchEmployeeByName(employeeName){
    return axios.get(`${URL}/employees?name=${employeeName}`);
}

function getAllStores(){
    return axios.get(`${URL}/stores`);
}

function registerStore(newStore){
    return axios.post(`${URL}/stores`, newStore);
}

function searchStoreByName(storeName){
    return axios.get(`${URL}/stores?name=${storeName}`);
}

function getAllClients(){
    return axios.get(`${URL}/clients`);
}

function registerClient(newClient){
    return axios.post(`${URL}/clients`, newClient);
}

function searchClientByName(clientName){
    return axios.get(`${URL}/clients?name=${clientName}`);
}

function getAllOrders(){
    return axios.get(`${URL}/orders/all`);
}

function filterOrders(searchSettings){
    return axios.get(`${URL}/orders?initialDate=${searchSettings.initialDate}&endDate=${searchSettings.endDate}&store=${searchSettings.store}&client=${searchSettings.client}`)
}

export {
    getAllEmployees,
    registerEmployee,
    searchEmployeeByName,
    getAllStores,
    registerStore,
    searchStoreByName,
    registerClient,
    searchClientByName,
    getAllClients,
    getAllOrders,
    filterOrders,
}