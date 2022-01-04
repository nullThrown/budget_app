const initialState = [
  {
    date: '7-13-21',
    description: 'movie: Spider Man returns',
    category: 'misc',
    necessity: false,
    amount: 13.27,
  },
  {
    date: '7-13-21',
    description: 'monster energy',
    category: 'misc',
    necessity: false,
    amount: 3.99,
  },
  {
    date: '7-25-21',
    description: 'Hello fish',
    category: 'dining',
    necessity: true,
    amount: 43.69,
  },
  {
    date: '7-25-21',
    description: 'drywall',
    category: 'housing',
    necessity: true,
    amount: 600,
  },
];

export default function expendituresReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case 'expenditures/':
      return;

    default:
      return state;
  }
}
