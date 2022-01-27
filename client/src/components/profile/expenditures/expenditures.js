import React from 'react';
import '../expenditures/expenditures.css';
import { Header } from './header';
import { Table } from './table';
import { useSelector, useDispatch } from 'react-redux';
import {
  createExpense,
  deleteExpense,
} from '../../../features/middleware/expense';

const dummyExpense = {
  title: 'item 3',
  amount: 11.11,
  description: 'test item',
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
  const handleDeleteExpense = (e) => {
    e.preventDefault();
    dispatch(deleteExpense('61e9f361103bf5119c38dc2a'));
  };
  return (
    <div className='card expenditures-box'>
      <button
        className='btn btn-submit'
        type='submit'
        onClick={handleDeleteExpense}>
        Del Expense
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
