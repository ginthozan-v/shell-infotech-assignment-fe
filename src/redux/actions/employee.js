import * as api from '../../api';
import {
  CREATE_EMPLOYEE,
  DELETE_EMPLOYEE,
  FETCH_ALL_EMPLOYEE,
  FETCH_BY_SEARCH_EMPLOYEE,
  UPDATE_EMPLOYEE,
} from '../../constants/ActionType';

// Action creators
export const getEmployees = () => async (dispatch) => {
  try {
    const { data } = await api.fetchEmployees();
    await dispatch({ type: FETCH_ALL_EMPLOYEE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getEmployeesByCafe = (searchQuery) => async (dispatch) => {
  try {
    const { data } = await api.fetchEmployeesBySearch(searchQuery);
    await dispatch({ type: FETCH_BY_SEARCH_EMPLOYEE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createEmployee = (employee) => async (dispatch) => {
  try {
    const { data } = await api.createEmployee(employee);
    await dispatch({ type: CREATE_EMPLOYEE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updateEmployee = (id, employee) => async (dispatch) => {
  try {
    const { data } = await api.updateEmployee(id, employee);
    await dispatch({ type: UPDATE_EMPLOYEE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteEmployee = (id) => async (dispatch) => {
  try {
    await api.deleteEmployee(id);
    await dispatch({ type: DELETE_EMPLOYEE, payload: id });
  } catch (error) {
    console.log(error);
  }
};
