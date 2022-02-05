import { useState } from 'react';
import { createRecurring } from '../../../../features/recurring/middleware';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../loading/loading';
import Success from '../success';
import { Alert } from '../../../alert/alert';
const RecurringSection = ({ categories, closeModal }) => {
  const dispatch = useDispatch();
  const [recurring, setRecurring] = useState({
    name: '',
    amount: 0,
    category: '',
    budget: 100,
  });

  const status = useSelector((state) => state.recurring.status);

  const onInputChange = (e) => {
    setRecurring({ ...recurring, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createRecurring(recurring));
  };

  if (status === 'loading') {
    return (
      <div className='center-container'>
        <Loading />
      </div>
    );
  }
  if (status === 'create_success') {
    return (
      <Success
        text='Payment Added Successfully'
        actionCreator={{ type: 'recurring/returnToIdle' }}
        closeModal={closeModal}
      />
    );
  }

  return (
    <section className='modal-recurring-sect'>
      <form className='modal__payment-form'>
        <p className='heading-6 text-center modal__payment-title'>Recurring</p>
        <input
          type='text'
          name='name'
          className='input-border-bottom input-expense__title'
          placeholder='Name'
          value={recurring.name}
          onChange={onInputChange}
        />
        <input
          list='payment-categories'
          name='category'
          className='input-border-bottom input-expense__categories'
          placeholder='Category'
          value={recurring.category}
          onChange={onInputChange}
        />
        <input
          type='number'
          name='amount'
          className='input-border-bottom input-recurring__amount'
          placeholder='Amount'
          value={recurring.amount}
          onChange={onInputChange}
        />
        <datalist id='payment-categories'>
          {categories.map((cat) => {
            return <option value={cat}></option>;
          })}
        </datalist>
        <button
          type='submit'
          className='btn btn-submit modal__recurring-submit-btn'
          onClick={handleSubmit}>
          Submit
        </button>
        {status === 'error' && (
          <Alert msg='Something went wrong :( try again' />
        )}
      </form>
    </section>
  );
};

export default RecurringSection;
