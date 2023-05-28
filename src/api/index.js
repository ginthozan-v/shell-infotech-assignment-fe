import axios from 'axios';

const baseUrl = 'http://localhost:4000/api';
const cafesUrl = `${baseUrl}/cafes`;
const employeesUrl = `${baseUrl}/employees`;

// CAFES
export const fetchCafes = () => axios.get(cafesUrl);

export const fetchCafesBySearch = (searchQuery) =>
  axios.get(`${cafesUrl}?location=${searchQuery.search}`);

export const createCafe = (newCafe) => axios.post(cafesUrl, newCafe);

export const updateCafe = (id, updatedCafe) =>
  axios.patch(`${cafesUrl}/${id}`, updatedCafe);

export const deleteCafe = (id) => axios.delete(`${cafesUrl}/${id}`);

export const addEmployeeToCafe = (id, addEmployee) =>
  axios.patch(`${cafesUrl}/add-employee/${id}`, addEmployee);

// EMPLOYEES
export const fetchEmployees = () => axios.get(employeesUrl);

export const fetchEmployeesBySearch = (searchQuery) =>
  axios.get(`${employeesUrl}?cafe=${searchQuery.search}`);

export const createEmployee = (newEmployee) =>
  axios.post(employeesUrl, newEmployee);

export const updateEmployee = (id, updatedEmployee) =>
  axios.patch(`${employeesUrl}/${id}`, updatedEmployee);

export const deleteEmployee = (id) => axios.delete(`${employeesUrl}/${id}`);
