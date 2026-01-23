import React, { useEffect } from 'react';

import WhyImage from '../assets/images/why-section.webp';
import TeamAos from './team-aos';
import Sign from '../assets/images/sign.png';
import { Link } from 'react-router-dom';
import Aos from 'aos';
import { Link as ScrollLink } from 'react-scroll';

export default function Why() {
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
            <div className='lg:col-span-5 h-full'>
              <div className='relative overflow-hidden rounded-lg h-full md:rounded-s-md md:rounded-e-4xl'>
                <img
                  src={WhyImage}
                  className='object-cover object-center w-full h-full'
                  alt=''
                />
              </div>
            </div>
            {/* end col */}

            <div className='lg:col-span-7'>
              <div className='lg:ms-7'>
                <h3 className='mb-4 md:text-2xl text-xl font-bold text-primary dark:text-white'>
                  Mengapa Acara Ini Penting?
                </h3>

                <p className='text-dark dark:text-slate-300 max-w-2xl mx-auto md:text-lg'>
                  Kita sering lupa hal sederhana ini:
                  <br />
                  <span className='font-bold'>
                    Satu guru yang memahami,
                    <br />
                    Satu orang tua yang hadir,
                    <br />
                    dan satu keputusan kecil…
                    <br />
                    bisa mengubah arah hidup seorang anak.
                  </span>
                  <br />
                  <br />
                  Kita sedang membutuhkan hal-hal yang paling mendasar: hubungan
                  yang hangat, motivasi yang sehat, otak yang aman untuk
                  belajar, dan pendampingan yang benar-benar manusiawi.
                  <br /> <br />
                  Saatnya kita bergandeng tangan dan mulai membangun ulang
                  fondasi: ketangguhan, rasa aman, dan harapan.
                  <br />
                  <br />
                  <span className='font-bold'>
                    Jika kita ingin generasi yang kuat, mulai dari diri kita.
                    Hari ini.
                  </span>
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
