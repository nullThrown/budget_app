import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import './budgetGraph.css';
import { useSelector } from 'react-redux';

const BudgetGraph = ({ barData }) => {
  const categories = useSelector((state) => state.profile.categories);

  return (
    <section className='card monthly-specifics'>
      <h2 className='heading-4 text-center'>Budget</h2>
      <div className='card-main-content-box budget-graph-box'>
        <Bar
          data={barData(categories)}
          className='budget-graph'
          options={{ maintainAspectRatio: false }}
        />
      </div>
    </section>
  );
};

export default BudgetGraph;
