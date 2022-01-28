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
      // state returned will need to be json profile data from API
      return {
        state,
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
