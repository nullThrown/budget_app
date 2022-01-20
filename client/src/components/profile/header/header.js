import { useState } from 'react';
import './header.css';
import { BiUserCircle } from 'react-icons/bi';
import { IoNotificationsOutline } from 'react-icons/io5';
import { GiHamburgerMenu } from 'react-icons/gi';
const Header = () => {
  // eslint-disable-next-line no-unused-vars
  const [isNotification, setIsNotification] = useState(false);

  return (
    <header className='header'>
      <button type='button' className='btn header__menu-icon'>
        <GiHamburgerMenu />
      </button>
      <h2 className='heading-2 header__title'>Dashboard</h2>
      <div className='user-nav'>
        <span className={isNotification ? 'notification-active' : ''}>
          <IoNotificationsOutline size={'1.8em'} className={'icon-user'} />
        </span>
        <BiUserCircle size={'2.4em'} />
      </div>
    </header>
  );
};

export default Header;
