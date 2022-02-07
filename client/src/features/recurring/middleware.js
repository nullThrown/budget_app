import axios from 'axios';
import handleErrors from '../../util/api/errorHandler';

export const createRecurring = (recurring) => async (dispatch) => {
  dispatch({ type: 'recurring/dataLoading' });
  try {
    const res = await axios.post(
      'http://localhost:4000/api/profile/recurring/create',
      recurring,
      {
        withCredentials: true,
      }
    );
    const { data } = res;
    dispatch({
      type: 'recurring/createRecurring',
      payload: data.recurringPayments,
    });
    dispatch({
      type: 'profile/updateCategories',
      payload: data.categories,
    });
  } catch (err) {
    handleErrors(err, 'recurring', dispatch);
  }
};

export const editRecurring = (recurring) => async (dispatch) => {
  try {
    const res = await axios.put(
      'http://localhost:4000/api/profile/recurring/edit',
      recurring,
      {
        withCredentials: true,
      }
    );
    dispatch({ type: 'finance/editRecurring', payload: res.data });
  } catch (err) {
    handleErrors(err, 'recurring', dispatch);
  }
};

export const deleteRecurring =
  ({ id, category }) =>
  async (dispatch) => {
    try {
      const res = await axios.delete(
        `http://localhost:4000/api/profile/recurring/delete/${id}/${category}`,
        {
          withCredentials: true,
        }
      );
      dispatch({ type: 'finance/deleteRecurring', payload: { id, category } });
    } catch (err) {
      handleErrors(err, 'recurring', dispatch);
    }
  };
