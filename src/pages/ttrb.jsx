import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';
import Countdown from 'react-countdown';
import CountUp from 'react-countup';

import BackgroundImage from '../assets/images/bg/main-hero.jpg';
import TTRBImage from '../assets/images/ttrb/poster.jpeg';

import Footer from '../component/Footer';
import Navbar from '../component/navbar-tthb';
import TicketRegistration from '../component/TicketRegistration';
import WordClouds from '../component/WordClouds';

export default function TTRBPage() {
  const [mounted, setMounted] = useState(false);
  const [ticketType, setTicketType] = useState('MHS');
  const [ticketPrice, setTicketPrice] = useState(150000);
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
    <div className='grid grid-cols-3 gap-4'>
      <div className='flex flex-col items-center '>
        <CountUp
          start={200}
          className='counter-value text-lg font-bold p-2 bg-dark/5 rounded-md'
          end={days}
          duration={2.75}
        />
        <span className='text-xs mt-1'>Days</span>
      </div>
      <div className='flex flex-col items-center '>
        <CountUp
          start={24}
          className='counter-value text-lg font-bold p-2 bg-dark/5 rounded-md'
          end={hours}
          duration={2.75}
        />
        <span className='text-xs mt-1'>Hours</span>
      </div>
      <div className='flex flex-col items-center '>
        <CountUp
          start={60}
          className='counter-value text-lg font-bold p-2 bg-dark/5 rounded-md'
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
        <Navbar />
        {/* Popup Welcome */}
        {popupVisible && (
          <>
            <div className='fixed inset-0 bg-opacity-50 z-50 flex items-center justify-center'>
              <div className='bg-white p-2 mx-6 rounded-lg max-w-3xl w-11/12 md:w-full text-center'>
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
          style={{ backgroundImage: `url(${BackgroundImage})` }}
          className={`py-36 lg:py-64 w-full table relative bg-center bg-cover transition-all duration-700 ease-out ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
          }`}
          id='home'
        >
          <div className='absolute inset-0 bg-gradient-to-tr from-black to-transparent '></div>
          <div className='container relative space-y-8 md:space-y-0 md:flex md:justify-between h-full items-end'>
            <div className='grid grid-cols-1 mt-12'>
              <h1 className='text-white lg:text-5xl text-3xl lg:leading-normal leading-normal font-medium md:mb-7 mb-4 position-relative'>
                Teaching the <br />
                <TypeAnimation
                  sequence={[
                    'Resilient Brain',
                    1000, // wait 1s before replacing "Resilient Brain"
                    'R',
                    100,
                  ]}
                  wrapper='span'
                  speed={12} // Faster speed for typing effect
                  repeat={Infinity}
                  className='typewrite relative text-type-element'
                  cursor={false}
                />
              </h1>

              <p className='text-white opacity-50 mb-0 max-w-2xl text-xs lg:text-lg'>
                Behind every neuron is a learner
                <br />
                Behind every learner is a a human story
                <br />
                Behind every story is the possibility of the growth,
                <br /> resilience, and hope
              </p>
            </div>

            {/* Floating Register Button and Countdown in one div */}
            <div className='flex flex-col space-y-4 h-full justify-center'>
              {/* Register Button */}
              {/* <div className='flex'>
                <a
                  href='#register'
                  className='hover:scale-105 bg-amber-600 text-white py-3 px-6 rounded-full shadow-lg hover:bg-amber-700 transition-all duration-300 w-fit'
                >
                  Mulai Perjalanan Ini →
                </a>
              </div> */}
              {/* Countdown Timer */}
              <div className='bg-slate-100 text-dark p-6 rounded-lg shadow-lg flex flex-col gap-2 w-fit'>
                <p className='text-xs'>Coming Soon</p>
                <Countdown
                  date={new Date('2027-07-24T00:00:00')}
                  renderer={renderer}
                  className='text-lg font-bold p-2 bg-slate-200/10 rounded-md'
                />
              </div>
            </div>
          </div>
        </section>

        {/* Ending section */}
        <section className='relative py-16 md:py-24 bg-dark' id='ending'>
          <div className='container mx-auto'>
            <div className='flex flex-col gap-2'>
              <div className='relative rounded-md overflow-hidden mb-4 lg:w-1/2 mx-auto'>
                <img
                  src={TTRBImage}
                  className='object-bottom object-cover w-full h-full'
                  alt=''
                />
              </div>
            </div>
          </div>
        </section>

        <Link
          to='#'
          onClick={scrollToTop}
          id='back-to-top'
          className='back-to-top fixed text-lg rounded-full z-10 bottom-16 end-5 h-9 w-9 text-center bg-primary text-white leading-9 '
          style={{ display: visible ? 'inline' : 'none' }}
        >
          <i className='uil uil-arrow-up'></i>
        </Link>

        {/* <Pricing setType={setTicketType} setTicketPrice={setTicketPrice} /> */}

        {/* Footer section */}
        <Footer />
      </div>
    </>
  );
}
