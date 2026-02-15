import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import { TypeAnimation } from 'react-type-animation';
import Countdown from 'react-countdown';
import CountUp from 'react-countup';

import BackgroundImage from '../assets/images/bg/main-hero.jpg';
import TeamImage from '../assets/images/bg/team.jpg';
import TELImage from '../assets/images/client/TELImage.jpg';
import IBROImage from '../assets/images/client/IBROImage.jpg';
import LogoDark from '../assets/images/logo-dark.png';
import DanaFoundationImageColor from '../assets/images/client/DanaFoundationImageColor.png';

import BawWhiteImage from '../assets/images/client/BawWhite.svg';
import BawIllust from '../assets/images/client/baw-illust.png';

import EventAbout from '../component/BawEventAbout';
import BawPricing from '../component/BawPricing';
import Speaker from '../component/BawSpeaker';
import Footer from '../component/Footer';
import BawNavbar from '../component/navbar-baw';
import BawRegistration from '../component/BawRegistration';
import WordClouds from '../component/WordClouds';
import BawWhy from '../component/BawWhy';
import BawTenant from '../component/BawTenant';
import BawStory from '../component/BawStory';

/**
 * Index Component
 */
export default function BawPage() {
  const [mounted, setMounted] = useState(false);
  const [ticketType, setTicketType] = useState('MHS');
  const [ticketPrice, setTicketPrice] = useState(50000);
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
          className={`bg-dark py-24 md:py-48 w-full table relative bg-center bg-cover transition-all duration-700 ease-out ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
          }`}
          id='home'
        >
          <div className='absolute inset-0 bg-gradient-to-tr from-black/35 to-transparent '></div>
          <div className='container grid grid-cols-1 md:grid-cols-12 mx-auto items-center'>
            <div className='col-span-8 grid grid-cols-1 md:grid-cols-7 gap-4 items-center'>
              <div className='md:col-span-3'>
                <img
                  src={BawIllust}
                  alt='BAW Illustration'
                  className='w-2/3 md:w-full mx-auto object-contain '
                />
              </div>
              <div className='flex flex-col justify-center text-center md:text-start md:col-span-4'>
                <p className='text-xl text-amber-500 font-bold'>2 JULI 2026</p>
                <h1 className='text-white lg:text-5xl text-3xl font-medium md:mb-7 mb-4 position-relative'>
                  Kisah Otak
                  <br />
                  <TypeAnimation
                    sequence={['yang Tangguh', 1000, 'y', 100]}
                    wrapper='span'
                    speed={12} // Faster speed for typing effect
                    repeat={Infinity}
                    className='typewrite relative text-type-element '
                    cursor={false}
                  />
                </h1>

                <p className='text-white opacity-50 mb-0 max-w-2xl text-xs lg:text-lg'>
                  Refleksi, Imajinasi, dan Harapan
                </p>
              </div>
            </div>
            {/* Floating Register Button and Countdown in one div */}
            <div className='col-span-4 flex flex-col gap-2 w-full items-center md:items-end'>
              {/* Register Button */}
              <img
                src={BawWhiteImage}
                alt='BAW Logo'
                className='w-2/3 mx-auto md:mx-0 md:ml-auto'
              />
              <div className='w-fit flex flex-col gap-2 md:items-end'>
                <a
                  href='#register'
                  className='w-full hover:scale-105 bg-amber-600 text-white py-3 px-6 rounded-full shadow-lg hover:bg-amber-700 transition-all duration-300'
                >
                  Daftar Kompetisi →
                </a>
                {/* Countdown Timer */}
                <div className='bg-slate-100 text-dark p-6 rounded-lg shadow-lg flex flex-col gap-2 w-fit'>
                  <p className='text-xs'>Event Countdown</p>
                  <Countdown
                    date={new Date('2026-07-02T00:00:00')}
                    renderer={renderer}
                    className='text-lg font-bold p-2 bg-slate-200/10 rounded-md'
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Event About section */}
        <EventAbout />

        {/* Speaker section */}
        <Speaker />

        {/* Pricing section */}
        <BawPricing setType={setTicketType} setPrice={setTicketPrice} />

        {/* Why Section */}
        <BawWhy />

        {/* BawPricing section */}
        <BawRegistration initialType={ticketType} price={ticketPrice} />

        {/* Tenant Section */}
        <BawTenant />

        {/* Story Section */}
        <BawStory />

        <section
          className='relative px-8 py-16 md:px-0 md:py-24 bg-slate-100 dark:bg-slate-800'
          id='partners'
        >
          <div
            className='container mx-auto'
            data-aos='fade-up'
            data-aos-delay='200'
          >
            <div className='flex flex-col lg:flex-row max-w-full mx-auto gap-6'>
              <div className='flex p-6 bg-white rounded-md w-full justify-center shadow-lg aspect-video'>
                <img
                  src={TELImage}
                  className='max-w-full h-full object-contain'
                  alt=''
                />
              </div>

              <div className='flex p-6 bg-white rounded-md w-full justify-center shadow-lg aspect-video'>
                <img
                  src={LogoDark}
                  className='max-w-full h-full object-contain'
                  alt=''
                />
              </div>
              <div className='flex p-6 bg-white rounded-md w-full justify-center shadow-lg aspect-video'>
                <img
                  src={IBROImage}
                  className='max-w-full h-full object-contain'
                  alt=''
                />
              </div>
              <div className='flex p-6 bg-white rounded-md w-full justify-center shadow-lg aspect-video'>
                <img
                  src={DanaFoundationImageColor}
                  className='max-w-full h-full object-contain'
                  alt=''
                />
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
