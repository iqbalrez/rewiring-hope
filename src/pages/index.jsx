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

import EventAbout from '../component/EventAbout';
import Pricing from '../component/Pricing';
import Speaker from '../component/Speaker';
import Footer from '../component/Footer';
import Navbar from '../component/navbar';
import TicketRegistration from '../component/TicketRegistration';
import WordClouds from '../component/WordClouds';
import EventAudience from '../component/EventAudience';
import EventTheme from '../component/EventTheme';
import Why from '../component/Why';

import Services from '../component/template/Services';
import Blog from '../component/template/Blog';
import Contact from '../component/Contact';
import Portfolio from '../component/template/Portfolio';
import Review from '../component/template/Testimonial';
import Switcher from '../component/Switcher';
import GetInTouch from '../component/template/GetInTouch';

/**
 * Index Component
 */
export default function Index() {
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
                    'Healing Brain',
                    1000, // wait 1s before replacing "Healing Brain"
                    'H',
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
                Rewiring Hope and Relationship through Neuroscience
              </p>
            </div>

            {/* Floating Register Button and Countdown in one div */}
            <div className='flex flex-col space-y-4 h-full justify-center'>
              {/* Register Button */}
              <div className='flex'>
                <a
                  href='#register'
                  className='hover:scale-105 bg-amber-600 text-white py-3 px-6 rounded-full shadow-lg hover:bg-amber-700 transition-all duration-300 w-fit'
                >
                  Register Now →
                </a>
              </div>
              {/* Countdown Timer */}
              <div className='bg-slate-100 text-dark p-6 rounded-lg shadow-lg flex flex-col gap-2 w-fit'>
                <p className='text-xs'>Event Countdown</p>
                <Countdown
                  date={new Date('2026-07-04T00:00:00')}
                  renderer={renderer}
                  className='text-lg font-bold p-2 bg-slate-200/10 rounded-md'
                />
              </div>
            </div>
          </div>
        </section>

        {/* Event About section */}
        <EventAbout />

        {/* Speaker section */}
        <Speaker />

        {/* Event Audience section */}
        <EventAudience />

        {/* Event Theme section */}
        <EventTheme />

        {/* Why section */}
        <Why />

        {/* Ending section */}
        <section className='relative py-16 md:py-24 bg-dark' id='ending'>
          <div
            className='container mx-auto'
            data-aos='fade-up'
            data-aos-delay='200'
          >
            <div className='flex flex-col gap-2'>
              <div className='relative rounded-md overflow-hidden mb-4 aspect-[25/9]'>
                <img
                  src={TeamImage}
                  className='object-bottom object-cover w-full h-full'
                  alt=''
                />
              </div>

              <p className='text-slate-200 text-center dark:text-slate-300 max-w-5xl mx-auto md:text-lg'>
                Warisan terbesar bukanlah harta, melainkan jejak harapan yang
                kita tinggalkan di hati generasi berikutnya.
              </p>
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

        <Pricing setType={setTicketType} setTicketPrice={setTicketPrice} />

        {/* Pricing section */}
        <TicketRegistration
          initialType={ticketType}
          initialPrice={ticketPrice}
        />

        <section
          className='relative px-8 py-16 md:px-0 md:py-24 bg-slate-100 dark:bg-slate-800'
          id='partners'
        >
          <div
            className='container mx-auto'
            data-aos='fade-up'
            data-aos-delay='200'
          >
            <div className='flex flex-col lg:flex-row max-w-2xl mx-auto gap-6'>
              <div className='flex p-6 bg-white rounded-md w-full justify-center shadow-lg aspect-video'>
                <img
                  src={TELImage}
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
            </div>
          </div>
        </section>

        {/* Footer section */}
        <Footer />
      </div>
    </>
  );
}
