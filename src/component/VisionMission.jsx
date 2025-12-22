import React, { useEffect } from 'react';

import AboutImage from '../assets/images/about4.jpg';
import VisionImage from '../assets/images/vision.png';
import MissionImage from '../assets/images/mission.png';
import Aos from 'aos';

export default function VisionMission() {
  useEffect(() => {
    Aos.init();
  }, []);

  return (
    <>
      <section
        className='relative py-24 md:py-48 bg-dark dark:bg-slate-800'
        id='vision'
      >
        <div className='w-full max-w-4xl px-4 lg:px-0 mx-auto'>
          <div className='grid grid-cols-1 lg:grid-cols-12 md:grid-cols-2 gap-10 items-center '>
            <div className='lg:col-span-7'>
              <div className=''>
                <h3
                  className='pt-8 md:pt-0 mb-4 text-4xl font-semibold text-white'
                  data-aos='fade-up'
                  data-aos-delay='400'
                >
                  Vision
                </h3>
                <h6
                  className='text-primary text-xl font-medium italic mb-2'
                  data-aos='fade-up'
                  data-aos-delay='300'
                >
                  Education that heals. <br /> Integrity that shapes. <br />{' '}
                  Hope that lasts.
                </h6>

                <p
                  className='text-slate-400 dark:text-slate-300 max-w-2xl mx-auto md:text-lg'
                  data-aos='fade-up'
                  data-aos-delay='500'
                >
                  Kami percaya pendidikan harus memulihkan, bukan melukai. Mari
                  sambungkan kembali hati dan otak, agar anak kembali percaya
                  masa depan adalah miliknya.
                </p>
              </div>
            </div>

            <div
              className='lg:col-span-5'
              data-aos='fade-up'
              data-aos-delay='200'
            >
              <div className='relative'>
                <img
                  src={VisionImage}
                  className='rounded-lg aspect-[4/3] saturate-120 object-cover relative'
                  alt=''
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className='relative py-24 md:py-48 bg-[#f39c12] dark:bg-slate-800'
        id='mission'
      >
        <div className='w-full max-w-4xl px-4 lg:px-0 mx-auto'>
          <div className='grid grid-cols-1 lg:grid-cols-12 md:grid-cols-2 gap-10 items-center '>
            <div
              className='lg:col-span-5'
              data-aos='fade-up'
              data-aos-delay='200'
            >
              <div className='relative'>
                <img
                  src={MissionImage}
                  className='rounded-lg aspect-[4/3] saturate-120 object-cover object-left relative'
                  alt=''
                />
              </div>
            </div>

            <div
              className='lg:col-span-7 h-full'
              data-aos='fade-up'
              data-aos-delay='400'
            >
              <div className='rounded-xl bg-white p-8 h-full place-content-end'>
                <h3 className='mb-4 text-4xl font-semibold text-dark'>
                  Mission
                </h3>

                <p className='text-dark max-w-2xl mx-auto md:text-lg'>
                  To ignite hope and transform classrooms into spaces that heal,
                  guiding schools and families to nurture resilience, integrity,
                  and the courage to dream again.
                </p>
              </div>
            </div>
          </div>
          <h3
            className='mt-8 text-xl font-bold text-center text-dark'
            data-aos='fade-up'
            data-aos-delay='500'
          >
            Neuroplasticity — Integrity — Human Competencies — Community First
          </h3>
        </div>
      </section>
    </>
  );
}
