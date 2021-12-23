export const budgetData = {
  takeHomePay: 4000,
  necessity: 1500,
  indulgent: 300,
  remaining: 1200,
};
export const categories = [
  {
    title: 'vehicle',
    budget: 500,
    spent: 255,
  },
  {
    title: 'misc',
    budget: 400,
    spent: 123.34,
  },
  {
    title: 'Dining',
    budget: 200,
    spent: 65.33,
  },
  {
    title: 'utlities',
    budget: 400,
    spent: 356,
  },
  {
    title: 'vehicle',
    budget: 500,
    spent: 255,
  },
  {
    title: 'misc',
    budget: 400,
    spent: 123.34,
  },
  {
    title: 'Dining',
    budget: 200,
    spent: 65.33,
  },
];
export const barData = {
  labels: categories.map((cat) => cat.title),
  datasets: [
    {
      label: 'Money Spent',
      data: categories.map((cat) => cat.spent),
      backgroundColor: 'rgba(210, 168, 162,.9)',
      stack: 'Stack 0',
    },
    {
      label: 'Budget',
      data: categories.map((cat) => cat.budget),
      backgroundColor: 'rgba(203, 246, 203, 0.9)',
      stack: 'Stack 1',
    },
  ],
};

export const doughnutData = {
  labels: ['Necessity Spent', 'Indulgent Spent', 'Remaining'],
  datasets: [
    {
      label: '# of Votes',
      data: Object.values(budgetData).splice(1, 3),
      backgroundColor: [
        'rgb(236, 168, 162, .6)',
        'rgba(153, 102, 255, 0.25)',
        'rgb(196, 248, 221)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(6, 95, 70, .4)',
      ],
      borderWidth: 1,
    },
  ],
};
export const expData = [
  {
    date: '7 - 1 - 25',
    description: "ron's coffee",
    category: 'Dining',
    necessity: false,
    amount: 3.27,
  },
  {
    date: '7 - 1 - 25',
    description: "ron's coffee",
    category: 'Dining',
    necessity: true,
    amount: 13.55,
  },
  {
    date: '7 - 1 - 25',
    description: 'gym membership for the new thing',
    category: 'Dining',
    necessity: true,
    amount: 10.13,
  },
];
