import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Loading from '../components/common/loading/loading';
import ServerError from '../components/alert/serverError';
import Overview from '../components/profile/overview/overview';
import Expenditures from '../components/profile/expenditures/expenditures';
import BudgetGraph from '../components/profile/budget/budgetGraph';
import Recurring from '../components/profile/recurring/recurring';
import { categories, barData, doughnutData } from '../data/currentMonth';
import ExpenseModal from '../components/common/modal/expense/modal';

const Home = () => {
  const loadingStatus = useSelector((state) => state.profile.status);

  const [isOpen, setIsOpen] = useState(false);
  const [expenseItemId, setExpenseItemId] = useState('');

  const openModal = (id) => {
    setExpenseItemId(id);
    setIsOpen(true);
  };
  const closeModal = () => setIsOpen(false);

  if (loadingStatus === 'loading') {
    return (
      <div className='profile__error-placement'>
        <Loading className='profile__error-placement' />
      </div>
    );
  }
  if (loadingStatus === 'failed') {
    return (
      <div className='profile__error-placement'>
        <ServerError className='profile__error-placement' />
      </div>
    );
  }
  return (
    <>
      <ExpenseModal
        isOpen={isOpen}
        closeModal={closeModal}
        expenseId={expenseItemId}
      />
      <Overview doughnutData={doughnutData} />
      <Recurring />
      <BudgetGraph data={barData} categories={categories} />
      <Expenditures openModal={openModal} />
    </>
  );
};

export default Home;
