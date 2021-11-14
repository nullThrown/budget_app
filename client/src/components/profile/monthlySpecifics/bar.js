import { Bar } from 'react-chartjs-2';
const categories = [
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
const data = {
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
const options = {
  chart: {
    dataset: {
      data: {},
    },
    scale: {
      tick: {},
      pointlabel: {},
    },
    tooltip: {},
  },
};
export const BarGraph = () => {
  return (
    <article className='monthly-specifics'>
      <h2 className='heading-4 text-center'>Monthly Specifics</h2>
      <Bar data={data} className='monthly-graph' options={options} />
    </article>
  );
};
