const initialState = {
  status: 'idle',
  data: [],
};
// state updates should be more specific
// like expense slice
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
        status: 'error',
      };

    case 'recurring/createRecurring':
      return {
        ...state,
        status: 'create_success',
        data: payload,
      };
    case 'recurring/editRecurring':
      return {
        ...state,
        status: 'edit_success',
        data: payload,
      };

    case 'recurring/deleteRecurring':
      const { id, category } = payload;
      return {
        ...state,
        status: 'delete_success',
        data: payload,
      };
    default:
      return state;
  }
}
