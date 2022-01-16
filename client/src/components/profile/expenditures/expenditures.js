import React, { useState } from 'react';
import '../expenditures/expenditures.css';
import { Header } from './header';
import { Table } from './table';
import { useSelector, useDispatch } from 'react-redux';
import { createExpense } from '../../../features/finance/financeReducer';

const dummyExpense = {
  title: 'length-1 test',
  amount: 11.11,
  description: 'testing grabbing last element',
  necessity: true,
  category: 'testing',
};

const Expenditures = ({ data }) => {
  const dispatch = useDispatch();
  const selectExpenditures = (state) => state.finance.expenses;
  const expenditures = useSelector(selectExpenditures);

  const handleNewExpense = (e) => {
    e.preventDefault();
    dispatch(createExpense(dummyExpense));
  };

  return (
    <div className='card expenditures-box'>
      <button
        className='btn btn-submit'
        type='submit'
        onClick={handleNewExpense}>
        Add Expense
      </button>
      <section className='exp-box'>
        <Header />
        <main className='main'>
          <Table data={expenditures} />
        </main>
      </section>
    </div>
  );
};

export default Expenditures;
