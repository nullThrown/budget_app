import { useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { Nav } from './nav';
import { categories } from '../../../data/categories';
export const Header = () => {
  const [isOpen, setisOpen] = useState();
  const [current, setCurrent] = useState();
  const toggleMenu = () => setisOpen(!isOpen);

  const handleclick = () => {
    toggleMenu();
  };
  return (
    <header>
      <h2 className='heading-4 text-center'>Expenditures</h2>
      <div className='desc-box'>
        <div className='header-desc'>
          <div className='desc-category'>
            <button className='btn category-btn' onClick={handleclick}>
              Category <IoIosArrowDown className={'category-btn-icon'} />
            </button>
            <h3 className='heading-5 current-category'>Dining</h3>
            {isOpen && <Nav categories={categories} />}
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
