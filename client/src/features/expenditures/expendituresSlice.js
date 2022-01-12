import axios from 'axios';
const initialState = [];

export default function expendituresReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case 'exp/expendituresLoaded':
      return payload;
    case 'exp/createExpenditures':
      return { ...state, payload };
    case 'exp/deleteExpenditure':
      return payload;

    default:
      return state;
  }
}

export const getExpByCurrentMonth = () => async (dispatch) => {
  try {
    const res = await axios.get('http://localhost:4000/api/exp/current-month', {
      withCredentials: true,
    });
    dispatch({ type: 'exp/expendituresLoaded', payload: res.data });
  } catch (err) {
    const { data, status } = err.response;
    if (status === 400 && data.msg === 'token is not valid') {
      console.log(data.msg);
    }
  }
};
