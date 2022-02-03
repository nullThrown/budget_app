import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import '../modal.css';
import { useSelector, useDispatch } from 'react-redux';
import Loading from '../../loading/loading';
import Success from '../success';
import customStyles from '../styles';
import { editExpense } from '../../../../features/expenses/middleware';

const ExpenseModal = ({ isOpen, closeModal, expenseId }) => {
  const dispatch = useDispatch();

  const status = useSelector((state) => state.expenses.status);

  const expenseItem = useSelector((state) =>
    state.expenses.data.find((exp) => exp._id === expenseId)
  );
  const categories = useSelector((state) =>
    state.expenses.data.map((expense) => expense.category)
  );

  const [expense, setExpense] = useState(expenseItem || {});

  const onInputChange = (e) => {
    setExpense({ ...expense, [e.target.name]: e.target.value });
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
    <Modal
      isOpen={isOpen}
      shouldCloseOnEsc={true}
      style={customStyles}
      onRequestClose={onRequestClose}
      shouldCloseOnOverlayClick={true}>
      <button
        type='button'
        className='btn modal-close-btn'
        onClick={closeModal}>
        X
      </button>

      {status === 'loading' && (
        <div className='center-container'>
          <Loading />
        </div>
      )}

      {status === 'edit_success' && (
        <Success
          text='Payment edited Successfully!'
          actionCreator={{ type: 'expenses/returnToIdle' }}
          closeModal={closeModal}
        />
      )}

      {(status === 'idle' || status === 'error') && (
        <section className='modal-expense-sect'>
          <form className='modal__payment-form'>
            <p className='heading-6 text-center modal__payment-title'>
              Edit Expense
            </p>
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
            {status === 'error' && <p>Something went wrong :( try again</p>}
          </form>
        </section>
      )}
    </Modal>
  );
};

export default ExpenseModal;
