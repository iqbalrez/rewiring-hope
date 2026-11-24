import React, { useEffect, useState } from 'react';
import { Link as Link2, NavLink, useLocation } from 'react-router-dom';

import LogoDark from '../assets/images/logo-dark.png';
import TELImage from '../assets/images/client/TELImage.jpg';

export default function Navbar({ navdark, bg }) {
  const [isOpen, setMenu] = useState(true);
  const [isProgramsOpen, setProgramsOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState(null); // 'teaching' | 'baw' | null

  const location = useLocation();

  useEffect(() => {
    window.addEventListener('scroll', windowScroll);
    window.scrollTo(0, 0);
    return () => {
      window.removeEventListener('scroll', windowScroll);
    };
  }, []);

  const toggleMenu = () => {
    setMenu((prev) => {
      const next = !prev;
      if (next) {
        setProgramsOpen(false);
        setOpenSubMenu(null);
      }
      return next;
    });
  };

  function windowScroll() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    if (window.scrollY >= 300) {
      navbar.classList.add('is-sticky');
    } else {
      navbar.classList.remove('is-sticky');
    }
  }

  const isProgramActive = [
    '/teaching-the-healing-brain',
    '/teaching-the-resilient-brain',
    '/brain-awareness-week',
    '/perempuan-punya-cerita',
  ].some((path) => location.pathname.startsWith(path));

  const isDesktopHover = () =>
    typeof window !== 'undefined' && window.innerWidth >= 992;

  const handleTogglePrograms = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setProgramsOpen((prev) => {
      const next = !prev;
      if (!next) setOpenSubMenu(null);
      return next;
    });
  };

  const handleToggleSubMenu = (e, menuKey) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenSubMenu((prev) => (prev === menuKey ? null : menuKey));
  };

  const handleLinkClick = () => {
    setProgramsOpen(false);
    setOpenSubMenu(null);
    setMenu(true);
  };

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
                src={TELImage}
                className='max-h-8 md:max-h-12 py-1 w-auto object-contain'
                alt='TEL Logo'
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
            } navigation relative z-30 bg-white w-full lg_992:w-auto h-fit lg_992:order-1 lg_992:flex animate-[fadeDown_0.4s_ease-in-out] lg_992:bg-transparent lg_992:h-auto lg_992:shadow-none lg_992:!mt-0 lg_992:!p-0`}
            id='menu-collapse'
          >
            <ul
              className={`navbar-nav flex flex-col lg_992:flex-row lg_992:items-center ${
                navdark ? '' : 'nav-light'
              }`}
              id='navbar-navlist'
            >
              <NavLink
                to='/'
                onClick={handleLinkClick}
                className={({ isActive }) =>
                  `p-3 px-4 ${isActive ? 'bg-white text-primary rounded-md' : 'nav-link'}`
                }
              >
                Home
              </NavLink>

              {/* Dropdown Programs */}
              <li
                className='relative list-none'
                onMouseEnter={() => {
                  if (isDesktopHover()) setProgramsOpen(true);
                }}
                onMouseLeave={() => {
                  if (isDesktopHover()) {
                    setProgramsOpen(false);
                    setOpenSubMenu(null);
                  }
                }}
              >
                <button
                  type='button'
                  aria-expanded={isProgramsOpen}
                  onClick={handleTogglePrograms}
                  className={`w-full lg_992:w-auto flex items-center justify-between gap-1.5 p-3 px-4 text-left cursor-pointer ${
                    isProgramActive
                      ? 'bg-white text-primary rounded-md'
                      : 'nav-link'
                  }`}
                >
                  <span>Programs</span>
                  <i
                    className={`uil uil-angle-down text-lg transition-transform duration-200 ${
                      isProgramsOpen ? 'rotate-180' : ''
                    }`}
                  ></i>
                </button>

                {isProgramsOpen && (
                  <div className='lg_992:absolute lg_992:left-0 lg_992:top-full lg_992:pt-2 z-50 w-full lg_992:w-64'>
                    <ul className='bg-gray-50 lg_992:bg-white dark:bg-slate-900 rounded-xl lg_992:shadow-lg border border-gray-100 dark:border-gray-800 py-2 text-slate-800 dark:text-white list-none'>
                      {/* 1. Teaching the Brain Series */}
                      <li
                        className='relative'
                        onMouseEnter={() => {
                          if (isDesktopHover()) setOpenSubMenu('teaching');
                        }}
                        onMouseLeave={() => {
                          if (isDesktopHover()) setOpenSubMenu(null);
                        }}
                      >
                        <button
                          type='button'
                          aria-expanded={openSubMenu === 'teaching'}
                          onClick={(e) => handleToggleSubMenu(e, 'teaching')}
                          className='w-full flex items-center justify-between px-4 py-2.5 text-sm font-medium hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-primary transition-colors text-left cursor-pointer'
                        >
                          <span>Teaching the Brain Series</span>
                          <i
                            className={`uil uil-angle-right text-base transition-transform duration-200 ${
                              openSubMenu === 'teaching' ? 'rotate-90' : ''
                            }`}
                          ></i>
                        </button>

                        {openSubMenu === 'teaching' && (
                          <div className='lg_992:absolute lg_992:left-full lg_992:top-0 lg_992:pl-1 w-full lg_992:w-64'>
                            <ul className='bg-white dark:bg-slate-800 lg_992:dark:bg-slate-900 lg_992:rounded-xl lg_992:shadow-lg lg_992:border border-gray-100 dark:border-gray-800 py-1.5 list-none'>
                              <li>
                                <NavLink
                                  to='/teaching-the-healing-brain'
                                  onClick={handleLinkClick}
                                  className={({ isActive }) =>
                                    `block pl-8 lg_992:px-4 py-2 text-sm transition-colors ${
                                      isActive
                                        ? 'text-primary font-semibold bg-primary/5'
                                        : 'text-slate-700 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-primary'
                                    }`
                                  }
                                >
                                  Teaching the Healing Brain - 2026
                                </NavLink>
                              </li>
                              <li>
                                <NavLink
                                  to='/teaching-the-resilient-brain/'
                                  onClick={handleLinkClick}
                                  className={({ isActive }) =>
                                    `block pl-8 lg_992:px-4 py-2 text-sm transition-colors ${
                                      isActive
                                        ? 'text-primary font-semibold bg-primary/5'
                                        : 'text-slate-700 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-primary'
                                    }`
                                  }
                                >
                                  Teaching the Resilient Brain - 2027
                                </NavLink>
                              </li>
                            </ul>
                          </div>
                        )}
                      </li>

                      {/* 2. Brain Awareness Week */}
                      <li
                        className='relative'
                        onMouseEnter={() => {
                          if (isDesktopHover()) setOpenSubMenu('baw');
                        }}
                        onMouseLeave={() => {
                          if (isDesktopHover()) setOpenSubMenu(null);
                        }}
                      >
                        <button
                          type='button'
                          aria-expanded={openSubMenu === 'baw'}
                          onClick={(e) => handleToggleSubMenu(e, 'baw')}
                          className='w-full flex items-center justify-between px-4 py-2.5 text-sm font-medium hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-primary transition-colors text-left cursor-pointer'
                        >
                          <span>Brain Awareness Week</span>
                          <i
                            className={`uil uil-angle-right text-base transition-transform duration-200 ${
                              openSubMenu === 'baw' ? 'rotate-90' : ''
                            }`}
                          ></i>
                        </button>

                        {openSubMenu === 'baw' && (
                          <div className='lg_992:absolute lg_992:left-full lg_992:top-0 lg_992:pl-1 w-full lg_992:w-64'>
                            <ul className='bg-white dark:bg-slate-800 lg_992:dark:bg-slate-900 lg_992:rounded-xl lg_992:shadow-lg lg_992:border border-gray-100 dark:border-gray-800 py-1.5 list-none'>
                              <li>
                                <NavLink
                                  to='/brain-awareness-week/2026'
                                  onClick={handleLinkClick}
                                  className={({ isActive }) =>
                                    `block pl-8 lg_992:px-4 py-2 text-sm transition-colors ${
                                      isActive
                                        ? 'text-primary font-semibold bg-primary/5'
                                        : 'text-slate-700 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-primary'
                                    }`
                                  }
                                >
                                  Kisah Otak yang Tangguh - 2026
                                </NavLink>
                              </li>
                              <li>
                                <NavLink
                                  to='/brain-awareness-week/2027'
                                  onClick={handleLinkClick}
                                  className={({ isActive }) =>
                                    `block pl-8 lg_992:px-4 py-2 text-sm transition-colors ${
                                      isActive
                                        ? 'text-primary font-semibold bg-primary/5'
                                        : 'text-slate-700 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-primary'
                                    }`
                                  }
                                >
                                  Your Voice in Medicine - 2027
                                </NavLink>
                              </li>
                            </ul>
                          </div>
                        )}
                      </li>

                      {/* 3. Perempuan Punya Cerita */}
                      <li>
                        <NavLink
                          to='/perempuan-punya-cerita'
                          onClick={handleLinkClick}
                          className={({ isActive }) =>
                            `block px-4 py-2.5 text-sm font-medium transition-colors ${
                              isActive
                                ? 'text-primary font-semibold bg-primary/5'
                                : 'hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-primary'
                            }`
                          }
                        >
                          Perempuan Punya Cerita
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                )}
              </li>

              <NavLink
                to='/articles'
                onClick={handleLinkClick}
                className={({ isActive }) =>
                  `p-3 px-4 ${isActive ? 'bg-white text-primary rounded-md' : 'nav-link'}`
                }
              >
                Articles
              </NavLink>
              <NavLink
                to='/volunteer'
                onClick={handleLinkClick}
                className={({ isActive }) =>
                  `p-3 px-4 ${isActive ? 'bg-white text-primary rounded-md' : 'nav-link'}`
                }
              >
                Volunteer
              </NavLink>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
