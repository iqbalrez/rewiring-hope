import { Link } from 'react-router-dom';

import bg1 from '../../assets/images/bg/2.jpg';
import bg2 from '../../assets/images/bg/4.jpg';
import bg3 from '../../assets/images/bg/1.jpg';

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

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';

export default function IndexTwelve() {
  return (
    <>
      <Navbar />

      <section
        className='swiper mySwiper swiper-slider-hero relative block h-screen'
        id='home'
      >
        <Swiper
          className='swiper-wrapper'
          loop={true}
          modules={[Autoplay]}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          speed={2000}
        >
          <SwiperSlide className='swiper-slide flex items-center overflow-hidden'>
            <div
              className='slide-inner absolute start-0 top-0 w-full h-full slide-bg-image flex items-center bg-center bg-no-repeat bg-cover'
              style={{ backgroundImage: `url(${bg1})` }}
            >
              <div className='absolute inset-0 bg-slate-900/70 z-2'></div>
              <div className='container relative md:mt-16 z-10'>
                <div className='grid grid-cols-1'>
                  <h4 className='text-white lg:text-5xl text-4xl lg:leading-normal leading-normal font-medium mb-7 position-relative'>
                    Everything you need to build <br /> a great company
                  </h4>

                  <p className='text-white/50 mb-0 max-w-2xl text-lg'>
                    Launch your campaign and benefit from our expertise on
                    designing and managing conversion centered Tailwind CSS html
                    page.
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
            </div>
          </SwiperSlide>

          <SwiperSlide className='swiper-slide flex items-center overflow-hidden'>
            <div
              className='slide-inner absolute start-0 top-0 w-full h-full slide-bg-image flex items-center  bg-center bg-no-repeat bg-cover'
              style={{ backgroundImage: `url(${bg2})` }}
            >
              <div className='absolute inset-0 bg-slate-900/70 z-2'></div>
              <div className='container relative md:mt-16 z-10'>
                <div className='grid grid-cols-1'>
                  <h4 className='text-white lg:text-5xl text-4xl lg:leading-normal leading-normal font-medium mb-7 position-relative'>
                    Everything you need to build <br /> a great company
                  </h4>

                  <p className='text-white/50 mb-0 max-w-2xl text-lg'>
                    Launch your campaign and benefit from our expertise on
                    designing and managing conversion centered Tailwind CSS html
                    page.
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
            </div>
          </SwiperSlide>

          <SwiperSlide className='swiper-slide flex items-center overflow-hidden'>
            <div
              className='slide-inner absolute start-0 top-0 w-full h-full slide-bg-image flex items-center bg-center bg-no-repeat bg-cover'
              style={{ backgroundImage: `url(${bg3})` }}
            >
              <div className='absolute inset-0 bg-slate-900/70 z-2'></div>
              <div className='container relative md:mt-16 z-10'>
                <div className='grid grid-cols-1'>
                  <h4 className='text-white lg:text-5xl text-4xl lg:leading-normal leading-normal font-medium mb-7 position-relative'>
                    Everything you need to build <br /> a great company
                  </h4>

                  <p className='text-white/50 mb-0 max-w-2xl text-lg'>
                    Launch your campaign and benefit from our expertise on
                    designing and managing conversion centered Tailwind CSS html
                    page.
                  </p>

                  <div className='relative mt-10'>
                    <Link
                      to=''
                      className='py-2 px-5 inline-block font-normal tracking-wide border align-middle duration-500 text-base text-center bg-primary hover:bg-primary-dark border-primary hover:border-primary-dark text-white rounded-md'
                    >
                      Get Started
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>

        <div className='swiper-button-next bg-transparent !size-8 leading-8 -mt-7 text-xl bg-none border border-solid border-white/20 !text-white hover:bg-primary hover:border-primary rounded-full text-center'>
          <i className='uil uil-angle-right'></i>
        </div>
        <div className='swiper-button-prev bg-transparent !size-8 leading-8 -mt-7 text-xl bg-none border border-solid border-white/20 !text-white hover:bg-primary hover:border-primary rounded-full text-center'>
          <i className='uil uil-angle-left'></i>
        </div>
      </section>

      <About />

      <Services />

      <Portfolio />

      <Review />

      <Pricing />

      <Blog />

      <Contact />

      <Footer />

      <Switcher />
    </>
  );
}
