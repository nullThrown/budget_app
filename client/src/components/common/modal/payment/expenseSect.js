import { useState } from 'react';
import { createExpense } from '../../../../features/middleware/expense';
import { useDispatch } from 'react-redux';
const ExpenseSection = ({ categories }) => {
  const dispatch = useDispatch();
  const [expense, setExpense] = useState({
    title: null,
    amount: null,
    description: null,
    category: null,
    necessity: true,
  });

  const onInputChange = (e) => {
    setExpense({ ...expense, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createExpense(expense));
  };

  return (
    <section className='modal-expense-sect'>
      <form className='modal__payment-form'>
        <p className='heading-6 text-center modal__payment-title'>One Time</p>
        <input
          type='text'
          className='input-border-bottom input-expense__title'
          name='title'
          placeholder='title'
          onChange={onInputChange}
          value={expense.title}
        />
        <input
          name='category'
          list='payment-categories'
          placeholder='category'
          className='input-border-bottom input-expense__categories'
          onChange={onInputChange}
          value={expense.category}
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
        />
        <datalist id='payment-categories'>
          {categories.map((cat) => {
            return <option value={cat}></option>;
          })}
        </datalist>

        <button
          type='submit'
          className='btn btn-submit modal__expense-submit-btn'
          onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </section>
  );
};

export default ExpenseSection;
