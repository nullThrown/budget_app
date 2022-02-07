const initialState = {
  status: 'idle',
  monthlyTakeHome: null,
  salarySchedule: null,
  paycheckAmount: null,
  categories: [],
};

export default function ProfileReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case 'profile/dataLoading':
      return {
        ...state,
        status: 'loading',
      };
    case 'profile/dataLoaded':
      return {
        status: 'idle',
        monthlyTakeHome: payload.monthlyTakeHome,
        salarySchedule: payload.salarySchedule,
        paycheckAmount: payload.paycheckAmount,
        categories: payload.categories,
      };
    case 'profile/dataLoadError':
      return {
        ...state,
        status: 'error',
      };
    case 'profile/updateCategories':
      return {
        ...state,
        categories: payload,
      };

    default:
      return state;
  }
}
