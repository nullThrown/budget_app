import axios from 'axios';
import handleErrors from '../../util/api/errorHandler';
export const createExpense = (expense) => async (dispatch) => {
  dispatch({ type: 'expenses/dataLoading' });
  try {
    const newExpense = await axios.post(
      'http://localhost:4000/api/exp/create-new',
      expense,
      { withCredentials: true }
    );
    console.log(newExpense.data);
    dispatch({ type: 'expenses/createExpense', payload: newExpense.data });
  } catch (err) {
    handleErrors(err, 'recurring', dispatch);
  }
};
export const editExpense = (expense) => async (dispatch) => {
  dispatch({ type: 'expenses/dataLoading' });
  try {
    const newExpense = await axios.put(
      'http://localhost:4000/api/exp/edit/',
      expense,
      { withCredentials: true }
    );
    console.log(newExpense);
    dispatch({ type: 'expenses/editExpense', payload: newExpense.data });
  } catch (err) {
    handleErrors(err, 'recurring', dispatch);
  }
};

// remove var deleteExpense... just run as a function
export const deleteExpense = (id) => async (dispatch) => {
  try {
    const deletedExpense = await axios.delete(
      `http://localhost:4000/api/exp/delete/${id}`,
      { withCredentials: true }
    );
    dispatch({ type: 'expenses/deleteExpense', payload: id });
  } catch (err) {
    handleErrors(err, 'recurring', dispatch);
  }
};
