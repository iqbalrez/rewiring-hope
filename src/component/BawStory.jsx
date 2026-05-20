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

  const highlight = 'font-semibold bg-blue-dark px-1 ronded-md';

  return (
    <>
      <section className='relative py-16 md:py-24 bg-blue-dark' id='about'>
        <div
          className='max-w-4xl px-6 md:px-0 mx-auto'
          data-aos='fade-up'
          data-aos-delay='200'
        >
          <div className='grid grid-cols-1 lg:grid-cols-12 md:grid-cols-2 gap-10 items-start justify-center'>
            <div className='lg:col-span-7'>
              <div className='space-y-4'>
                <h3 className='md:text-2xl text-xl text-start font-bold text-white'>
                  Ini Kisah Otak, Kisah Kita Semua
                </h3>
                <p className='text-white text-start'>
                  Ada seorang anak yang pernah berkata,
                </p>
                <p className='text-white text-start'>
                  “Aku sering merasa tidak bisa.<br/>
                    Kalau salah, aku langsung takut mencoba lagi.”
                </p>
                <p className='text-white text-start'>
                  Di kegiatan ini, ia mulai belajar sesuatu yang baru.
<br/>
Bahwa otaknya tidak berhenti ketika gagal.
<br/>
Bahwa ia bisa mencoba lagi.
<br/>
Pelan-pelan, ia mulai berkata pada dirinya sendiri,
                </p>
                <p className='text-white text-start'>
                 “Aku bisa belajar.”
<br/><br/>
Dan dari kalimat kecil itu, sesuatu berubah.
<br/><br/>

Mungkin, kisah itu juga adalah kisahmu yang akan dimulai.
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
