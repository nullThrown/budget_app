import { useState } from 'react';
import Modal from 'react-modal';
import '../modal.css';
import RecurringSection from './recurringSect';
import ExpenseSection from './expenseSect';
import { BsArrowReturnLeft } from 'react-icons/bs';
import { useSelector } from 'react-redux';
const customStyles = {
  content: {
    // position: 'sticky',
    top: '40%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '600px',
    width: '96%',
    height: '450px',
    padding: '2.6em',
    borderRadius: '40px',
    border: '1px solid var(--grey-2)',
  },
};

const PaymentModal = ({ isOpen, closeModal }) => {
  const [currentSect, setCurrentSect] = useState('start');

  const categorySelector = (state) =>
    state.expenses.data.map((expense) => expense.category);

  const categories = useSelector(categorySelector);

  return (
    <Modal
      isOpen={isOpen}
      shouldCloseOnEsc={true}
      style={customStyles}
      onRequestClose={closeModal}
      shouldCloseOnOverlayClick={true}>
      {currentSect !== 'start' && (
        <button
          className='btn modal__return-btn'
          onClick={() => setCurrentSect('start')}>
          <BsArrowReturnLeft />
        </button>
      )}
      <button
        type='button'
        className='btn modal-close-btn'
        onClick={closeModal}>
        X
      </button>
      {currentSect === 'start' && (
        <h3 className='heading-6 text-center'>Add Payment</h3>
      )}
      {currentSect === 'start' && (
        <div className='modal__btn-box'>
          <button
            type='button'
            className='btn mr-1 modal__btn'
            onClick={() => setCurrentSect('recurring')}>
            Recurring
          </button>
          <button
            type='button'
            className='btn modal__btn'
            onClick={() => setCurrentSect('expense')}>
            One Time
          </button>
        </div>
      )}
      {currentSect === 'recurring' && (
        <RecurringSection categories={categories} />
      )}
      {currentSect === 'expense' && <ExpenseSection categories={categories} />}
    </Modal>
  );
};

export default PaymentModal;
