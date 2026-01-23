import React, { useEffect, useState } from 'react';

import BackgroudImage from '../assets/images/bg/4.jpg';

import About from '../component/about-aos';
import Team from '../component/team-aos';
import Footer from '../component/Footer';
import Navbar from '../component/navbar';
import VisionMission from '../component/VisionMission';
import AddWord from '../component/AddWord';
import WordClouds from '../component/WordClouds';

import EndImage from '../assets/images/end.png';
import LogoDark from '../assets/images/logo-dark.png';

export default function AboutPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 10);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <Navbar />

      {/* Word Cloud */}
      <WordClouds />

      <section
        className={`transition-all duration-700 ease-out ${
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <VisionMission />

        {/* About section */}
        <About />

        {/* Team */}
        <Team />
      </section>

      <section className='w-screen relative'>
        <div className='flex flex-col lg:flex-row gap-6 w-full aspect-video'>
          <img
            src={EndImage}
            className='w-full h-full object-bottom object-cover'
            alt=''
          />
        </div>
        <div className='absolute top-20 translate-x-1/2 right-1/2 flex flex-col w-sm gap-6 justify-center'>
          <img src={LogoDark} className='w-full' />
          <p className='font-bold text-dark text-center'>
            Kami ada untuk menyalakan kembali harapan satu kelas, satu guru,
            satu anak pada satu waktu.
          </p>
        </div>
      </section>
      {/* Footer section */}
      <Footer />
    </>
  );
}
