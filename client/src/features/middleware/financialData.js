import axios from 'axios';
import handleErrors from '../../util/api/errorHandler';
export const getFinancialData = (year, month) => async (dispatch) => {
  dispatch({ type: 'profile/dataLoading' });
  try {
    const profile = axios.get('http://localhost:4000/api/profile', {
      withCredentials: true,
    });
    const expenses = axios.get(
      `http://localhost:4000/api/exp/month/${year}/${month}`,
      {
        withCredentials: true,
      }
    );

    const res = await Promise.all([profile, expenses]);
    dispatch({ type: 'profile/dataLoaded', payload: res[0].data });
    dispatch({
      type: 'recurring/dataLoaded',
      payload: res[0].data.recurringPayments,
    });
    dispatch({ type: 'expenses/dataLoaded', payload: res[1].data });
  } catch (err) {
    handleErrors(err, 'profile', dispatch);
  }
};
