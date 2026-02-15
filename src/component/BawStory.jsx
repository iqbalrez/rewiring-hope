import React, { useEffect } from 'react';

import BawStoryImage from '../assets/images/client/baw-story.png';

import TeamAos from './team-aos';
import Sign from '../assets/images/sign.png';
import { Link } from 'react-router-dom';
import Aos from 'aos';
import { Link as ScrollLink } from 'react-scroll';

export default function BawStory() {
  useEffect(() => {
    Aos.init();
  }, []);

  const highlight = 'font-semibold bg-dark px-1 ronded-md';

  return (
    <>
      <section className='relative py-16 md:py-24 bg-amber-700' id='about'>
        <div
          className='max-w-4xl px-6 md:px-0 mx-auto'
          data-aos='fade-up'
          data-aos-delay='200'
        >
          <div className='grid grid-cols-1 lg:grid-cols-12 md:grid-cols-2 gap-10 items-start justify-center'>
            <div className='lg:col-span-7'>
              <div className='space-y-4'>
                <h3 className='md:text-2xl text-xl text-start font-bold text-white'>
                  Kisah Otak, Kisah Kita Semua
                </h3>
                <p className='text-white text-start'>
                  Akhir-akhir ini, rasanya otak kita cepat sekali penuh dari
                  berita yang bikin cemas, komentar yang saling menjatuhkan,
                  sampai obrolan yang menguras energi. Lebih mudah terkena vibes
                  negatif daripada menemukan sesuatu yang benar-benar
                  menyehatkan pikiran.
                </p>
                <p className='text-white text-start'>
                  Karena itu,{' '}
                  <span className={highlight}>Kisah Otak yang Tangguh</span>{' '}
                  hadir sebagai undangan untuk{' '}
                  <span className={highlight}>berhenti sebentar</span>,{' '}
                  <span className={highlight}>tarik napas</span>,{' '}
                  <span className={highlight}>
                    dan kembali ke hal-hal yang menguatkan kita
                  </span>
                  . Lewat warna, cerita, video, dan desain, anak-anak dan remaja
                  mengingatkan kita bahwa otak manusia selalu punya cara untuk
                  belajar, bertahan, dan tumbuh.
                </p>
                <p className='text-white text-start'>
                  Ayo hadir, ambil bagian, dan jadi bagian dari perubahan yang
                  dimulai dari sesuatu yang paling dekat:{' '}
                  <span className={highlight}>otak kita.</span>
                </p>
                <p className='text-white text-start'>
                  Karena pada akhirnya, ini bukan hanya kisah mereka.{' '}
                  <span className={highlight}>
                    Ini kisah otak. Kisah kita semua.
                  </span>
                </p>
              </div>
            </div>

            <div className='lg:col-span-5 h-full bg-slate-200 rounded-md'>
              <div className='relative overflow-hidden  w-full h-auto mx-auto'>
                <img
                  src={BawStoryImage}
                  className='object-cover object-center w-full'
                  alt=''
                />
              </div>
            </div>
            {/* end col */}
          </div>
        </div>
      </section>
      {/* <!-- End --> */}
    </>
  );
}
