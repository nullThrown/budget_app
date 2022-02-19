import React from 'react';
import './expenses.css';
import Header from './header';
import Table from './table';
import { useSelector } from 'react-redux';

const Expenses = () => {
  const expenses = useSelector((state) => state.expenses.data);

  return (
    <>
      <div className='card expenditures-box'>
        <section className='exp-box'>
          <Header />
          <div className='card-main-content-box'>
            <Table expenses={expenses} />
          </div>
        </section>
      </div>
    </>
  );
};

export default Expenses;
