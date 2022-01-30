const initialState = {
  status: 'idle',
  data: [],
};

export default function recurringReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case 'recurring/returnToIdle':
      return {
        ...state,
        status: 'idle',
      };
    case 'recurring/dataLoading':
      return {
        ...state,
        status: 'loading',
      };
    case 'recurring/dataLoaded':
      return {
        data: payload,
        status: 'idle',
      };
    case 'recurring/dataLoadError':
      return {
        ...state,
        status: 'loading',
      };

    case 'recurring/createRecurring':
      return {
        ...state,
        status: 'success',
        data: payload,
      };
    case 'recurring/editRecurring':
      return {
        ...state,
        status: 'success',
        data: payload,
      };

    case 'recurring/deleteRecurring':
      const { id, category } = payload;
      return {
        ...state,
        status: 'success',
        data: payload,
      };
    default:
      return state;
  }
}
