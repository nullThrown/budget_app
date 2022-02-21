const OverviewItem = (props) => {
  const { title, amountClass, amount, titleClass } = props;
  return (
    <div className='overview-item'>
      <p className={`item-title ${titleClass ? titleClass : ''}`}>{title}</p>
      <span className={amountClass}>${amount}</span>
    </div>
  );
};

export default OverviewItem;
