import React, { useState, useEffect } from 'react';

import AboutImage from '../assets/images/logo-dark.png';
import TeamAos from './team-aos';
import Sign from '../assets/images/sign.png';
import { Link } from 'react-router-dom';
import Aos from 'aos';

export default function EventAbout() {
  const [isOpen, setOpen] = useState(false);
  useEffect(() => {
    Aos.init();
  }, []);
  // function toggleAccordion(index) {
  //   const content = document.getElementById(`content-${index}`);
  //   const icon = document.getElementById(`icon-${index}`);

  //   // SVG for Minus icon
  //   const minusSVG = `
  //       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4">
  //         <path d="M3.75 7.25a.75.75 0 0 0 0 1.5h8.5a.75.75 0 0 0 0-1.5h-8.5Z" />
  //       </svg>
  //     `;

  //   // SVG for Plus icon
  //   const plusSVG = `
  //       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4">
  //         <path d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z" />
  //       </svg>
  //     `;

  //   // Toggle the content's max-height for smooth opening and closing
  //   if (content.style.maxHeight && content.style.maxHeight !== '0px') {
  //     content.style.maxHeight = '0';
  //     icon.innerHTML = plusSVG;
  //   } else {
  //     content.style.maxHeight = content.scrollHeight + 'px';
  //     icon.innerHTML = minusSVG;
  //   }
  // }
  return (
    <>
      <section
        className='relative py-24 bg-slate-100 dark:bg-slate-800'
        id='about'
        data-aos='fade-up'
        data-aos-delay='200'
      >
        <div className='container mx-auto'>
          <div className='grid grid-cols-1 lg:grid-cols-12 md:grid-cols-2 gap-10 items-start'>
            <div className='lg:col-span-7'>
              <div className='lg:ms-7'>
                <h6 className='text-primary text-base font-medium uppercase mb-2'>
                  Teaching the Healing Brain
                </h6>
                <h3 className='mb-4 md:text-2xl text-xl font-medium dark:text-white'>
                  Rewiring Hope and Relationship through Neuroscience
                </h3>

                <p className='text-slate-500 dark:text-slate-300 max-w-2xl mx-auto md:text-lg'>
                  “Bayangkan seorang anak di Indonesia. Dia duduk di kelas,
                  tetapi pikirannya jauh melayang. Bukan karena dia malas,
                  tetapi karena dia kehilangan harapan. Dia pernah gagal, dia
                  pernah diremehkan, dan sekarang dia percaya bahwa belajar
                  bukan untuknya. Ada ribuan anak seperti dia. Mereka datang ke
                  sekolah setiap hari, tetapi hati mereka patah dan otak mereka
                  lelah. Mereka tidak butuh lebih banyak ujian. Mereka butuh
                  harapan.
                </p>

                <div className='relative mt-8'>
                  <p className='text-dark dark:text-slate-300 max-w-2xl mx-auto md:text-lg'>
                    Satu Hari Forum Publik 27 Juni 2026
                    <br></br>Militaire Societeit, Taman Budaya Yogyakarta
                  </p>
                </div>
              </div>
            </div>

            <div className='lg:col-span-5'>
              <div className='relative'>
                <img src={AboutImage} className='relative' alt='' />
                {/* <div className='absolute bottom-2/4 translate-y-2/4 start-0 end-0 text-center'>
                  <Link
                    to='#'
                    onClick={() => setOpen(true)}
                    className='lightbox h-20 w-20 rounded-full shadow-lg shadow-slate-100 dark:shadow-slate-800 inline-flex items-center justify-center bg-white dark:bg-slate-900 text-primary'
                  >
                    <i className='mdi mdi-play inline-flex items-center justify-center text-2xl'></i>
                  </Link>
                </div> */}
              </div>
            </div>
            {/* end col */}
          </div>
        </div>
      </section>
      {/* <!-- End --> */}
      {isOpen && (
        <div className='flex bg-[#00000099] overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full'>
          <div className='relative p-1 w-full max-w-2xl max-h-full'>
            <div className='relative bg-white rounded-lg shadow-xs dark:bg-gray-700'>
              <div className='flex items-center justify-between p-1 border-b rounded-t dark:border-gray-600 border-gray-200'>
                <button
                  type='button'
                  onClick={() => setOpen(!isOpen)}
                  className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white'
                  data-modal-hide='default-modal'
                >
                  <svg
                    className='w-3 h-3'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 14 14'
                  >
                    <path
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
                    />
                  </svg>
                  <span className='sr-only'>Close modal</span>
                </button>
              </div>
              <div className='p-1 md:p-1 space-y-4'>
                <iframe
                  width='100%'
                  height='400'
                  src='https://www.youtube.com/embed/yba7hPeTSjk?playlist=yba7hPeTSjk&loop=1'
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
