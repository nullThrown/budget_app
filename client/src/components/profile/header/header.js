import { useState } from 'react';
import './header.css';
import { IconContext } from 'react-icons';
import { BiUserCircle } from 'react-icons/bi';
import { IoNotificationsOutline } from 'react-icons/io5';
const Header = () => {
  const [isNotification, setIsNotification] = useState(true);
  return (
    <header className='header'>
      <h2 className='heading-2 title'>Dashboard</h2>
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
