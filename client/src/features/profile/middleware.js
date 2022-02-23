import axios from 'axios';
import handleErrors from '../../util/api/errorHandler';

export const createProfile = (profile) => async (dispatch) => {
  dispatch({ type: 'profile/dataLoading' });
  try {
    const res = await axios.post(
      'http://localhost:4000/api/profile/create',
      profile,
      {
        withCredentials: true,
      }
    );
    const { data } = res;
    console.log(res);
    dispatch({ type: 'profile/profileCreated', payload: data });
    dispatch({ type: 'recurring/dataLoaded', payload: data.recurringPayments });
  } catch (err) {
    handleErrors(err, 'profile', dispatch);
  }
};

export const createCategory = (category) => async (dispatch) => {
  dispatch({ type: 'profile/categoryCreateLoading' });
  try {
    const res = await axios.post(
      'http://localhost:4000/api/profile/category/create',
      category,
      {
        withCredentials: true,
      }
    );
    const { data } = res;
    dispatch({ type: 'profile/categoryCreated', payload: data });
  } catch (err) {
    handleErrors(err, 'profile', dispatch);
  }
};
