import { Bar } from 'react-chartjs-2';
import './budgetGraph.css';
import { useSelector } from 'react-redux';

const BudgetGraph = ({ data, categories }) => {
  const selectPayments = (state) => {
    return state.profile.recurringPayments.map(
      ({ total, budget, category }) => ({ total, budget, category })
    );
  };
  const payments = useSelector(selectPayments);
  const expenditures = useSelector((state) => state.expenditures);

  return (
    <section className='card monthly-specifics'>
      <h2 className='heading-4 text-center'>Budget</h2>
      <Bar data={data(categories)} className='monthly-graph' />
    </section>
  );
};

export default BudgetGraph;
