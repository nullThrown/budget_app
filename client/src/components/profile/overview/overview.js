import { useState, useEffect } from 'react';
import './overview.css';
import { Doughnut } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
const Overview = ({ doughnutData }) => {
  const [data, setData] = useState({
    necessitySpent: 0,
    indulgentSpent: 0,
    remaining: 0,
  });

  const selectRecurringTotal = (state) => {
    return state.profile.recurringPayments.reduce((acc, current) => {
      return acc + current.total;
    }, 0);
  };
  const selectExpNecessityTotal = (state) => {
    return state.expenditures.reduce((acc, current) => {
      if (current.necessity) return acc + current.amount;
      return acc;
    }, 0);
  };
  const selectExpIndulgentTotal = (state) => {
    return state.expenditures.reduce((acc, current) => {
      if (!current.necessity) return acc + current.amount;
      return acc;
    }, 0);
  };
  const takeHomeAmount = useSelector((state) => state.profile.monthlyTakeHome); // 4000
  const expNecessityTotal = useSelector(selectExpNecessityTotal); //200
  const expIndulgentTotal = useSelector(selectExpIndulgentTotal); //233
  const recurringTotal = useSelector(selectRecurringTotal); //4543
  //  profile data -- [necessity, indulgent, remaining]
  // should be [4743, 233, -976]

  useEffect(() => {
    setData(() => {
      data.necessitySpent = recurringTotal + expNecessityTotal;
      data.indulgentSpent = expIndulgentTotal;
      data.remaining = 0;
      // takeHomeAmount - (data.induglentSpent + data.necessitySpent);
      return data;
    });
  }, [takeHomeAmount, expNecessityTotal, expIndulgentTotal, recurringTotal]);
  const DoughnutData = Object.values(data);
  // console.log(DoughnutData);

  return (
    <section className='card budget'>
      <h3 className='heading-4 text-center'>Overview</h3>
      <div className='budget-box'>
        <BudgetItem
          title={'Take-home pay'}
          amountClass={'item-amount--green'}
          amount={takeHomeAmount}
        />
        <Doughnut data={doughnutData(DoughnutData)} className='pie-chart' />
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
