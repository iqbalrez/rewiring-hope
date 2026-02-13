import React from 'react';
import { Link as Link2 } from 'react-router-dom';

import BackgroudImage from '../../assets/images/bg/video.jpg';

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
 * Index six
 */
export default function IndexSix() {
  return (
    <>
      <Navbar />
      <section
        style={{ backgroundImage: `url(${BackgroudImage})` }}
        className='py-36 lg:py-64 w-full table relative bg-center bg-cover'
        id='home'
      >
        <div className='bg-video-wrapper'>
          <iframe
            title='iframe'
            src='https://player.vimeo.com/video/863336181?background=1&autoplay=1&loop=1&byline=0&title=0'
          ></iframe>
        </div>
        <div className='absolute inset-0 bg-slate-900/70'></div>
        <div className='container relative'>
          <div className='grid grid-cols-1 text-center'>
            <h4 className='text-white lg:text-5xl text-4xl lg:leading-normal leading-normal font-medium mb-7 position-relative'>
              We Collaboration Easy & fast
            </h4>

            <p className='text-white opacity-50 mb-0 max-w-2xl text-lg mx-auto'>
              Launch your campaign and benefit from our expertise on designing
              and managing conversion centered Tailwind CSS html page.
            </p>

            <div className='relative mt-10'>
              <Link2
                to='#'
                className='py-2 px-5 inline-block font-normal tracking-wide border align-middle duration-500 text-base text-center bg-primary hover:bg-primary-dark border-primary hover:border-primary-dark text-white rounded-md'
              >
                Get Started
              </Link2>
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
