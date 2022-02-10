import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import '../modal.css';
import { useSelector, useDispatch } from 'react-redux';
import Loading from '../../loading/loading';
import Success from '../../../alert/success';
import customStyles from '../styles';
import { editExpense } from '../../../../features/expenses/middleware';
import { Alert } from '../../../alert/alert';
import NecessitySelect from '../payment/necessitySelect';
const ExpenseModal = ({ isOpen, closeModal, expenseId }) => {
  const dispatch = useDispatch();

  const expensesStatus = useSelector((state) => state.expenses.status);

  const expenseItem = useSelector((state) =>
    state.expenses.data.find((exp) => exp._id === expenseId)
  );
  const categories = useSelector((state) =>
    state.expenses.data.map((expense) => expense.category)
  );

  const [expense, setExpense] = useState(expenseItem || {});

  const onInputChange = (e) => {
    const name = e.target.name;

    if (name === 'necessity' && expense.necessity === false) {
      setExpense({ ...expense, necessity: true });
    } else if (name === 'indulgent' && expense.necessity === true) {
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
        <section className='modal-expense-sect'>
          <form onSubmit={handleSubmit} className='modal__payment-form'>
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
            <span className='flex align-center input-expense__amount'>
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
                return <option value={cat}></option>;
              })}
            </datalist>
            <NecessitySelect
              necessity={expense.necessity}
              onInputChange={onInputChange}
              className='modal__expense-nec-select'
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
    </Modal>
  );
};

export default ExpenseModal;
