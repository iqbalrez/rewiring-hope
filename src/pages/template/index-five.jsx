import React from 'react';
import { Link as Link2 } from 'react-router-dom';

import LaptopImage from '../../assets/images/bg/laptop.png';

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

export default function IndexFive() {
  return (
    <>
      <Navbar navdark={true} themSocial={true} />
      <section
        className='py-36 md:h-auto md:py-0 flex items-center relative bg-primary/5 dark:bg-primary/10'
        id='home'
      >
        <div className='container relative'>
          <div className='grid grid-cols-1 text-center mt-0 md:mt-12 pt-0 md:pt-12'>
            <div className='mt-28'>
              <div>
                <h4 className='lg:text-5xl text-4xl lg:leading-normal leading-normal font-medium mb-7 position-relative dark:text-white'>
                  Unique and bold functionality
                </h4>

                <p className='text-slate-600 dark:text-white/70 opacity-50 mb-0 max-w-2xl text-lg mx-auto'>
                  Launch your campaign and benefit from our expertise on
                  designing and managing conversion centered Tailwind CSS html
                  page.
                </p>

                <div className='relative mt-10'>
                  <Link2
                    to='#'
                    className='py-2 px-5 inline-block font-normal tracking-wide border align-middle duration-500 text-base text-center bg-primary hover:bg-primary-dark border-primary hover:border-primary-dark text-white rounded-md'
                  >
                    Start Free Trail !
                  </Link2>
                </div>
              </div>

              <img src={LaptopImage} alt='' className='relative mt-16' />
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
