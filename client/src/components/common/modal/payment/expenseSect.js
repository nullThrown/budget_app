import { useState } from 'react';
import { createExpense } from '../../../../features/expenses/middleware';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../../common/loading/loading';
import Success from '../../../alert/success';
import { Alert } from '../../../alert/alert';
const ExpenseSection = ({ categories, closeModal }) => {
  const dispatch = useDispatch();
  const expenseStatus = useSelector((state) => state.expenses.status);

  const [expense, setExpense] = useState({
    title: '',
    amount: '',
    description: '',
    category: '',
    necessity: true,
  });

  const onInputChange = (e) => {
    setExpense({ ...expense, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createExpense(expense));
  };
  if (expenseStatus === 'loading') {
    return (
      <div className='center-container'>
        <Loading />
      </div>
    );
  }
  if (expenseStatus === 'success') {
    return (
      <Success
        text='Payment Added Successfully!'
        actionCreator={{ type: 'expenses/returnToIdle' }}
        closeModal={closeModal}
      />
    );
  }

  return (
    <section className='modal-expense-sect'>
      {expenseStatus === 'error' && <Alert msg='Something went wrong' />}
      <form onSubmit={handleSubmit} className='modal__payment-form'>
        <p className='heading-6 text-center modal__payment-title'>One Time</p>
        <input
          type='text'
          className='input-border-bottom input-expense__title'
          name='title'
          placeholder='title'
          onChange={onInputChange}
          value={expense.title}
          required
        />
        <input
          name='category'
          list='payment-categories'
          placeholder='category'
          className='input-border-bottom input-expense__categories'
          onChange={onInputChange}
          value={expense.category}
          required
        />
        <input
          type='text'
          className='input-border-bottom input-expense__desc'
          name='description'
          placeholder='description'
          onChange={onInputChange}
          value={expense.description}
        />
        <input
          type='text'
          className='input-border-bottom input-expense__amount'
          name='amount'
          placeholder='amount'
          onChange={onInputChange}
          value={expense.amount}
          required
        />
        <datalist id='payment-categories'>
          {categories.map((cat) => {
            return <option value={cat}></option>;
          })}
        </datalist>

        <button
          type='submit'
          className='btn btn-submit modal__expense-submit-btn'>
          Submit
        </button>
      </form>
    </section>
  );
};

export default ExpenseSection;
