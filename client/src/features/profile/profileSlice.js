import axios from 'axios';
const initialState = {
  monthlyTakeHome: 0,
  recurringPayments: [],
};

export default function profileReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case 'profile/profileLoaded':
      return payload.profile;

    default:
      return state;
  }
}

export const getProfile = () => async (dispatch) => {
  try {
    const res = await axios.get('http://localhost:4000/api/profile', {
      withCredentials: true,
    });
    dispatch({ type: 'profile/profileLoaded', payload: res.data });
  } catch (err) {
    const { data, status } = err.response;
    if (status === 400 && data.msg === 'token is not valid') {
      console.log(data.msg);
    }
  }
};
