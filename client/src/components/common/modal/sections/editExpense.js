import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Loading from '../../loading/loading';
import Success from '../../../alert/success';
import { editExpense } from '../../../../features/expenses/middleware';
import { Alert } from '../../../alert/alert';
import NecessitySelect from '../necessitySelect';
import ModalInstance from '../modal';

const ExpenseModal = ({ isOpen, closeModal, expenseId }) => {
  const dispatch = useDispatch();

  const expensesStatus = useSelector((state) => state.expenses.status);

  const expenseItem = useSelector((state) =>
    state.expenses.data.find((exp) => exp._id === expenseId)
  );
  const categories = useSelector((state) => state.profile.categories);

  const [expense, setExpense] = useState(expenseItem || {});

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
    dispatch(editExpense(expense));
  };

  useEffect(() => {
    setExpense(expenseItem || {});
  }, [expenseItem]);

  const onRequestClose = () => {
    dispatch({ type: 'expenses/returnToIdle' });
    closeModal();
  };
  return (
    <ModalInstance
      isOpen={isOpen}
      closeModal={closeModal}
      onRequestClose={onRequestClose}
      title={'Edit Expense'}>
      {expensesStatus === 'loading' && (
        <div className='center-container'>
          <Loading />
        </div>
      )}

      {expensesStatus === 'edit_success' && (
        <Success
          text='Payment edited Successfully!'
          actionCreator={{ type: 'expenses/returnToIdle' }}
          closeModal={closeModal}
        />
      )}

      {(expensesStatus === 'idle' || expensesStatus === 'error') && (
        <section className='modal__form-sect'>
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
                type='number'
                className='input-border-bottom '
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
            {expensesStatus === 'error' && (
              <Alert msg='Something went wrong :( try again' />
            )}
          </form>
        </section>
      )}
    </ModalInstance>
  );
};

export default ExpenseModal;
