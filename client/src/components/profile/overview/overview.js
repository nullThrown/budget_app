/* eslint-disable */
import { useState, useEffect } from 'react';
import './overview.css';
import { Doughnut } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import OverviewItem from './overviewItem';

const Overview = ({ doughnutData }) => {
  const takeHomeAmount = useSelector((state) => state.profile.monthlyTakeHome);
  const [data, setData] = useState({
    takeHomeAmount: takeHomeAmount || 0,
    necessitySpent: 0,
    indulgentSpent: 0,
  });
  const [remaining, setRemaining] = useState(0);

  // returns sum total of recurring payments
  const recurringPayments = useSelector((state) =>
    state.recurring.data?.reduce((acc, current) => {
      return (
        acc + current.payments.reduce((acc, current) => acc + current.amount, 0)
      );
    }, 0)
  );

  const dividedExpenses = useSelector((state) => {
    let expensesTuple = [0, 0];
    state.expenses.data?.forEach((exp) => {
      if (exp.necessity) {
        expensesTuple[0] += exp.amount;
      } else {
        expensesTuple[1] += exp.amount;
      }
    });
    return expensesTuple;
  });

  useEffect(() => {
    setData({
      ...data,
      takeHomeAmount: takeHomeAmount,
    });
  }, [takeHomeAmount]);

  useEffect(() => {
    setData({
      ...data,
      necessitySpent: recurringPayments + dividedExpenses[0] || 0,
      indulgentSpent: dividedExpenses[1] || 0,
    });
  }, [recurringPayments, dividedExpenses[0], dividedExpenses[1]]);

  useEffect(() => {
    setRemaining((prev) => {
      return (prev =
        data.takeHomeAmount - (data.necessitySpent + data.indulgentSpent));
    });
  }, [data]);

  return (
    <section className='card overview'>
      <h3 className='heading-4 text-center'>Overview</h3>
      <div className='card-main-content-box'>
        <div className='overview-item-box'>
          <OverviewItem
            title='Take-home pay:'
            amountClass='item-amount--green'
            amount={data.takeHomeAmount}
          />
          <OverviewItem
            title='Necessity Spent: '
            amountClass='item-amount--red'
            amount={data.necessitySpent}
          />
          <OverviewItem
            title='Indugent Spent:'
            amountClass='item-amount--red'
            amount={data.indulgentSpent}
          />
        </div>
        {/* nec, indulg, rem */}
        <Doughnut
          data={doughnutData([
            data.necessitySpent,
            data.indulgentSpent,
            remaining,
          ])}
          className='pie-chart'
        />
        <OverviewItem
          title={'Remaining:'}
          amountClass={'item-amount--green text-md'}
          titleClass='text-md'
          amount={remaining}
        />
      </div>
    </section>
  );
};

export default Overview;
