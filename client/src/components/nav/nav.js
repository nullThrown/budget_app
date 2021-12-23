import React from 'react';
import { Link } from 'react-router-dom';
import './nav.css';
import { AiFillHome, AiFillCalendar } from 'react-icons/ai';
import { GiTreeGrowth, GiTwoCoins, GiHamburgerMenu } from 'react-icons/gi';
import { BiHelpCircle } from 'react-icons/bi';
const Nav = () => {
  return (
    <aside className='sidebar'>
      <div className='sidebar__title-box'>
        <GiHamburgerMenu className='sidebar__menu-icon' />
        <h2 className='heading-5 sidebar__header'>
          <GiTwoCoins /> CoinDrop
        </h2>
      </div>
      <nav className='sidebar__nav'>
        <ol className='flex-col'>
          <li className='nav__list-item'>
            <AiFillHome className='nav__icons' />
            <Link to='../home' className='nav__link-item'>
              Home
            </Link>
          </li>
          <li className='nav__list-item'>
            <AiFillCalendar className='nav__icons' />
            <Link to='../year' className='nav__link-item'>
              Year
            </Link>
          </li>
          <li className='nav__list-item'>
            <GiTreeGrowth className='nav__icons' />
            <Link to='/' className='nav__link-item'>
              Retirement
            </Link>
          </li>
          <li className='nav__list-item'>
            <BiHelpCircle className='nav__icons' />
            <Link to='/' className='nav__link-item'>
              Help
            </Link>
          </li>
        </ol>
      </nav>
    </aside>
  );
};

export default Nav;
