import { useState } from 'react';
import Modal from 'react-modal';
import './modal.css';
const customStyles = {
  content: {
    position: 'sticky',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '800px',
    width: '80%',
    height: '400px',
    zIndex: '200000',
    padding: '2.6em',
  },
};

const PaymentModal = ({ isOpen, closeModal }) => {
  return (
    <Modal
      isOpen={isOpen}
      shouldCloseOnEsc={true}
      style={customStyles}
      onRequestClose={closeModal}
      shouldCloseOnOverlayClick={true}>
      <button
        type='button'
        className='btn modal-close-btn'
        onClick={closeModal}>
        X
      </button>
      <h3 className='heading-5 text-center'>Add Payment</h3>
      <div></div>
    </Modal>
  );
};

export default PaymentModal;
