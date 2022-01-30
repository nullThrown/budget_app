import axios from 'axios';

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

    dispatch({ type: 'profile/dataLoaded', payload: res[0].data.profile });
    dispatch({
      type: 'recurring/dataLoaded',
      payload: res[0].data.profile.recurringPayments,
    });
    dispatch({ type: 'expenses/dataLoaded', payload: res[1].data });
  } catch (err) {
    if (!err.request.response) {
      return dispatch({ type: 'profile/dataLoadError' });
    }
    const { data, status } = err.response;
    if (status >= 400 && status < 500 && data.error === 'unauthenticated') {
      // token is not valid... requires a redirect to login
    } else if (status >= 500 && data.error === 'server_error') {
      dispatch({ type: 'finance/dataLoadError' });
    }
  }
};
