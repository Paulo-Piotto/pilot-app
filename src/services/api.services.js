import axios from 'axios';

//const URL = 'http://3.82.151.240:80/';
//const URL = 'http://3.82.151.240:80'
const URL = 'http://localhost:5000'

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

function addOrder(orderData){
    return axios.post(`${URL}/orders`, orderData);
}

function deleteOrder(id){
    return axios.delete(`${URL}/orders?id=${id}`)
}

function deleteStore(id){
    return axios.delete(`${URL}/stores?id=${id}`)
}

function deleteClient(id){
    return axios.delete(`${URL}/clients?id=${id}`)
}

function deleteEmployee(id){
    return axios.delete(`${URL}/employees?id=${id}`)
}

function updateStore(updateData){
    return axios.put(`${URL}/stores`, updateData);
}

function updateClient(updateData){
    return axios.put(`${URL}/clients`, updateData);
}

const authService = {
    register: (registrationData) => axios.post(`${URL}/users/register`, registrationData),
    login: (loginData) => axios.post()
}

function getClientsBalance(searchSettings){
    if(searchSettings.initialDate && searchSettings.endDate){
        return axios.get(`${URL}/clients/balance?initialDate=${searchSettings.initialDate}&endDate=${searchSettings.endDate}`)
    }
    return axios.get(`${URL}/clients/balance`)
    
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
    addOrder,
    deleteOrder,
    deleteStore,
    deleteClient,
    deleteEmployee,
    updateStore,
    updateClient,
    getClientsBalance,
}