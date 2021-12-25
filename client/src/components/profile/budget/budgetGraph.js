import { Bar } from 'react-chartjs-2';
import './budgetGraph.css';

const BudgetGraph = ({ data }) => {
  return (
    <section className='card monthly-specifics'>
      <h2 className='heading-4 text-center'>Budget</h2>
      <Bar data={data} className='monthly-graph' />
    </section>
  );
};

export default BudgetGraph;
