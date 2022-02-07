import axios from 'axios';
import handleErrors from '../../util/api/errorHandler';
const initialState = {
  status: 'idle',
  user: {},
  isAuth: null,
};
export default function userReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case 'user/returnToIdle':
      return {
        ...state,
        status: 'idle',
      };
    case 'user/dataLoading':
      return {
        ...state,
        status: 'loading',
      };
    case 'user/dataLoaded':
      return { status: 'success', user: payload.user, isAuth: true };

    case 'user/dataLoadError':
      return { ...state, status: 'error' };

    case 'user/invalidCredentials':
      return {
        ...state,
        status: 'invalid_credentials',
      };
    case 'user/emailAlreadyExists':
      return {
        ...state,
        status: 'email_already_exists',
      };

    case 'user/logoutUser':
      return;

    case 'user/updateUser':
      return { ...state, user: payload.user };

    default:
      return state;
  }
}

export const registerUser = (user) => async (dispatch) => {
  dispatch({ type: 'user/dataLoading' });
  try {
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
    console.log(res.data);
    dispatch({ type: 'user/dataLoaded', payload: res.data });
  } catch (err) {
    handleErrors(err, 'user', dispatch);
  }
};

export const loginUser = (user) => async (dispatch) => {
  dispatch({ type: 'user/dataLoading' });
  try {
    const res = await axios.post('http://localhost:4000/api/auth/login', user, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(res);
    dispatch({ type: 'user/dataLoaded', payload: res.data });
  } catch (err) {
    handleErrors(err, 'user', dispatch);
  }
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
