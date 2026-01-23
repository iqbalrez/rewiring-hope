import React, { useEffect } from 'react';

import AudienceImage from '../assets/images/bg/audience.jpg';
import TeamAos from './team-aos';
import Sign from '../assets/images/sign.png';
import { Link } from 'react-router-dom';
import Aos from 'aos';
import { Link as ScrollLink } from 'react-scroll';

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
            <div className='lg:col-span-5 h-full'>
              <div className='relative overflow-hidden rounded-lg h-full md:rounded-s-md md:rounded-e-4xl'>
                <img
                  src={AudienceImage}
                  className='object-cover object-right w-full h-full'
                  alt=''
                />
              </div>
            </div>
            {/* end col */}

            <div className='lg:col-span-7'>
              <div className='lg:ms-7'>
                <h6 className='text-primary text-base font-medium uppercase mb-2'>
                  Teaching the Healing Brain: 4 Juli 2026
                </h6>
                <h3 className='mb-4 md:text-2xl text-xl font-medium dark:text-white'>
                  Siapa yang Harus Hadir?
                </h3>

                <p className='text-dark dark:text-slate-300 max-w-2xl mx-auto md:text-lg'>
                  <span className='font-bold'>Pendidik</span> yang ingin melihat
                  siswanya kembali bersemangat.
                  <br />
                  <span className='font-bold'>Orang tua</span> yang ingin
                  memahami anaknya lebih dalam.
                  <br />
                  <span className='font-bold'>Pembuat kebijakan</span> yang
                  ingin membangun masa depan pendidikan lebih manusiawi.
                  <br />
                  <span className='font-bold'>Mahasiswa</span> dan{' '}
                  <span className='font-bold'> profesional</span> yang ingin
                  ikut menciptakan perubahan nyata. <br />
                  <br />
                  Acara ini untuk kita yang tidak sekedar menunggu perubahan…{' '}
                  <br />{' '}
                  <span className='font-bold'>
                    tetapi memilih menjadi bagian dari perubahan itu.
                  </span>
                </p>
                <ScrollLink
                  to='register'
                  smooth={true}
                  spy={true}
                  duration={500}
                  className='mt-8 p-3 w-fit inline-block font-normal tracking-wide border align-middle duration-500 text-base text-center bg-primary hover:bg-primary-dark border-primary hover:border-primary-dark text-white rounded-md'
                >
                  Daftar Sekarang
                </ScrollLink>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- End --> */}
    </>
  );
}
