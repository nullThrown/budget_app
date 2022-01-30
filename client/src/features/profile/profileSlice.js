const initialState = {
  status: 'idle',
  monthlyTakeHome: null,
  salarySchedule: null,
  paycheckAmount: null,
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
        monthlyTakeHome: payload.monthlyTakeHome,
        salarySchedule: payload.salarySchedule,
        paycheckAmount: payload.paycheckAmount,
        status: 'idle',
      };
    case 'profile/dataLoadError':
      return {
        ...state,
        status: 'error',
      };

    default:
      return state;
  }
}
