import './overview.css';
import { Doughnut } from 'react-chartjs-2';

const Budget = ({ doughnut, budget }) => {
  return (
    <section className='card budget'>
      <h3 className='heading-4 text-center'>Overview</h3>
      <div className='budget-box'>
        <BudgetItem
          title={'Take-home pay'}
          amountClass={'item-amount--green'}
          amount={budget.takeHomePay}
        />
        <Doughnut data={doughnut} className='pie-chart' />
      </div>
    </section>
  );
};

//choose better name than item
// keep this in case all data is to be displayed in plain text
const BudgetItem = (props) => {
  const { title, amountClass, amount } = props;
  return (
    <div className='budget-item'>
      <p className='item-title'>{title}</p>
      <span className={amountClass}>$ {amount}</span>
    </div>
  );
};

export default Budget;
