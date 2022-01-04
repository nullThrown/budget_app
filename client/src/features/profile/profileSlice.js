import axios from 'axios';

const initialState = {
  monthlyTakeHome: 3000,
  recurringPayments: [
    {
      _id: '61ca7f4bc3f1963b5cf00a0f',
      total: 1400,
      budget: 300,
      category: 'housing',
      payments: [
        {
          _id: '61ca7f4bc3f1963b5cf00a10',
          amount: 1200,
          name: 'mortgage/rent',
        },
        {
          _id: '61ca7f4bc3f1963b5cf00a11',
          amount: 200,
          name: 'insurance',
        },
      ],
    },
    {
      _id: '61ca7f4bc3f1963b5cf00a12',
      total: 250,
      budget: 300,
      category: 'vehicle',
      payments: [
        {
          _id: '61ca7f4bc3f1963b5cf00a13',
          amount: 0,
          name: 'loan',
        },
        {
          _id: '61ca7f4bc3f1963b5cf00a14',
          amount: 250,
          name: 'insurance',
        },
      ],
    },
    {
      _id: '61ca7f4bc3f1963b5cf00a15',
      total: 70,
      budget: 300,
      category: 'utilities',
      payments: [
        {
          _id: '61ca7f4bc3f1963b5cf00a16',
          amount: 25,
          name: 'cell plan',
        },
        {
          _id: '61ca7f4bc3f1963b5cf00a17',
          amount: 0,
          name: 'cell loan',
        },
        {
          _id: '61ca7f4bc3f1963b5cf00a18',
          amount: 45,
          name: 'internet',
        },
      ],
    },
    {
      _id: '61ca7f4bc3f1963b5cf00a1c',
      total: 440,
      budget: 300,
      category: 'health',
      payments: [
        {
          _id: '61ca7f4bc3f1963b5cf00a1d',
          amount: 400,
          name: 'insurance',
        },
        {
          _id: '61ca7f4bc3f1963b5cf00a1e',
          amount: 40,
          name: 'fitness',
        },
      ],
    },
    {
      _id: '61ca7f4bc3f1963b5cf00a1c',
      total: 0,
      budget: 200,
      category: 'dining',
      payments: [],
    },
    {
      _id: '61ca7f4bc3f1963b5cf00a1c',
      total: 0,
      budget: 340,
      category: 'misc',
      payments: [],
    },
  ],
};

export default function profileReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case 'profile/profileLoaded':
      return state;
    default:
      return state;
  }
}

export const getProfile = () => async (dispatch) => {
  const res = await axios.get('http://localhost:4000/api/profile', {
    withCredentials: true,
  });
  console.log(res);

  dispatch({ type: 'profile/profileLoaded', payload: res.data });
};
