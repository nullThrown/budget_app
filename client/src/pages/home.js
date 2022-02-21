import { useSelector } from 'react-redux';
import Loading from '../components/common/loading/loading';
import ServerError from '../components/alert/serverError';
import Overview from '../components/profile/overview/overview';
import Expenses from '../components/profile/expenses/expenses';
import BudgetGraph from '../components/profile/budget/budgetGraph';
import Recurring from '../components/profile/recurring/recurring';
import { barData, categories, doughnutData } from '../data/currentMonth';

const Home = () => {
  const status = useSelector((state) => state.profile.status);

  if (status === 'loading') {
    return (
      <div className='profile__error-placement'>
        <Loading className='profile__error-placement' />
      </div>
    );
  }
  if (status === 'error') {
    return (
      <div className='profile__error-placement'>
        <ServerError className='profile__error-placement' />
      </div>
    );
  }
  return (
    <>
      <Overview doughnutData={doughnutData} />
      <Recurring />
      <BudgetGraph barData={barData} categories={categories} />
      <Expenses />
    </>
  );
};

export default Home;
