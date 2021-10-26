import { IoIosArrowDown } from 'react-icons/io';
export const Header = () => {
  return (
    <header>
      <div className='title-box'>
        <h2 className='heading-3'>Expenditures</h2>
        <button className='btn'>Add Expenditure</button>
      </div>
      <div className='desc-box'>
        <div className='header-desc'>
          <div className='desc-category'>
            <button className='btn category-btn'>
              Category <IoIosArrowDown className={'category-btn-icon'} />
            </button>
            <h3 className='heading-5 current-category'>Dining</h3>
          </div>
          <div className='header-spent'>
            <p>
              spent: <span className='text-bg-red'>$135.32</span>
            </p>
            <small className='text-sm-i'> of </small>
            <p className='text-bg-green'> $300</p>
          </div>
        </div>
      </div>
    </header>
  );
};
