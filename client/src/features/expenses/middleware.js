import axios from 'axios';

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
    dispatch({ type: 'expenses/dataLoadError' });
    const { data, status } = err.response;
    if (status >= 400 && status < 500 && data.error === 'unauthenticated') {
    } else if (status >= 500 && data.error === 'server_error') {
    }
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
    dispatch({ type: 'expenses/dataLoadError' });
    console.log(err);
    const { data, status } = err.response;
    if (status >= 400 && status < 500 && data.error === 'unauthenticated') {
    } else if (status >= 500 && data.error === 'server_error') {
    }
  }
};

// remove var deleteExpense... just run as a function
export const deleteExpense = (expenseId) => async (dispatch) => {
  try {
    const deletedExpense = await axios.delete(
      `http://localhost:4000/api/exp/delete/${expenseId}`,
      { withCredentials: true }
    );
    dispatch({ type: 'expenses/deleteExpense', payload: expenseId });
  } catch (err) {
    const { data, status } = err.response;
    if (status >= 400 && status < 500) {
      if (data.error === 'unauthenticated') {
        // token is not valid... requires a redirect to login
      }
      if (data.error === 'resource_not_found') {
        console.log(data.error);
      }
    } else if (status >= 500 && data.error === 'server_error') {
      // dispatch some type of server error
    }
  }
};
