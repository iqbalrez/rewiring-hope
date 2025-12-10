import React, { useEffect, useState } from 'react';

import BackgroudImage from '../assets/images/bg/4.jpg';

import About from '../component/About';
import Team from '../component/Team';
import Footer from '../component/Footer';
import Navbar from '../component/navbar';

export default function AboutPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 10);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <Navbar navdark={true} />
      {/* <section
            style={{ backgroundImage: `url(${BackgroudImage})` }}
            className="py-36 md:py-72 w-full table relative bg-center bg-cover jarallax" data-jarallax data-speed="0.5" id="home">
            <div className="absolute inset-0 bg-slate-900/70"></div>
            <div className="container relative">
                <div className="grid grid-cols-1 text-center">
                    <h4 className="text-white lg:text-5xl text-4xl lg:leading-normal leading-normal font-medium mb-7 position-relative">Do you want to change the world?</h4>

                    <p className="text-white opacity-50 mb-0 max-w-2xl text-lg mx-auto">Launch your campaign and benefit from our expertise on designing and managing conversion centered Tailwind CSS html page.</p>

                    <div className="text-center subcribe-form mt-4 pt-2">
                        <form className="relative mx-auto">
                            <input type="email" id="subemail" name="email" className="rounded-full bg-white opacity-70 border border-gray-200" placeholder="E-mail :" />
                            <button type="submit" className="py-2 px-5 inline-block font-normal tracking-wide border align-middle duration-500 text-base text-center bg-primary hover:bg-primary-dark border-primary hover:border-primary-dark text-white rounded-full absolute top-0.75 end-0.75 h-11">Submit <i className="uil uil-arrow-right"></i></button>
                        </form>
                    </div>
                </div>
            </div>
        </section> */}

      <section
        className={`transition-all duration-700 ease-out ${
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        {/* About section */}
        <About />

        {/* Team */}
        <Team />
      </section>
      {/* Footer section */}
      <Footer />
    </>
  );
}
