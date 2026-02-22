import React, { useState, useEffect } from 'react';
import MWImage from '../assets/images/baw/MW.png';
import STImage from '../assets/images/baw/ST.png';
import RVImage from '../assets/images/baw/RV.png';
import DIImage from '../assets/images/baw/DI.png';
import { useSearchParams } from 'react-router-dom';

import SubmitKaryaModal from './Modal/SubmitWorkModal';

export default function Pricing({ setType, setPrice }) {
  const [searchParams] = useSearchParams();
  const [isSubmitWorkModalOpen, setIsSubmitWorkModalOpen] = useState(false);

  useEffect(() => {
    if (searchParams.get('openModal') === 'submit') {
      setIsSubmitWorkModalOpen(true);
    }
  }, [searchParams]);

  const pricing = [
    {
      id: 1,
      key: 'MW',
      title: 'Mewarnai - TK',
      theme: 'Otak yang Berani Bermimpi',
      image: MWImage,
    },
    {
      id: 2,
      key: 'ST',
      title: 'Storytelling - SD',
      theme: 'Kalau Otakku Bisa Bicara...',
      image: STImage,
    },
    {
      id: 3,
      key: 'RV',
      title: 'Reels Video - SMP/SMA',
      theme: 'Brain, Resillience, and Me',
      image: RVImage,
    },
    {
      id: 4,
      key: 'DI',
      title: 'Desain Infografis - SMP/SMA',
      theme: 'Bagaimana Otakku Belajar dan Menyembuh',
      image: DIImage,
    },
  ];

  return (
    <>
      {/* Start */}

      <section
        className='relative md:py-24 py-16 space-y-4 bg-blue-dark'
        id='pricing'
      >
        <div className='container space-y-4'>
          <div className='grid grid-cols-1 pb-4 text-center'>
            <h6 className='text-amber-500 text-base font-medium uppercase mb-2'>
              Kisah Otak yang Tangguh: Refleksi, Imajinasi, dan Harapan
            </h6>
            <h3 className='mb-4 md:text-2xl text-xl font-medium   text-white'>
              Kategori Lomba
            </h3>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 h-full'>
            {pricing.map((item, key) => (
              <div
                className='p-8 h-full flex flex-col justify-between bg-zinc-50 hover:bg-white dark:bg-gray-800 dark:hover:bg-slate-900 rounded-md shadow-sm shadow-slate-200 dark:shadow-slate-700 transition duration-500'
                key={key}
              >
                <div className='h-full flex flex-col text-center'>
                  <img
                    className='mx-auto mb-3'
                    src={item.image}
                    alt={item.title}
                  ></img>
                  <h3 className='text-lg md:text-xl font-bold text-blue-dark dark:text-white '>
                    {item.title}
                  </h3>
                  <p className='mb-3 text-md text-slate-430 dark:text-slate-300'>
                    Tema: <br /> {item.theme}
                  </p>
                </div>
                <a
                  href='#register'
                  onClick={() => {
                    setType && setType(item.key);
                    setPrice && setPrice(item.price);
                  }}
                  className='items-center py-2 px-5 inline-block font-normal tracking-wide border align-middle duration-500 text-base text-center bg-blue-dark hover:bg-amber-700 border-blue-dark hover:border-amber-700 text-white rounded-md w-full'
                >
                  <i className='mdi mdi-download mr-2'></i>Panduan Lomba
                </a>
              </div>
            ))}
          </div>
          <div className='flex flex-col md:flex-row gap-4 mt-8 items-center justify-center'>
            <a
              href='#register'
              className='hover:scale-105 bg-amber-600 text-white rounded-md py-3 px-6 shadow-lg hover:bg-amber-700 transition-all duration-300 w-fit'
            >
              Daftar Kompetisi
            </a>
            <a
              href=''
              onClick={(e) => {
                e.preventDefault();
                setIsSubmitWorkModalOpen(true);
              }}
              className='hover:scale-105 bg-amber-600 text-white rounded-md py-3 px-6 shadow-lg hover:bg-amber-700 transition-all duration-300 w-fit'
            >
              Submit Karya
            </a>
          </div>
        </div>
      </section>
      <SubmitKaryaModal
        isOpen={isSubmitWorkModalOpen}
        onClose={() => setIsSubmitWorkModalOpen(false)}
      />
    </>
  );
}
