import React, { useEffect, useState } from 'react';

import BackgroudImage from '../assets/images/bg/4.jpg';

import About from '../component/about-aos';
import Team from '../component/team-aos';
import Footer from '../component/Footer';
import Navbar from '../component/navbar';
import VisionMission from '../component/VisionMission';
import AddWord from '../component/AddWord';
import WordClouds from '../component/WordClouds';

export default function AboutPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 10);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <Navbar />

      <section
        className={`transition-all duration-700 ease-out ${
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <VisionMission />

        {/* About section */}
        <About />

        {/* Word Cloud */}
        <WordClouds />

        {/* Team */}
        <Team />
      </section>
      {/* Footer section */}
      <Footer />
    </>
  );
}
