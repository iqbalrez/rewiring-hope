import React, { useEffect } from 'react';
import Aos from 'aos';

import bg from '../../assets/images/bg/2.jpg';
import { feature } from '../../data/data';

import Navbar from '../../component/navbar';
import Review from '../../component/template/Testimonial';
import Contact from '../../component/Contact';
import Footer from '../../component/Footer';
import Switcher from '../../component/Switcher';
import AboutAos from '../../component/about-aos';
import ServicesAos from '../../component/template/services-aos';
import PortfolioAos from '../../component/template/portfolio-aos';
import PricingAos from '../../component/template/pricing-aos';
import BlogAos from '../../component/template/blog-aos';

export default function IndexEleven() {
  useEffect(() => {
    Aos.init();
  }, []);

  return (
    <>
      <Navbar navdark={true} bg={true} />

      <section
        className='py-36 lg:py-64 w-full table relative bg-center bg-cover'
        id='home'
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div className='absolute inset-0 bg-slate-950/50'></div>
        <div className='container relative'>
          <div className='grid grid-cols-1 text-center'>
            <h4
              className='text-white lg:text-5xl text-4xl lg:leading-normal leading-normal font-medium mb-7 position-relative wow animate__animated animate__fadeInUp'
              data-aos='fade-up'
              data-aos-delay='100'
            >
              Smart Marketing Agency <br /> For Your Business
            </h4>
            <p
              className='text-white/50 mb-0 max-w-2xl text-lg mx-auto'
              data-aos='fade-up'
              data-aos-delay='200'
            >
              Launch your campaign and benefit from our expertise on designing
              and managing conversion centered Tailwind CSS html page.
            </p>
            <div className='text-center subcribe-form mt-4 pt-2'>
              <form className='relative mx-auto'>
                <input
                  type='email'
                  id='subemail'
                  name='email'
                  className='rounded-full bg-white/70 border'
                  placeholder='E-mail :'
                />
                <button
                  type='submit'
                  className='py-2 px-5 font-normal tracking-wide border align-middle duration-500 text-base text-center bg-primary hover:bg-primary-dark border-primary hover:border-primary-dark text-white rounded-full justify-center flex items-center absolute top-0.75 end-0.75 h-11'
                >
                  Submit <i className='uil uil-arrow-right'></i>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className='relative bg-primary-400 py-10'>
        <div className='container relative'>
          <div className='grid lg:grid-cols-6 md:grid-cols-3 sm:grid-cols-2 grid-cols-2 gap-6'>
            {feature.map((item, index) => {
              return (
                <div
                  className='group text-center wow animate__animated animate__fadeInUp'
                  key={index}
                  data-aos='fade-up'
                  data-aos-delay={item.duration}
                >
                  <div className='size-14 group-hover:bg-white/20 text-white text-4xl group-hover:text-3xl duration-500 mx-auto rounded-full flex justify-center items-center '>
                    <i className={item.icon}></i>
                  </div>

                  <div className='content mt-2'>
                    <h6 className='text-white text-lg font-medium'>
                      {item.title}
                    </h6>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <AboutAos />

      <ServicesAos />

      <PortfolioAos />

      {/* Review section */}
      <div data-aos='fade-up'>
        <Review />
      </div>

      <PricingAos />

      <BlogAos />

      <div data-aos='fade-up'>
        <Contact />
      </div>

      <Footer />

      <Switcher />
    </>
  );
}
