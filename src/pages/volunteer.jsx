import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import BackgroundImage from '../assets/images/volunteer/HeroImage.jpg';
import Footer from '../component/Footer';
import VolunteerNavbar from '../component/navbar-volunteer';
import VolunteerWhy from '../component/VolunteerWhy';
import VolunteerJobdesc from '../component/VolunteerJobdesc';
import VolunteerReq from '../component/VolunteerReq';
import VolunteerBenefit from '../component/VolunteerBenefit';
import VolunteerImpact from '../component/VolunteerImpact';
import VolunteerRegistration from '../component/VolunteerRegistration';

/**
 * Index Component
 */
export default function VolunteerPage() {
  const [mounted, setMounted] = useState(false);

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

  return (
    <>
      <div>
        <VolunteerNavbar />
        <section
          style={{
            backgroundImage: `url(${BackgroundImage})`,
            backgroundPosition: 'center',
          }}
          className={`py-36 lg:py-64 w-full table relative bg-center bg-cover transition-all duration-700 ease-out ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
          }`}
          id='home'
        >
          <div className='absolute inset-0 bg-gradient-to-tl from-dark via-dark/70 to-transparent flex items-end justify-center text-center p-8'>
            <p className='text-white text-md font-semibold'>
              You help translate neuroscience into people can see, feel, and
              understand.
            </p>
          </div>
          <div className='container relative space-y-8 md:space-y-0 md:flex md:justify-end h-full items-end'>
            {/* Floating Register Button and Countdown in one div */}
            <div className='flex flex-col space-y-4 h-full justify-end text-end'>
              <p className='text-white text-xl font-black'>
                Make an Impact This July!
              </p>
              <p className='text-white text-md font-semibold'>
                2 Juli 2026 - Brain Awareness Week <br />
                📍 Grhatama Pustaka DIY
              </p>
              <p className='text-white text-md font-semibold'>
                2 Juli 2026 - Teaching The Healing Brain <br />
                📍 Taman Budaya Yogyakarta
              </p>
              <div className='flex justify-end'>
                <a
                  href='#register'
                  className='hover:scale-105 bg-white font-semibold text-blue-dark py-3 px-6 rounded-full shadow-lg hover:bg-primary hover:text-white transition-all duration-300 w-fit'
                >
                  Register Now →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing section */}
        <VolunteerWhy />

        {/* Tenant Section */}
        <VolunteerJobdesc />

        <VolunteerReq />

        {/* Why Section */}
        <VolunteerBenefit />

        {/* BawPricing section */}
        <VolunteerImpact />

        <VolunteerRegistration />

        {/* Footer section */}
        <Footer />
        <Link
          to='#'
          onClick={scrollToTop}
          id='back-to-top'
          className='back-to-top fixed text-lg rounded-full z-10 bottom-16 end-5 h-9 w-9 text-center bg-primary text-white leading-9 '
          style={{ display: visible ? 'inline' : 'none' }}
        >
          <i className='uil uil-arrow-up'></i>
        </Link>
      </div>
    </>
  );
}
