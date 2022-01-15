import axios from 'axios';

const initialState = {
  status: 'idle',
  monthlyTakeHome: null,
  salarySchedule: null,
  paycheckAmount: null,
  recurringPayments: [],
  expenditures: [],
};

export default function financeReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case 'finance/dataLoading':
      return {
        ...state,
        status: 'loading',
      };
    case 'finance/dataLoaded':
      const { profile } = payload[0];
      return {
        ...state,
        status: 'idle',
        monthlyTakeHome: profile.monthlyTakeHome,
        salarySchedule: profile.salarySchedule,
        paycheckAmount: profile.paycheckAmount,
        recurringPayments: profile.recurringPayments,
        expenditures: payload[1],
      };
    case 'finance/dataLoadError':
      return { ...state, status: 'failed' };
    case 'finance/createExpense':
      return;
    case 'finance/editExpense':
      return;
    case 'finance/deleteExpense':
      return;
    case 'finance/addRecurring':
      return;
    case 'finance/editRecurring':
      return;
    case 'finance/deleteRecurring':
      return;

    default:
      return state;
  }
}

export const getFinancialData = () => async (dispatch) => {
  dispatch({ type: 'finance/dataLoading' });
  try {
    const profile = axios.get('http://localhost:4000/api/profile', {
      withCredentials: true,
    });
    const expenses = axios.get('http://localhost:4000/api/exp/month/2022/0', {
      withCredentials: true,
    });

    const res = await Promise.all([profile, expenses]);
    dispatch({
      type: 'finance/dataLoaded',
      payload: res.map((item) => item.data),
    });
  } catch (err) {
    const { data, status } = err.response;
    if (status >= 400 && status < 500 && data.error === 'unauthenticated') {
      // token is not valid... requires a redirect to login
    } else if (status >= 500 && data.error === 'server_error') {
      dispatch({ type: 'finance/dataLoadError' });
    }
  }
};
