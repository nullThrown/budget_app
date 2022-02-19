const PaymentItem = ({ category, payments }) => {
  return (
    <div className='payment__category'>
      <p className=' payment__title text-sm'>{category}</p>
      {payments.map((expense) => {
        const { amount, name, _id } = expense;
        return (
          <div key={_id} className='flex payment__item'>
            <p className='payment__item-title text-sm'>{name}</p>
            <span className='payment__item-amt text-sm'>$ {amount}</span>
          </div>
        );
      })}
    </div>
  );
};

export default PaymentItem;
