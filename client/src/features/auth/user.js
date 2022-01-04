import axios from 'axios';
const initialState = {};
export default function userReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case 'user/registerUser':
      // const { firstName, lastName, email } = payload;
      // return { firstName, lastName, email };
      return state;
    case 'user/loginUser':
      const { firstName, lastName, email } = payload;
      return { firstName, lastName, email };
    case 'user/logoutUser':
      return;

    default:
      return state;
  }
}

export const registerUser = (user) => async (dispatch) => {
  const res = await axios.post(
    'http://localhost:4000/api/auth/register',
    user,
    {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    }
  );
  dispatch({ type: 'user/registerUser', payload: res.data });
};

export const loginUser = (user) => async (dispatch) => {
  const res = await axios.post('http://localhost:4000/api/auth/login', user, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  console.log(res);
  dispatch({ type: 'user/loginUser', payload: res.data });
};
