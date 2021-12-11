export const budgetData = {
    takeHomePay: 43000, 
    necessity: 35000,
    indulgent: 2000,
    remaining: 6000,
  }
  export const categories = [
   
        {
          title: 'vehicle',
          budget: 3000,
          spent: 1200,
        },
        {
          title: 'misc',
          budget: 4000,
          spent: 3000,
        },
        {
          title: 'Dining',
          budget: 3000,
          spent: 2300,
        },
        {
          title: 'utlities',
          budget: 5000,
          spent: 4000,
        },
        {
          title: 'vehicle',
          budget: 2000,
          spent: 1700,
        },
        {
          title: 'misc',
          budget: 3000,
          spent: 2000,
        },
        {
          title: 'Dining',
          budget: 4000,
          spent: 3400,
        },
      ]
  export const barData = {
      labels: categories.map((cat) => cat.title),
      datasets: [
        {
          label: 'Money Spent',
          data: categories.map((cat) => cat.spent),
          backgroundColor: 'rgb(210, 168, 162)',
          stack: 'Stack 0',
        },
        {
          label: 'Budget',
          data: categories.map((cat) => cat.budget),
          backgroundColor: 'rgba(203, 246, 203, 0.9)',
          stack: 'Stack 0',
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