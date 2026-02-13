import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import BackgroudImage from '../../assets/images/bg/2.jpg';

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

/**
 * Index Two
 */
export default function IndexTwo() {
  let [isOpen, setOpen] = useState(false);

  return (
    <>
      <Navbar />
      <section
        style={{ backgroundImage: `url(${BackgroudImage})` }}
        className="py-36 lg:py-72 lg:pb-0 md:pb-8 w-full table relative bg-[url('../../assets/images/bg/2.jpg')] bg-center bg-cover"
        id='home'
      >
        <div className='absolute inset-0 bg-slate-900/70'></div>
        <div className='container relative'>
          <div className='grid lg:grid-cols-12 mt-10 md:grid-cols-2 gap-2'>
            <div className='lg:col-span-7'>
              <h4 className='text-white lg:text-5xl text-4xl lg:leading-normal leading-normal font-medium mb-7 position-relative'>
                Bluid your audiance <br /> and sale more
              </h4>

              <p className='text-white opacity-50 mb-0 max-w-2xl text-lg'>
                Launch your campaign and benefit from our expertise on designing
                and managing conversion centered Tailwind CSS html page.
              </p>

              <div className='relative mt-10'>
                <Link
                  to='#'
                  className='py-2 px-5 inline-block font-normal tracking-wide border align-middle duration-500 text-base text-center bg-primary hover:bg-primary-dark border-primary hover:border-primary-dark text-white rounded-full me-1'
                >
                  Get Started
                </Link>
                <Link
                  to='#'
                  onClick={() => setOpen(!isOpen)}
                  className='size-12 inline-flex items-center text-center justify-center tracking-wide border align-middle duration-500 bg-primary hover:bg-primary-dark border-primary hover:border-primary-dark text-white rounded-full lightbox'
                >
                  <i className='mdi mdi-play text-xl align-middle'></i>
                </Link>
                <small className='text-white text-sm uppercase align-middle ms-2'>
                  Watch Now
                </small>
              </div>
            </div>

            <div className='lg:col-span-5 mt-8 md:mt-0'>
              <div className='bg-white dark:bg-slate-900 rounded-xl shadow-sm md:p-10 p-6 lg:ms-10 z-10 relative'>
                <h4 className='mb-5 font-medium text-2xl dark:text-white'>
                  We are offering 14 <br /> days free trial
                </h4>

                <form>
                  <div className='grid grid-cols-1'>
                    <div className='mb-5'>
                      <label className='dark:text-white'>Name</label>
                      <input
                        name='name'
                        id='fName'
                        type='text'
                        className='form-input w-full py-2 px-3 border border-gray-200 dark:border-gray-800 focus:ring-0 focus:border-primary/50 dark:bg-slate-900 dark:text-slate-200 rounded h-10 outline-none mt-2'
                        placeholder='Name :'
                      />
                    </div>
                    <div className='mb-5'>
                      <label className='dark:text-white'>Email</label>
                      <input
                        name='email'
                        id='yEmail'
                        type='email'
                        className='form-input w-full py-2 px-3 border border-gray-200 dark:border-gray-800 focus:ring-0 focus:border-primary/50 dark:bg-slate-900 dark:text-slate-200 rounded h-10 outline-none mt-2'
                        placeholder='Email :'
                      />
                    </div>
                    <div className='mb-5'>
                      <label className='dark:text-white'>Phone No.</label>
                      <input
                        name='number'
                        id='phNumber'
                        className='form-input w-full py-2 px-3 border border-gray-200 dark:border-gray-800 focus:ring-0 focus:border-primary/50 dark:bg-slate-900 dark:text-slate-200 rounded h-10 outline-none mt-2'
                        placeholder='+12 12458 854'
                      />
                    </div>
                    <Link
                      to='#'
                      className='py-2 px-5 inline-block font-normal tracking-wide border align-middle duration-500 text-base text-center bg-primary hover:bg-primary-dark border-primary hover:border-primary-dark text-white rounded-md w-full'
                    >
                      Free Trial
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
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
      <div className='relative'>
        <div className='shape overflow-hidden text-gray-50 dark:text-slate-800'>
          <svg
            viewBox='0 0 2880 250'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M720 125L2160 0H2880V250H0V125H720Z'
              fill='currentColor'
            ></path>
          </svg>
        </div>
      </div>

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
    </>
  );
}
