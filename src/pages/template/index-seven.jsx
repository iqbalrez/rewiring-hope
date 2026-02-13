import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import bg1 from '../../assets/images/bg/1.jpg';
import bg2 from '../../assets/images/bg/2.jpg';
import bg3 from '../../assets/images/bg/3.jpg';

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

import { TypeAnimation } from 'react-type-animation';

/**
 * Index seven
 */
export default function IndexSeven() {
  const images = [bg1, bg2, bg3];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <>
      <Navbar />
      <section
        style={{ backgroundImage: `url(${images[currentImageIndex]})` }}
        className='py-36 lg:py-64 w-full table relative bg-center bg-cover'
        id='home'
      >
        <div className='absolute inset-0 bg-slate-900/70'></div>
        <div className='container relative'>
          <div className='grid grid-cols-1 mt-12'>
            <h4 className='text-white lg:text-5xl text-4xl lg:leading-normal leading-normal font-medium mb-7 position-relative'>
              Providing Brilliant Ideas <br />
              For Your
              <TypeAnimation
                sequence={[
                  // Same substring at the start will only be typed out once, initially
                  'Business',
                  1000, // wait 1s before replacing "Mice" with "Hamsters"
                  'Startups',
                  1000,
                  'Digital Agency',
                  1000,
                  'Marketing',
                  1000,
                ]}
                wrapper='span'
                speed={10}
                repeat={Infinity}
                className='typewrite relative text-type-element ms-2'
                cursor={false}
              />
            </h4>

            <p className='text-white opacity-50 mb-0 max-w-2xl text-lg'>
              Launch your campaign and benefit from our expertise on designing
              and managing conversion centered Tailwind CSS html page.
            </p>

            <div className='relative mt-10'>
              <Link
                to='#'
                className='py-2 px-5 inline-block font-normal tracking-wide border align-middle duration-500 text-base text-center bg-primary hover:bg-primary-dark border-primary hover:border-primary-dark text-white rounded-md'
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
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
    </>
  );
}
