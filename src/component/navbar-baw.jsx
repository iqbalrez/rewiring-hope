import React, { useEffect, useState } from 'react';
import { Link } from 'react-scroll';
import { Link as Link2, NavLink } from 'react-router-dom';

import LogoLight from '../assets/images/logo-light.png';
import LogoDark from '../assets/images/logo-dark.png';
import IBROImage from '../assets/images/client/IBROImage.jpg';
import IBROWhiteImage from '../assets/images/client/IBROWhiteImage.png';
import DanaFoundationImage from '../assets/images/client/DanaFoundationImage.png';

export default function BawNavbar() {
  const [isOpen, setMenu] = useState(true);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', windowScroll);
    window.scrollTo(0, 0);
    return () => {
      window.removeEventListener('scroll', windowScroll);
    };
  }, []);

  const toggleMenu = () => {
    setMenu(!isOpen);
  };

  function windowScroll() {
    if (window.scrollY >= 1800) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  }

  return (
    <>
      <nav className={`navbar`} id='navbar'>
        <div
          className={`flex flex-wrap items-center justify-between ${isSticky ? 'bg-white' : ''}`}
        >
          {/* Logo Section */}
          <div
            className={`flex items-center px-2 md:px-6 py-3 md:py-4 min-w-0 flex-shrink transition-all duration-300 ${isSticky ? 'bg-gradient-to-b bg-blue-dark' : ''}`}
          >
            <Link2
              className='navbar-brand flex flex-row items-center gap-2 md:gap-4'
              to='/'
            >
              <img
                src={IBROWhiteImage}
                className='max-h-5 md:max-h-12 w-auto object-contain flex-shrink'
                alt='IBRO Logo'
              />
              <img
                src={DanaFoundationImage}
                className='max-h-5 md:max-h-12 w-auto object-contain flex-shrink'
                alt='Dana Foundation Logo'
              />
              <img
                src={LogoLight}
                className='max-h-5 md:max-h-12 w-auto object-contain flex-shrink'
                alt='Logo Dark'
              />
            </Link2>
          </div>

          <div className='nav-icons flex items-center lg_992:order-2 ms-auto'>
            <ul className='list-none menu-social mb-0'>
              <li className='inline ms-1'>
                <Link2
                  to='https://linkedin.com/company/rewiring-hope'
                  target='_blank'
                  className={`size-8 inline-flex items-center text-center justify-center tracking-wide border align-middle duration-500 rounded-full ${isSticky ? 'bg-blue-dark text-white' : 'bg-white text-blue-dark'} `}
                >
                  <i className='uil uil-linkedin'></i>
                </Link2>
              </li>
              <li className='inline ms-1'>
                <Link2
                  to='https://instagram.com/rewiringhopeindonesia'
                  target='_blank'
                  className={`size-8 inline-flex items-center text-center justify-center tracking-wide border align-middle duration-500 rounded-full ${isSticky ? 'bg-blue-dark text-white' : 'bg-white text-blue-dark'} `}
                >
                  <i className='uil uil-instagram'></i>
                </Link2>
              </li>
            </ul>
            <button
              type='button'
              className='collapse-btn inline-flex items-center ms-1 bg-white rounded-full px-2 p-1 text-blue-dark dark:text-white lg_992:hidden'
              onClick={toggleMenu}
            >
              <span className='sr-only'>Navigation Menu</span>
              <i className='mdi mdi-menu mdi-22px'></i>
            </button>
          </div>

          <div
            className={`${
              isOpen === true ? 'hidden' : 'block'
            } navigation bg-white h-fit lg_992:order-1 lg_992:flex animate-[fadeDown_0.4s_ease-in-out] lg_992:bg-transparent lg_992:h-auto lg_992:shadow-none lg_992:!mt-0 lg_992:!p-0`}
            id='menu-collapse'
          >
            <div
              onClick={toggleMenu}
              className='absolute inset-0 min-h-screen bg-black/20 -z-10 block md:hidden'
            ></div>
            <ul className={`flex flex-col md:flex-row`} id='navbar-navlist'>
              <NavLink
                to='/'
                className={({ isActive }) =>
                  ` p-3 px-4 ${isActive ? `${isSticky ? 'bg-blue-dark text-white' : 'bg-blue-dark text-white md:text-blue-dark md:bg-white'} rounded-md` : `${isSticky ? 'text-blue-dark' : 'md:text-white'}`}`
                }
              >
                Home
              </NavLink>
              <NavLink
                to='/brain-awareness-week'
                className={({ isActive }) =>
                  ` p-3 px-4 ${isActive ? `${isSticky ? 'bg-blue-dark text-white' : 'bg-blue-dark text-white md:text-blue-dark md:bg-white'} rounded-md` : `${isSticky ? 'text-blue-dark' : 'md:text-white'}`}`
                }
              >
                Brain Awareness Week
              </NavLink>
              <NavLink
                to='/about'
                className={({ isActive }) =>
                  ` p-3 px-4 ${isActive ? `${isSticky ? 'bg-blue-dark text-white' : 'bg-blue-dark text-white md:text-blue-dark md:bg-white'} rounded-md` : `${isSticky ? 'text-blue-dark' : 'md:text-white'}`}`
                }
              >
                About
              </NavLink>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
