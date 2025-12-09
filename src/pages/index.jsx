import React from 'react';
import { Link } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import BackgroudImage from '../assets/images/bg/5.jpg';
import Services from '../component/Services';
import About from '../component/About';
import Pricing from '../component/Pricing';
import Blog from '../component/Blog';
import Contact from '../component/Contact';
import Footer from '../component/Footer';
import Portfolio from '../component/Portfolio';
import Review from '../component/Testimonial';
import Switcher from '../component/Switcher';
import Navbar from '../component/navbar';

import { TypeAnimation } from 'react-type-animation';

/**
 * Index Component
 */
export default function Index() {
  return (
    <>
      <div>
        <Navbar />
        <section
          style={{ backgroundImage: `url(${BackgroudImage})` }}
          className='py-36 lg:py-64 w-full table relative bg-center bg-cover'
          id='home'
        >
          <div className='absolute inset-0 bg-dark/40'></div>
          <div className='container relative'>
            <div className='grid grid-cols-1 mt-12'>
              <h4 className='text-white lg:text-5xl text-3xl lg:leading-normal leading-normal font-medium mb-7 position-relative'>
                Rewiring Hope and Relationship <br />
                through
                <TypeAnimation
                  sequence={[
                    // Same substring at the start will only be typed out once, initially
                    'Neuroscience',
                    1000, // wait 1s before replacing "Mice" with "Hamsters"
                    '',
                    100,
                  ]}
                  wrapper='span'
                  speed={10}
                  repeat={Infinity}
                  className='typewrite relative text-type-element ms-2'
                  cursor={false}
                />
              </h4>

              <p className='text-white opacity-50 mb-0 max-w-2xl text-xs lg:text-lg'>
                Satu Hari Forum Publik <br></br>27 Juni 2026 | Militaire
                Societeit, Taman Budaya Yogyakarta
              </p>

              <div className='relative mt-10'>
                <ScrollLink
                  to='about'
                  smooth={true}
                  spy={true}
                  duration={500}
                  className='animate-bounce py-2 px-5 inline-block font-normal tracking-wide border align-middle duration-500 text-base text-center bg-primary hover:bg-primary-dark border-primary hover:border-primary-dark text-white rounded-full'
                >
                  Learn More
                </ScrollLink>
              </div>
            </div>
          </div>
        </section>

        {/* About section */}
        {/* <About /> */}

        {/* Service section */}
        {/* <Services /> */}

        {/* Portfolio section */}
        {/* <Portfolio /> */}

        {/* Review section */}
        {/* <Review /> */}

        {/* Pricing section */}
        {/* <Pricing /> */}

        {/* Blog section */}
        {/* <Blog /> */}

        {/* Contact section */}
        {/* <Contact /> */}

        {/* Footer section */}
        {/* <Footer /> */}
      </div>
    </>
  );
}
