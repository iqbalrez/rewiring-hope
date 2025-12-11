import React from 'react';
import { Link } from 'react-router-dom';

import LogoLight from '../assets/images/logo-light.png';

export default function Footer() {
  return (
    <>
      {/*  Start Footer  */}
      <footer className='py-8 bg-slate-800 dark:bg-gray-900'>
        <div className='container'>
          <div className='grid md:grid-cols-12 items-center'>
            <div className='md:col-span-3'>
              <Link to='#' className='logo-footer'>
                <img
                  src={LogoLight}
                  className='md:ms-0 max-h-12 mx-auto'
                  alt=''
                />
              </Link>
            </div>

            <div className='md:col-span-7 md:mt-0 mt-8'>
              <div className='text-center'>
                <p className='text-gray-400'>
                  © {new Date().getFullYear()} Rewiring Hope by The Excellent
                  Study.
                </p>
              </div>
            </div>

            <div className='md:col-span-2 md:mt-0 mt-8'>
              <ul className='list-none foot-icon md:text-end text-center'>
                {/* <li className="inline ms-1"><Link to="https://1.envato.market/upwind-react" target="_blank" className="size-8 inline-flex items-center text-center justify-center tracking-wide border align-middle duration-500 rounded-md border-slate-700 dark:border-slate-800 hover:border-primary bg-slate-800 dark:bg-gray-900 hover:bg-primary dark:hover:bg-primary text-gray-400 hover:text-white"><i className="uil uil-shopping-cart align-middle" title="Buy Now"></i></Link></li>
                                <li className="inline ms-1"><Link to="https://dribbble.com/shreethemes" target="_blank" className="size-8 inline-flex items-center text-center justify-center tracking-wide border align-middle duration-500 rounded-md border-slate-700 dark:border-slate-800 hover:border-primary bg-slate-800 dark:bg-gray-900 hover:bg-primary dark:hover:bg-primary text-gray-400 hover:text-white"><i className="uil uil-dribbble align-middle" title="dribbble"></i></Link></li>
                                <li className="inline ms-1"><Link to="https://www.behance.net/shreethemes" target="_blank" className="size-8 inline-flex items-center text-center justify-center tracking-wide border align-middle duration-500 rounded-md border-slate-700 dark:border-slate-800 hover:border-primary bg-slate-800 dark:bg-gray-900 hover:bg-primary dark:hover:bg-primary text-gray-400 hover:text-white"><i className="uil uil-behance" title="Behance"></i></Link></li>
                                <li className="inline ms-1"><Link to="http://linkedin.com/company/shreethemes" target="_blank" className="size-8 inline-flex items-center text-center justify-center tracking-wide border align-middle duration-500 rounded-md border-slate-700 dark:border-slate-800 hover:border-primary bg-slate-800 dark:bg-gray-900 hover:bg-primary dark:hover:bg-primary text-gray-400 hover:text-white"><i className="uil uil-linkedin" title="Linkedin"></i></Link></li>
                                <li className="inline ms-1"><Link to="https://www.facebook.com/shreethemes" target="_blank" className="size-8 inline-flex items-center text-center justify-center tracking-wide border align-middle duration-500 rounded-md border-slate-700 dark:border-slate-800 hover:border-primary bg-slate-800 dark:bg-gray-900 hover:bg-primary dark:hover:bg-primary text-gray-400 hover:text-white"><i className="uil uil-facebook-f align-middle" title="facebook"></i></Link></li> */}
                <li className='inline ms-1'>
                  <Link
                    to='https://linkedin.com/'
                    target='_blank'
                    className='size-8 inline-flex items-center text-center justify-center tracking-wide border align-middle duration-500 rounded-md border-slate-700 dark:border-slate-800 hover:border-primary bg-slate-800 dark:bg-gray-900 hover:bg-primary dark:hover:bg-primary text-gray-400 hover:text-white'
                  >
                    <i
                      className='uil uil-linkedin align-middle'
                      title='linkedin'
                    ></i>
                  </Link>
                </li>
                <li className='inline ms-1'>
                  <Link
                    to='https://www.instagram.com/'
                    target='_blank'
                    className='size-8 inline-flex items-center text-center justify-center tracking-wide border align-middle duration-500 rounded-md border-slate-700 dark:border-slate-800 hover:border-primary bg-slate-800 dark:bg-gray-900 hover:bg-primary dark:hover:bg-primary text-gray-400 hover:text-white'
                  >
                    <i
                      className='uil uil-instagram align-middle'
                      title='instagram'
                    ></i>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
      {/* <!-- End Footer --> */}

      {/* <!-- Back to top --> */}
      <Link
        to='home'
        id='back-to-top'
        className='back-to-top fixed hidden text-lg rounded-full z-10 bottom-5 end-5 h-9 w-9 text-center bg-primary text-white leading-9'
      >
        <i className='uil uil-arrow-up'></i>
      </Link>
      {/* <!-- Back to top --> */}
    </>
  );
}
