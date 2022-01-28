import './overview.css';
import { Doughnut } from 'react-chartjs-2';
import { useSelector } from 'react-redux';

const Overview = ({ doughnutData }) => {
  // eslint-disable-next-line
  // const selectRecurringTotal = (state) => {
  //   return state.finance.recurringPayments.reduce((acc, current) => {
  //     return acc + current.total;
  //   }, 0);
  // };
  // // eslint-disable-next-line
  // const selectExpNecessityTotal = (state) => {
  //   return state.finance.expenses.reduce((acc, current) => {
  //     if (current.necessity) return acc + current.amount;
  //     return acc;
  //   }, 0);
  // };
  // // eslint-disable-next-line
  // const selectExpIndulgentTotal = (state) => {
  //   return state.finance.expenses.reduce((acc, current) => {
  //     if (!current.necessity) return acc + current.amount;
  //     return acc;
  //   }, 0);
  // };
  const takeHomeAmount = useSelector((state) => state.profile.monthlyTakeHome);
  // eslint-disable-next-line
  // const expNecessityTotal = useSelector(selectExpNecessityTotal);
  // const expIndulgentTotal = useSelector(selectExpIndulgentTotal);
  // const recurringTotal = useSelector(selectRecurringTotal);

  return (
    <section className='card budget'>
      <h3 className='heading-4 text-center'>Overview</h3>
      <div className='budget-box'>
        <BudgetItem
          title={'Take-home pay'}
          amountClass={'item-amount--green'}
          amount={takeHomeAmount}
        />
        {/* nec, indulg, rem */}
        <Doughnut data={doughnutData([100, 200, 300])} className='pie-chart' />
      </div>
    </section>
  );
};

//choose better name than item
// keep this in case all amounts are to be presented explicitly
const BudgetItem = (props) => {
  const { title, amountClass, amount } = props;
  return (
    <div className='budget-item'>
      <p className='item-title'>{title}</p>
      <span className={amountClass}>$ {amount}</span>
    </div>
  );
};

export default Overview;
