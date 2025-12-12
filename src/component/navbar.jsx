import React, { useEffect, useState } from 'react';
import { Link } from 'react-scroll';
import { Link as Link2, NavLink } from 'react-router-dom';

import LogoLight from '../assets/images/logo-light.png';
import LogoDark from '../assets/images/logo-dark.png';

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
    if (
      document.body.scrollTop >= 50 ||
      document.documentElement.scrollTop >= 50
    ) {
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
        <div className='container flex flex-wrap items-center justify-between'>
          {navdark && (
            <Link2 className='navbar-brand' to='/'>
              <span>
                <img
                  src={LogoDark}
                  className='w-36 lg:w-48 py-2 inline-block dark:hidden'
                  alt=''
                />
                <img
                  src={LogoLight}
                  className='w-36 lg:w-48 py-2 hidden dark:inline-block'
                  alt=''
                />
              </span>
            </Link2>
          )}
          {!navdark && (
            <Link2 className='navbar-brand' to='/'>
              <span className='inline-block dark:hidden'>
                <img src={LogoDark} className='l-dark' alt='' />
                <img src={LogoLight} className='l-light' alt='' />
              </span>
              <img
                src={LogoLight}
                className='hidden dark:inline-block'
                alt=''
              />
            </Link2>
          )}

          <div className='nav-icons flex items-center lg_992:order-2 ms-auto'>
            {navdark && (
              <ul className='list-none menu-social mb-0'>
                {/* <li className='inline ms-1'>
                  <Link2
                    to='#'
                    className='size-8 inline-flex items-center text-center justify-center tracking-wide border align-middle duration-500 rounded-full bg-primary hover:bg-primary-dark border-primary hover:border-primary-dark text-white'
                  >
                    <i className='uil uil-github'></i>
                  </Link2>
                </li> */}
                <li className='inline ms-1'>
                  <Link2
                    to='https://www.linkedin.com/showcase/teachingthehealingbrain/'
                    target='_blank'
                    className='size-8 inline-flex items-center text-center justify-center tracking-wide border align-middle duration-500 rounded-full bg-primary hover:bg-primary-dark border-primary hover:border-primary-dark text-white'
                  >
                    <i className='uil uil-linkedin'></i>
                  </Link2>
                </li>
                <li className='inline ms-1'>
                  <Link2
                    to='https://instagram.com/teachingthehealingbrain'
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
                    to='https://www.linkedin.com/showcase/teachingthehealingbrain/'
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
                    to='https://instagram.com/teachingthehealingbrain'
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
              className='collapse-btn inline-flex items-center ms-3 text-dark dark:text-white lg_992:hidden'
              onClick={toggleMenu}
            >
              <span className='sr-only'>Navigation Menu</span>
              <i className='mdi mdi-menu mdi-24px'></i>
            </button>
          </div>

          <div
            className={`${
              isOpen === true ? 'hidden' : 'block'
            } navigation lg_992:order-1 lg_992:flex`}
            id='menu-collapse'
          >
            <ul
              className={`navbar-nav ${navdark ? '' : 'nav-light'}`}
              id='navbar-navlist'
            >
              <NavLink
                to='/about'
                className={({ isActive }) =>
                  ` ${isActive ? 'text-primary p-2' : 'nav-link'}`
                }
              >
                About
              </NavLink>
              {/* <Link
                className='nav-item'
                activeclassname='active'
                spy={true}
                smooth={true}
                duration={500}
                to='about'
              >
                <span className='nav-link'>Impact</span>
              </Link>
              <Link
                className='nav-item'
                to='features'
                activeclassname='active'
                spy={true}
                smooth={true}
                duration={500}
              >
                <span className='nav-link'>Conference</span>
              </Link> */}
              {/* <Link
                className='nav-item'
                to='portfolio'
                activeclassname='active'
                spy={true}
                smooth={true}
                duration={500}
              >
                <span className='nav-link'>Portfolio</span>
              </Link>
              <Link
                className='nav-item'
                to='testi'
                activeclassname='active'
                spy={true}
                smooth={true}
                duration={500}
              >
                <span className='nav-link'>Review</span>
              </Link>
              <Link
                className='nav-item'
                to='pricing'
                activeclassname='active'
                spy={true}
                smooth={true}
                duration={500}
              >
                <span className='nav-link'>Pricing</span>
              </Link>
              <Link
                className='nav-item'
                to='blog'
                activeclassname='active'
                spy={true}
                smooth={true}
                duration={500}
              >
                <span className='nav-link'>Blog</span>
              </Link>
              <Link
                className='nav-item'
                to='contact'
                activeclassname='active'
                spy={true}
                smooth={true}
                duration={500}
              >
                <span className='nav-link'>Contact us</span>
              </Link> */}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
