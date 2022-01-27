import axios from 'axios';

const initialState = {
  status: 'idle',
  monthlyTakeHome: null,
  salarySchedule: null,
  paycheckAmount: null,
  recurringPayments: [],
  expenses: [],
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
        expenses: payload[1],
      };
    case 'finance/dataLoadError':
      return { ...state, status: 'failed' };

    case 'finance/createExpense':
      return {
        ...state,
        expenses: [...state.expenses, payload],
      };

    case 'finance/editExpense':
      return {};

    case 'finance/deleteExpense':
      return {
        ...state,
        expenses: [
          ...state.expenses.filter((expense) => expense._id !== payload),
        ],
      };
    case 'finance/createRecurring':
      return {
        ...state,
        recurringPayments: payload,
      };
    case 'finance/editRecurring':
      return { ...state, recurringPayments: payload };
    case 'finance/deleteRecurring':
      const { id, category } = payload;
      return {
        ...state,
        recurringPayments: [
          ...state.recurringPayments.map((recurring) => {
            if (recurring.category === category) {
              return {
                ...recurring,
                payments: [
                  ...recurring.payments.filter((pay) => pay._id !== id),
                ],
              };
            } else {
              return recurring;
            }
          }),
        ],
      };

    default:
      return state;
  }
}

export const getFinancialData = (year, month) => async (dispatch) => {
  dispatch({ type: 'finance/dataLoading' });
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
    dispatch({
      type: 'finance/dataLoaded',
      payload: res.map((item) => item.data),
    });
  } catch (err) {
    if (!err.request.response) {
      return dispatch({ type: 'finance/dataLoadError' });
    }
    const { data, status } = err.response;
    if (status >= 400 && status < 500 && data.error === 'unauthenticated') {
      // token is not valid... requires a redirect to login
    } else if (status >= 500 && data.error === 'server_error') {
      dispatch({ type: 'finance/dataLoadError' });
    }
  }
};
