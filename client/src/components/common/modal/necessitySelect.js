import './necessitySelect.css';

const NecessitySelect = ({ necessity, onInputChange, className }) => {
  return (
    <div className={`flex select-container ${className ? className : ''}`}>
      <button
        type='button'
        name='necessity'
        className={`btn btns-default ${
          necessity === true ? 'necessity-selected-btn' : ''
        }`}
        onClick={onInputChange}>
        Necessity
      </button>
      <div className='widget-container'>
        <div
          className={`widget ${
            necessity ? 'necessity-selected' : 'indulgent-selected'
          } `}></div>
      </div>

      <button
        type='button'
        name='indulgent'
        className={`btn btns-default ${
          !necessity ? 'indulgent-selected-btn' : ''
        }`}
        onClick={onInputChange}>
        Indulgent
      </button>
    </div>
  );
};

export default NecessitySelect;
