import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';
import CountUp from 'react-countup';

import Footer from '../component/Footer';
import BawNavbar from '../component/navbar-baw';
import WordClouds from '../component/WordClouds';

/**
 * Index Component
 */
export default function Baw2027Page() {
  const [mounted, setMounted] = useState(false);
  const [popupVisible, setPopupVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 10);
    return () => clearTimeout(t);
  }, []);

  const [visible, setVisible] = useState(false);

  // Event listener cleanup
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = document.documentElement.scrollTop;
      if (scrolled > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll); // Cleanup event listener
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handlePopupClose = () => {
    setPopupVisible(false); // Set popup visibility to false
  };

  const renderer = ({ days, hours, minutes }) => (
    <div className='grid grid-cols-3 gap-4 w-fit mx-auto'>
      <div className='flex flex-col items-center '>
        <CountUp
          start={200}
          className='counter-value text-lg font-bold p-2 bg-blue-dark/5 rounded-md'
          end={days}
          duration={2.75}
        />
        <span className='text-xs mt-1'>Days</span>
      </div>
      <div className='flex flex-col items-center '>
        <CountUp
          start={24}
          className='counter-value text-lg font-bold p-2 bg-blue-dark/5 rounded-md'
          end={hours}
          duration={2.75}
        />
        <span className='text-xs mt-1'>Hours</span>
      </div>
      <div className='flex flex-col items-center '>
        <CountUp
          start={60}
          className='counter-value text-lg font-bold p-2 bg-blue-dark/5 rounded-md'
          end={minutes}
          duration={2.75}
        />
        <span className='text-xs mt-1'>Minutes</span>
      </div>
    </div>
  );

  return (
    <>
      <div>
        <BawNavbar />
        {/* Popup Welcome */}
        {popupVisible && (
          <>
            <div className='fixed inset-0 bg-opacity-50 z-50 flex items-center justify-center'>
              <div className='bg-white p-6 mx-6 rounded-lg max-w-3xl w-full text-center'>
                <WordClouds handlePopupClose={handlePopupClose} />
              </div>
              <div
                className='absolute inset-0 -z-1 bg-black/20 w-screen h-screen'
                onClick={handlePopupClose}
              ></div>
            </div>
          </>
        )}
        <section
          // style={{ backgroundImage: `url(${BackgroundImage})` }}
          className={`h-screen bg-blue-dark py-24 md:py-48 w-full table relative bg-center bg-cover transition-all duration-700 ease-out ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
          }`}
          id='home'
        >
          {/* <div className='absolute inset-0 bg-gradient-to-tr from-black/35 to-transparent '></div> */}
          <div className='container grid grid-cols-1 md:grid-cols-12 mx-auto items-center'>
            <div className='col-span-8 grid grid-cols-1 md:grid-cols-7 gap-4 items-center'>
              <div className='flex flex-col justify-center text-center md:text-start md:col-span-4'>
                <h1 className='text-white lg:text-5xl text-3xl font-medium md:mb-4 mb-4 position-relative'>
                  Your Voice
                  <br />
                  <TypeAnimation
                    sequence={['in Medicine', 1000, 'i', 100]}
                    wrapper='span'
                    speed={12} // Faster speed for typing effect
                    repeat={Infinity}
                    className='typewrite relative text-type-element '
                    cursor={false}
                  />
                </h1>
                <p className='text-amber-500 font-bold mb-0 max-w-2xl text-xs lg:text-lg'>
                  Coming Soon!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer section */}
        <Footer />
        <Link
          to='#'
          onClick={scrollToTop}
          id='back-to-top'
          className='back-to-top fixed text-lg rounded-full z-10 bottom-16 end-5 h-9 w-9 text-center bg-amber-600 text-white leading-9 '
          style={{ display: visible ? 'inline' : 'none' }}
        >
          <i className='uil uil-arrow-up'></i>
        </Link>
      </div>
    </>
  );
}
