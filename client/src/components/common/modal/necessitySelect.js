import './necessitySelect.css';

const NecessitySelect = ({ value, onInputChange, className, btnsConfig }) => {
  const [trueBtnName, trueBtnClass, falseBtnName, falseBtnClass] = btnsConfig;
  return (
    <div className={`flex select-container ${className ? className : ''}`}>
      <button
        type='button'
        name='boolean-select-true'
        className={`btn btns-default ${value ? trueBtnClass : ''}`}
        onClick={onInputChange}>
        {trueBtnName}
      </button>
      <div className='widget-container'>
        <div
          className={`widget ${
            value ? 'true-selected' : 'false-selected'
          } `}></div>
      </div>

      <button
        type='button'
        name='boolean-select-false'
        className={`btn btns-default ${!value ? falseBtnClass : ''}`}
        onClick={onInputChange}>
        {falseBtnName}
      </button>
    </div>
  );
};

export default NecessitySelect;
