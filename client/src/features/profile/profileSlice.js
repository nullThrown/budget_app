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
    case 'profile/returnToIdle':
      return {
        ...state,
        status: 'idle',
      };
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
    case 'profile/profileCreated':
      return {
        ...state,
        status: 'success',
        monthlyTakeHome: payload.monthlyTakeHome,
        salarySchedule: payload.salarySchedule,
        paycheckAmount: payload.paycheckAmount,
        categories: payload.categories,
      };
    case 'profile/categoryCreateLoading':
      return {
        ...state,
        status: 'cat_loading',
      };
    case 'profile/categoryCreated':
      return {
        ...state,
        status: 'cat_success',
        categories: [...state.categories, payload],
      };
    case 'profile/categoryCreateError':
      return {
        ...state,
        status: 'cat_error',
      };

    default:
      return state;
  }
}
