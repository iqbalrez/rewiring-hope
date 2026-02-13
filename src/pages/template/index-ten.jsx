import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import bg from '../../assets/images/hero.png';
import About1 from '../../assets/images/hero1.png';

import Services from '../../component/template/Services';
import About from '../../component/template/About';
import Pricing from '../../component/Pricing';
import Blog from '../../component/template/Blog';
import Contact from '../../component/Contact';
import Footer from '../../component/Footer';
import Portfolio from '../../component/template/Portfolio';
import Review from '../../component/template/Testimonial';
import Switcher from '../../component/Switcher';
import Navbar from '../../component/navbar';
import CountUp from 'react-countup';

/**
 * Index eight
 */
export default function IndexTen() {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <div>
        <Navbar navdark={true} />

        <section
          className='py-36 lg:py-48 w-full table relative overflow-hidden'
          id='home'
        >
          <div
            className='absolute inset-0  bg-top-left bg-cover'
            style={{ backgroundImage: `url(${bg})` }}
          ></div>
          <div className='container relative'>
            <div className='grid md:grid-cols-12 grid-cols-1 items-center mt-8 gap-[30px] relative'>
              <div className='lg:col-span-7 md:col-span-6'>
                <marquee className='max-w-3xs'>
                  <ul className='list-none'>
                    <li className='inline text-primary font-medium'>
                      <i className='mdi mdi-square-medium'></i> Creative
                      solutions for everyone
                    </li>
                    <li className='inline text-primary font-medium'>
                      <i className='mdi mdi-square-medium'></i> Creative
                      solutions for everyone
                    </li>
                    <li className='inline text-primary font-medium'>
                      <i className='mdi mdi-square-medium'></i> Creative
                      solutions for everyone
                    </li>
                  </ul>
                </marquee>

                <h4 className='lg:text-6xl text-4xl lg:leading-normal leading-normal font-semibold mb-7 position-relative'>
                  Digital Agency Adventure in Marketing
                </h4>

                <p className='text-slate-400 mb-0 max-w-2xl text-lg'>
                  Launch your campaign and benefit from our expertise on
                  designing and managing conversion centered Tailwind CSS html
                  page.
                </p>

                <div className='relative mt-8'>
                  <Link
                    to='#'
                    className='py-2 px-5 inline-block font-normal tracking-wide border align-middle duration-500 text-base text-center bg-primary hover:bg-primary-dark border-primary hover:border-primary-dark text-white rounded-full me-1'
                  >
                    Get Started
                  </Link>
                  <Link
                    to='#'
                    onClick={() => setOpen(!isOpen)}
                    className='size-12 inline-flex items-center text-center justify-center tracking-wide border align-middle duration-500 bg-primary/5 hover:bg-primary border-primary/10 hover:border-primary text-primary hover:text-white rounded-full lightbox'
                  >
                    <i className='mdi mdi-play text-xl align-middle'></i>
                  </Link>
                  <small className='font-medium text-sm uppercase align-middle ms-2 dark:text-white/70'>
                    Watch Now
                  </small>
                </div>
              </div>

              <div className='lg:col-span-5 md:col-span-6 relative'>
                <div className='overflow-hidden h-[560px] w-[450px] bg-gradient-to-tl to-primary/20 via-primary/70 from-primary -z-1 shadow-md shadow-primary/10 rounded-full'>
                  <img src={About1} className='mx-auto' alt='' />
                </div>

                <div className='absolute flex justify-between items-center bottom-20 md:-start-10 -start-5 p-4 rounded-lg shadow-md dark:shadow-gray-800 bg-white dark:bg-slate-900 w-60 m-3'>
                  <div className='flex items-center'>
                    <div className='flex items-center justify-center h-[65px] min-w-[65px] bg-primary/5 text-primary text-center rounded-full me-3'>
                      <i className='uil uil-airplay text-3xl'></i>
                    </div>
                    <div className='flex-1'>
                      <h6 className='text-slate-400'>Visitor</h6>
                      <p className='text-xl font-medium'>
                        <CountUp className='counter-value' end='4589' />
                      </p>
                    </div>
                  </div>

                  <span className='text-red-600'>
                    <i className='uil uil-chart-down'></i> 0.5%
                  </span>
                </div>

                <div className='absolute top-20 lg:-end-7 -end-5 p-4 rounded-lg shadow-md dark:shadow-gray-800 bg-white dark:bg-slate-900 w-48 m-3'>
                  <h5 className='text-lg font-medium mb-3'>Manage Software</h5>
                  <div className='flex justify-between mt-3 mb-2'>
                    <span className='text-slate-400'>Progress</span>
                    <span className='text-slate-400'>84%</span>
                  </div>
                  <div className='w-full bg-gray-100 dark:bg-gray-800 rounded-full h-[6px]'>
                    <div
                      className='bg-primary h-[6px] rounded-full'
                      style={{ width: '84%' }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {isOpen && (
            <div className='flex bg-[#00000099] overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full'>
              <div className='relative p-1 w-full max-w-2xl max-h-full'>
                <div className='relative bg-white rounded-lg shadow-xs dark:bg-gray-700'>
                  <div className='flex items-center justify-between p-1 border-b rounded-t dark:border-gray-600 border-gray-200'>
                    <button
                      type='button'
                      onClick={() => setOpen(!isOpen)}
                      className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white'
                      data-modal-hide='default-modal'
                    >
                      <svg
                        className='w-3 h-3'
                        aria-hidden='true'
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 14 14'
                      >
                        <path
                          stroke='currentColor'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2'
                          d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
                        />
                      </svg>
                      <span className='sr-only'>Close modal</span>
                    </button>
                  </div>
                  <div className='p-1 md:p-1 space-y-4'>
                    <iframe
                      width='100%'
                      height='400'
                      src='https://www.youtube.com/embed/yba7hPeTSjk?playlist=yba7hPeTSjk&loop=1'
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* About section */}
        <About />

        {/* Service section */}
        <Services />

        {/* Portfolio section */}
        <Portfolio />

        {/* Review section */}
        <Review />

        {/* Pricing section */}
        <Pricing />

        {/* Blog section */}
        <Blog />

        {/* Contact section */}
        <Contact />

        {/* Footer section */}
        <Footer />

        {/* Switcher section */}
        <Switcher />
      </div>
    </>
  );
}
