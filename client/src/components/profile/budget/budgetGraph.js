import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import './budgetGraph.css';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getProfile } from '../../../features/profile/profileSlice';
const BudgetGraph = ({ data, categories }) => {
  const dispatch = useDispatch();
  const selectPayments = (state) => {
    return state.profile.recurringPayments.map(
      ({ total, budget, category }) => ({ total, budget, category })
    );
  };
  dispatch(getProfile());
  const payments = useSelector(selectPayments);
  console.log(payments);
  const expenditures = useSelector((state) => state.expenditures);
  const [budgetData, setBudgetData] = useState([]);

  return (
    <section className='card monthly-specifics'>
      <h2 className='heading-4 text-center'>Budget</h2>
      <Bar data={data(categories)} className='monthly-graph' />
    </section>
  );
};

export default BudgetGraph;
