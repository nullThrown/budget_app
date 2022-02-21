import axios from 'axios';
import handleErrors from '../../util/api/errorHandler';

export const createExpense = (expense) => async (dispatch) => {
  dispatch({ type: 'expenses/dataLoading' });
  try {
    const res = await axios.post(
      'http://localhost:4000/api/exp/create',
      expense,
      { withCredentials: true }
    );
    const { data } = res;
    dispatch({ type: 'expenses/createExpense', payload: data });
  } catch (err) {
    handleErrors(err, 'expenses', dispatch);
  }
};
export const editExpense = (expense) => async (dispatch) => {
  dispatch({ type: 'expenses/dataLoading' });
  try {
    const res = await axios.put(
      'http://localhost:4000/api/exp/edit/',
      expense,
      { withCredentials: true }
    );
    dispatch({ type: 'expenses/editExpense', payload: res.data });
  } catch (err) {
    handleErrors(err, 'expenses', dispatch);
  }
};

// remove var deleteExpense... just run as a function
export const deleteExpense = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(
      `http://localhost:4000/api/exp/delete/${id}`,
      { withCredentials: true }
    );
    dispatch({ type: 'expenses/deleteExpense', payload: id });
  } catch (err) {
    handleErrors(err, 'expenses', dispatch);
  }
};
