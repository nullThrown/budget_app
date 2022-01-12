import axios from 'axios';
// watch brad traversy video to see his user state implementation
const initialState = {
  user: {},
  isAuth: null,
};
export default function userReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case 'user/userLoaded':
      return { ...state, user: payload.user, isAuth: true };
    case 'user/userLoadedError':
      return { user: {}, isAuth: false };
    case 'user/registerUser':
      return state;

    case 'user/loginUser':
      const { firstName, lastName, email } = payload;
      return { firstName, lastName, email };
    case 'user/logoutUser':
      return;
    case 'user/updateUser':
      return { user: payload.user, isAuth: true };

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

export const getUser = () => async (dispatch) => {
  try {
    const res = await axios.get('http://localhost:4000/api/user/me');
    dispatch({ type: 'user/userLoaded', payload: res.data });
  } catch (err) {
    const { status, data } = err.response;
    if (status === 400 && data.msg === 'token is not valid') {
      return;
    }
  }
};
