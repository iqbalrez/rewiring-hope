import React, { useEffect } from 'react';

import BawEventImage from '../assets/images/client/baw-event.webp';
import TeamAos from './team-aos';
import Sign from '../assets/images/sign.png';
import { Link } from 'react-router-dom';
import Aos from 'aos';
import { Link as ScrollLink } from 'react-scroll';

import IBROImage from '../assets/images/client/IBROImage.jpg';
import DanaFoundationImage from '../assets/images/client/DanaFoundationImageColor.png';
import BAWColorImage from '../assets/images/client/bawcolor.svg';

export default function BawWhy() {
  useEffect(() => {
    Aos.init();
  }, []);

  const benefits = [
    'Buku saku Brain Awareness Week (untuk dibaca dan dibawa pulang)',
    'Tote bag Brain Awareness Week (untuk membawa buku dan cerita)',
    'Sertifikat mengikuti Brain Awareness Week (sebagai tanda kamu sudah belajar tentang otak)',
    'Pengalaman belajar yang seru dan menyenangkan',
    'Buku bacaan',
  ];

  return (
    <>
      <section
        className='relative py-16 md:py-24 bg-blue-dark'
        id='about'
      >
        <div
          className='max-w-3xl px-6 md:px-0 mx-auto'
          data-aos='fade-up'
          data-aos-delay='200'
        >
          <h3 className='md:text-2xl text-xl text-center font-bold text-amber-600 dark:text-white'>
            Kisah Otak yang Tangguh
          </h3>
          <p className='text-white text-center md:text-xl text-lg  mb-8'>
            3 Juli 2026
          </p>
          <div className='grid grid-cols-1 lg:grid-cols-12 md:grid-cols-2 gap-10 items-center justify-center'>
            <div className='lg:col-span-4 h-full bg-white rounded-md p-4 space-y-4'>
              <div className='relative overflow-hidden rounded-lg w-full p-2 border border-gray-100'>
                              <div className='flex items-center justify-center gap-6 w-full h-full'>
                                <img
                                  src={IBROImage}
                                  className='flex-1 w-0 h-auto max-h-16 object-contain'
                                  alt='IBRO Logo'
                                />
                                <img
                                  src={DanaFoundationImage}
                                  className='flex-1 w-0 scale-120 h-auto max-h-16 object-contain'
                                />
                              </div>
                            </div>
                            <div className='relative overflow-hidden rounded-lg w-full p-4 border border-gray-100'>
                              <div className='flex items-center justify-center gap-6 w-full h-full'>
                                <img
                                  src={BAWColorImage}
                                  className='flex-1 w-0 h-auto object-contain'
                                  alt='BAW Logo'
                                />
                              </div>
                            </div>
              <p className='text-blue-dark max-w-2xl mx-auto md:text-md text-center'>
               Untuk anak usia 10-18 tahun di Yogyakarta dan sekitarnya
              </p>
              <div className='flex justify-center'>
                <a
                  href='#register'
                  className='hover:scale-105 text-center bg-amber-600 text-white py-3 px-6 rounded-full shadow-lg hover:bg-amber-700 transition-all duration-300 w-fit'
                >
                  Daftar Sekarang <br/> Tempat Terbatas
                </a>
              </div>
            </div>
            {/* end col */}

            <div className='lg:col-span-8'>
              <div className=''>
                <p className='text-white font-bold mb-3'>
                  Yang akan kamu dapatkan hari itu:
                </p>
                <ul className='space-y-3 text-slate-100'>
                  {benefits.map((benefit, i) => (
                    <li key={i} className='flex items-start text-white'>
                      <i className='mdi mdi-star-four-points text-amber-600 mr-2'></i>{' '}
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- End --> */}
    </>
  );
}
