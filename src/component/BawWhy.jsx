import React, { useEffect } from 'react';

import BawEventImage from '../assets/images/client/baw-event.webp';
import TeamAos from './team-aos';
import Sign from '../assets/images/sign.png';
import { Link } from 'react-router-dom';
import Aos from 'aos';
import { Link as ScrollLink } from 'react-scroll';

export default function BawWhy() {
  useEffect(() => {
    Aos.init();
  }, []);

  const benefits = [
    'Sertifikat resmi dari IBRO (International Brain Research Organization) & Dana Foundation',
    'Karya akan ditampilkan di FAIR + GRAND FINAL Brain Awareness Week 2026',
    'Hadiah menarik: uang tunai & piala untuk setiap kategori',
    'Umpan balik edukatif dari tim kuratorial',
    'Pengalaman belajar neuroscience melalui seni, cerita, video, atau desain visual',
    'Menjadi bagian dari gerakan pendidikan publik tentang otak, ketangguhan, dan kesehatan mental',
  ];

  return (
    <>
      <section
        className='relative py-16 md:py-24 bg-slate-100 dark:bg-slate-800'
        id='about'
      >
        <div
          className='max-w-3xl px-6 md:px-0 mx-auto'
          data-aos='fade-up'
          data-aos-delay='200'
        >
          <h3 className='md:text-2xl text-xl text-center font-bold text-amber-600 dark:text-white'>
            Kisah Otak yang Tangguh: Refleksi, Imajinasi, dan Harapan
          </h3>
          <p className='text-dark text-center md:text-xl text-lg  mb-8'>
            2 Juli 2026
          </p>
          <div className='grid grid-cols-1 lg:grid-cols-12 md:grid-cols-2 gap-10 items-center justify-center'>
            <div className='lg:col-span-4 h-full bg-slate-200 p-4 space-y-4'>
              <div className='relative overflow-hidden rounded-lg w-full aspect-square mx-auto'>
                <img
                  src={BawEventImage}
                  className='object-cover object-center w-full'
                  alt=''
                />
              </div>
              <p className='text-dark max-w-2xl mx-auto mt-4 md:text-lg text-center'>
                Siswa TK - SMA
                <br />
                <span className='font-bold'>Rp 50.000</span>
              </p>
              <div className='flex justify-center'>
                <a
                  href='#register'
                  className='hover:scale-105 bg-amber-600 text-white py-3 px-6 rounded-full shadow-lg hover:bg-amber-700 transition-all duration-300 w-fit'
                >
                  Daftar Kompetisi
                </a>
              </div>
            </div>
            {/* end col */}

            <div className='lg:col-span-8'>
              <div className=''>
                <p className='text-dark font-bold mb-3'>
                  Keuntungan bagi peserta:
                </p>
                <ul className='space-y-3 text-slate-100'>
                  {benefits.map((benefit, i) => (
                    <li key={i} className='flex items-start text-dark'>
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
