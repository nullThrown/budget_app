import { useState } from 'react';
import { createRecurring } from '../../../../features/recurring/middleware';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../loading/loading';
import Success from '../../../alert/success';
import { Alert } from '../../../alert/alert';
import NecessitySelect from '../necessitySelect';
import { BsArrowReturnLeft } from 'react-icons/bs';
const Recurring = ({ categories, closeModal, setCurrentSect }) => {
  const dispatch = useDispatch();
  const [recurring, setRecurring] = useState({
    name: '',
    amount: '',
    category: '',
    budget: 100,
    necessity: true,
  });

  const recurringStatus = useSelector((state) => state.recurring.status);

  const onInputChange = (e) => {
    const name = e.target.name;

    if (name === 'boolean-select-true') {
      setRecurring({ ...recurring, necessity: true });
    } else if (name === 'boolean-select-false') {
      setRecurring({ ...recurring, necessity: false });
    } else {
      setRecurring({ ...recurring, [name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createRecurring(recurring));
  };

  if (recurringStatus === 'loading') {
    return (
      <div className='center-container'>
        <Loading />
      </div>
    );
  }
  if (recurringStatus === 'create_success') {
    return (
      <Success
        text='Payment Added Successfully'
        actionCreator={{ type: 'recurring/returnToIdle' }}
        closeModal={closeModal}
      />
    );
  }

  return (
    <section className='modal__form-sect'>
      {recurringStatus === 'error' && <Alert msg='Something went wrong' />}
      <button className='btn' onClick={() => setCurrentSect('Add Payment')}>
        <BsArrowReturnLeft className='modal__return-btn' />
      </button>
      <form onSubmit={handleSubmit} className='modal__form'>
        <input
          type='text'
          name='name'
          className='input-border-bottom modal__recurring-title'
          placeholder='Name'
          value={recurring.name}
          onChange={onInputChange}
          required
        />
        <select
          name='category'
          className='input-border-bottom modal__recurring-categories'
          value={recurring.category}
          onChange={onInputChange}
          required>
          <option value=''>Choose a category</option>
          {categories.map((cat) => {
            console.log(cat);
            return (
              <option key={cat._id} value={cat.name}>
                {cat.name}
              </option>
            );
          })}
        </select>
        <span className='flex align-center modal__recurring-amount '>
          <p className='dollar-symbol'>$</p>
          <input
            type='number'
            name='amount'
            className='input-border-bottom '
            placeholder='Amount'
            value={recurring.amount}
            onChange={onInputChange}
            required
          />
        </span>

        <NecessitySelect
          value={recurring.necessity}
          onInputChange={onInputChange}
          className='modal__recurring-nec-select'
          btnsConfig={[
            'Necessity',
            'fade-in-green',
            'Indulgent',
            'fade-in-red',
          ]}
        />
        <button
          type='submit'
          className='btn btn-submit modal__recurring-submit-btn'>
          Submit
        </button>
      </form>
    </section>
  );
};

export default Recurring;
