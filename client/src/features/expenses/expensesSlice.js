const initialState = {
  status: 'idle',
  data: [],
};

export default function expensesReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case 'expenses/returnToIdle':
      return {
        ...state,
        status: 'idle',
      };
    case 'expenses/dataLoading':
      return {
        ...state,
        status: 'loading',
      };

    case 'expenses/dataLoaded':
      return {
        ...state,
        status: 'idle',
        data: payload,
      };

    case 'expenses/dataLoadError':
      return {
        ...state,
        status: 'error',
      };

    case 'expenses/createExpense':
      return {
        ...state,
        status: 'success',
        data: [...state.data, payload],
      };

    case 'expenses/editExpense':
      return {};

    case 'expenses/deleteExpense':
      return {
        ...state,
        status: 'success',
        data: [...state.data.filter((expense) => expense._id !== payload)],
      };

    default:
      return state;
  }
}
