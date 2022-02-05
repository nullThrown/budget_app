import axios from 'axios';
import handleErrors from '../../util/api/errorHandler';
export const createRecurring = (recurring) => async (dispatch) => {
  dispatch({ type: 'recurring/dataLoading' });
  try {
    const newRecurring = await axios.post(
      'http://localhost:4000/api/profile/recurring/create',
      recurring,
      {
        withCredentials: true,
      }
    );
    console.log(newRecurring.data);
    dispatch({ type: 'recurring/createRecurring', payload: newRecurring.data });
  } catch (err) {
    handleErrors(err, 'recurring', dispatch);
  }
};

export const editRecurring = (recurring) => async (dispatch) => {
  try {
    const newRecurring = await axios.put(
      'http://localhost:4000/api/profile/recurring/edit',
      recurring,
      {
        withCredentials: true,
      }
    );
    console.log(newRecurring.data);
    dispatch({ type: 'finance/editRecurring', payload: newRecurring.data });
  } catch (err) {
    handleErrors(err, 'recurring', dispatch);
  }
};

export const deleteRecurring =
  ({ id, category }) =>
  async (dispatch) => {
    try {
      const newRecurring = await axios.delete(
        `http://localhost:4000/api/profile/recurring/delete/${id}/${category}`,
        {
          withCredentials: true,
        }
      );
      console.log('axios delete success');
      dispatch({ type: 'finance/deleteRecurring', payload: { id, category } });
    } catch (err) {
      handleErrors(err, 'recurring', dispatch);
    }
  };
