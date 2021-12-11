import React from 'react'
import {Link} from 'react-router-dom'
import './nav.css'
import {AiFillHome,AiFillCalendar} from 'react-icons/ai'
import {GiTreeGrowth, GiTwoCoins} from 'react-icons/gi'
import {BiHelpCircle} from 'react-icons/bi'
 const Nav = () => {
    return (
        <aside className='sidebar'>
            <h2 className='heading-4 flex sidebar__heading'><GiTwoCoins/> CoinDrop</h2>
            <nav className='sidebar__nav'>
                <ul className='flex-col'>
                    <li className='nav__list-item'><AiFillHome className='nav__icons'/><Link to='../home' className='nav__link-item'>Home</Link></li>
                    <li className='nav__list-item'><AiFillCalendar className='nav__icons'/><Link to='../year' className='nav__link-item'>Year</Link></li>
                    <li className='nav__list-item'><GiTreeGrowth className='nav__icons'/><Link to='/' className='nav__link-item'>Retirement</Link></li>
                    <li className='nav__list-item'><BiHelpCircle className='nav__icons'/><Link to='/' className='nav__link-item'>Help</Link></li>
                </ul>
            </nav>
        </aside>
    )
}

export default Nav;
