import React, { useEffect, useState } from 'react';
import { Link } from 'react-scroll';
import { Link as Link2, NavLink } from 'react-router-dom';

import LogoLight from '../assets/images/logo-light.png';
import LogoDark from '../assets/images/logo-dark.png';
import IBROImage from '../assets/images/client/IBROImage.jpg'; // Impor logo IBRO

export default function Navbar({ navdark, bg }) {
  const [isOpen, setMenu] = useState(true);

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
    const navbar = document.getElementById('navbar');
    if (window.scrollY >= 300) {
      navbar.classList.add('is-sticky');
    } else {
      navbar.classList.remove('is-sticky');
    }
  }

  return (
    <>
      <nav
        className={`navbar ${bg ? '!bg-white dark:!bg-dark' : ''}`}
        id='navbar'
      >
        <div className='flex flex-wrap items-center justify-between'>
          {/* Logo Section */}
          <div className='flex items-center bg-white px-4 md:px-6 py-4 rounded-br-2xl w-fit mr-6'>
            <Link2
              className='navbar-brand flex-row flex space-x-2 md:space-x-6'
              to='/'
            >
              <img
                src={LogoDark}
                className='max-w-full max-h-8 md:max-h-12 py-1 inline-block dark:hidden'
                alt='Logo Dark'
              />
              <img
                src={LogoLight}
                className='max-w-full max-h-8 md:max-h-12 py-1 hidden dark:inline-block'
                alt='Logo Light'
              />
              <img
                src={IBROImage}
                className='max-h-8 md:max-h-12 py-1 w-auto object-contain'
                alt='IBRO Logo'
              />
            </Link2>
          </div>

          <div className='nav-icons flex items-center lg_992:order-2 ms-auto'>
            {navdark && (
              <ul className='list-none menu-social mb-0'>
                <li className='inline ms-1'>
                  <Link2
                    to='https://linkedin.com/company/rewiring-hope'
                    target='_blank'
                    className='size-8 inline-flex items-center text-center justify-center tracking-wide border align-middle duration-500 rounded-full bg-primary hover:bg-primary-dark border-primary hover:border-primary-dark text-white'
                  >
                    <i className='uil uil-linkedin'></i>
                  </Link2>
                </li>
                <li className='inline ms-1'>
                  <Link2
                    to='https://instagram.com/rewiringhopeindonesia'
                    target='_blank'
                    className='size-8 inline-flex items-center text-center justify-center tracking-wide border align-middle duration-500 rounded-full bg-primary hover:bg-primary-dark border-primary hover:border-primary-dark text-white'
                  >
                    <i className='uil uil-instagram'></i>
                  </Link2>
                </li>
              </ul>
            )}
            {!navdark && (
              <ul className='list-none menu-social mb-0'>
                <li className='inline ms-1'>
                  <Link2
                    to='https://linkedin.com/company/rewiring-hope'
                    target='_blank'
                  >
                    <span className='login-btn-primary'>
                      <span className='size-8 inline-flex items-center text-center justify-center tracking-wide border align-middle duration-500 rounded-full bg-primary hover:bg-primary-dark border-primary hover:border-primary-dark text-white'>
                        <i className='uil uil-linkedin'></i>
                      </span>
                    </span>
                    <span className='login-btn-light'>
                      <span className='size-8 inline-flex items-center text-center justify-center tracking-wide border align-middle duration-500 rounded-full bg-gray-50 hover:bg-gray-200 text-slate-900 dark:text-white dark:bg-slate-900 dark:hover:bg-gray-700 border-gray-100 dark:border-gray-700'>
                        <i className='uil uil-linkedin'></i>
                      </span>
                    </span>
                  </Link2>
                </li>
                <li className='inline ms-1'>
                  <Link2
                    to='https://instagram.com/rewiringhopeindonesia'
                    target='_blank'
                  >
                    <span className='login-btn-primary'>
                      <span className='size-8 inline-flex items-center text-center justify-center tracking-wide border align-middle duration-500 rounded-full bg-primary hover:bg-primary-dark border-primary hover:border-primary-dark text-white'>
                        <i className='uil uil-instagram'></i>
                      </span>
                    </span>
                    <span className='login-btn-light'>
                      <span className='size-8 inline-flex items-center text-center justify-center tracking-wide border align-middle duration-500 rounded-full bg-gray-50 hover:bg-gray-200 text-slate-900 dark:text-white dark:bg-slate-900 dark:hover:bg-gray-700 border-gray-100 dark:border-gray-700'>
                        <i className='uil uil-instagram'></i>
                      </span>
                    </span>
                  </Link2>
                </li>
              </ul>
            )}
            <button
              type='button'
              className='collapse-btn inline-flex items-center ms-1 bg-white rounded-full px-2 p-1 text-primary dark:text-white lg_992:hidden'
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
            <ul
              className={`navbar-nav ${navdark ? '' : 'nav-light'}`}
              id='navbar-navlist'
            >
              <NavLink
                to='/'
                className={({ isActive }) =>
                  ` p-3 px-4 ${isActive ? 'bg-white text-primary rounded-md' : 'nav-link'}`
                }
              >
                Home
              </NavLink>
              <NavLink
                to='/brain-awareness-week'
                className={({ isActive }) =>
                  ` p-3 px-4 ${isActive ? 'bg-white text-primary rounded-md' : 'nav-link'}`
                }
              >
                Brain Awareness Week
              </NavLink>
              <NavLink
                to='/about'
                className={({ isActive }) =>
                  ` p-3 px-4 ${isActive ? 'bg-white text-primary rounded-md' : 'nav-link'}`
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
