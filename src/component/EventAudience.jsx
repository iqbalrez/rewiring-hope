import React, { useEffect } from 'react';

import AudienceImage from '../assets/images/bg/audience.jpg';
import TeamAos from './team-aos';
import Sign from '../assets/images/sign.png';
import { Link } from 'react-router-dom';
import Aos from 'aos';

export default function EventAudience() {
  useEffect(() => {
    Aos.init();
  }, []);

  return (
    <>
      <section
        className='relative py-24 bg-slate-100 dark:bg-slate-800'
        id='about'
      >
        <div
          className='container mx-auto'
          data-aos='fade-up'
          data-aos-delay='200'
        >
          <div className='grid grid-cols-1 lg:grid-cols-12 md:grid-cols-2 gap-10 items-start'>
            <div className='lg:col-span-5'>
              <div className='relative overflow-hidden rounded-lg aspect-video md:rounded-s-md md:rounded-e-4xl'>
                <img
                  src={AudienceImage}
                  className='object-cover w-full  h-full'
                  alt=''
                />
              </div>
            </div>
            {/* end col */}

            <div className='lg:col-span-7'>
              <div className='lg:ms-7'>
                <h6 className='text-primary text-base font-medium uppercase mb-2'>
                  Teaching the Healing Brain: 27 Juni 2026
                </h6>
                <h3 className='mb-4 md:text-2xl text-xl font-medium dark:text-white'>
                  Siapa yang Harus Hadir?
                </h3>

                <p className='text-dark dark:text-slate-300 max-w-2xl mx-auto md:text-lg'>
                  Untuk pendidik, orang tua, pembuat kebijakan, mahasiswa
                  pendidikan/psikologi, dan profesional kesehatan mental yang
                  ingin menciptakan pendidikan berbasis empati dan ilmu otak.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- End --> */}
    </>
  );
}
