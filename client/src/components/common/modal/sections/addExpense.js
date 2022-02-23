import { useState } from 'react';
import { createExpense } from '../../../../features/expenses/middleware';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../loading/loading';
import Success from '../../../alert/success';
import { Alert } from '../../../alert/alert';
import NecessitySelect from '../necessitySelect';
import { BsArrowReturnLeft } from 'react-icons/bs';
const Expense = ({ categories, closeModal, setCurrentSect }) => {
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
    const name = e.target.name;

    if (name === 'boolean-select-true') {
      setExpense({ ...expense, necessity: true });
    } else if (name === 'boolean-select-false') {
      setExpense({ ...expense, necessity: false });
    } else {
      setExpense({ ...expense, [name]: e.target.value });
    }
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
    <section className='modal__form-sect'>
      {expenseStatus === 'error' && <Alert msg='Something went wrong' />}
      <button className='btn' onClick={() => setCurrentSect('Add Payment')}>
        <BsArrowReturnLeft className='modal__return-btn' />
      </button>
      <form onSubmit={handleSubmit} className='modal__form'>
        <input
          type='text'
          className='input-border-bottom modal__expense-title'
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
          className='input-border-bottom modal__expense-categories'
          onChange={onInputChange}
          value={expense.category}
          required
        />
        <input
          type='text'
          className='input-border-bottom modal__expense-desc'
          name='description'
          placeholder='description'
          onChange={onInputChange}
          value={expense.description}
        />
        <span className='flex align-center modal__expense-amount'>
          <p className='dollar-symbol'>$</p>
          <input
            type='text'
            className='input-border-bottom align-center'
            name='amount'
            placeholder='amount'
            onChange={onInputChange}
            value={expense.amount}
            required
          />
        </span>
        <datalist id='payment-categories'>
          {categories.map((cat) => {
            return <option key={cat._id} value={cat.title}></option>;
          })}
        </datalist>
        <NecessitySelect
          value={expense.necessity}
          onInputChange={onInputChange}
          className='modal__expense-nec-select'
          btnsConfig={[
            'Necessity',
            'fade-in-green',
            'Indulgent',
            'fade-in-red',
          ]}
        />

        <button
          type='submit'
          className='btn btn-submit modal__expense-submit-btn'>
          Submit
        </button>
      </form>
    </section>
  );
};

export default Expense;
