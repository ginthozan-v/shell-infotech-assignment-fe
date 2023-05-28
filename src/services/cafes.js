import * as api from '../../api';
import { FETCH_ALL_CAFE } from '../redux/actions/cafe';

export const getCafes = () => async (dispatch) => {
  try {
    const { data } = await api.fetchCafes();
    dispatch({ type: FETCH_ALL_CAFE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
