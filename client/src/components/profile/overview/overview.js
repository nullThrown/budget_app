import './overview.css';
import { Doughnut } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { doughnutData } from '../../../data/currentMonth';

const Budget = ({ doughnut }) => {
  const selectProfileData = (state) => {
    const recurringPayments = state.profile.recurringPayments;
    return recurringPayments.reduce((acc, obj) => {
      return acc + obj.total;
    }, 0);
  };
  const takeHomeAmount = useSelector((state) => state.profile.monthlyTakeHome);
  const profileData = useSelector(selectProfileData);
  const DoughnutData = [takeHomeAmount, profileData, 100];
  return (
    <section className='card budget'>
      <h3 className='heading-4 text-center'>Overview</h3>
      <div className='budget-box'>
        <BudgetItem
          title={'Take-home pay'}
          amountClass={'item-amount--green'}
          amount={takeHomeAmount}
        />
        <Doughnut data={doughnut(DoughnutData)} className='pie-chart' />
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

export default Budget;
