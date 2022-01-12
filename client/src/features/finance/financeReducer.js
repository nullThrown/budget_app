const initialState = {
  monthlyTakeHome: null,
  salarySchedule,
  recurringPayments: [],
  expenditures: [],
};

export default function financeReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case 'finance/dataLoading':
      return;
    case 'finance/dataLoaded':
      return;
    case 'finance/dataLoadError':
      return;
    case 'finance/createExpenditure':
      return;
    case 'finance/editExpenditure':
      return;
    case 'finance/deleteExpenditure':
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
