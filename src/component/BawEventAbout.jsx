import React, { useState, useEffect } from 'react';

import BawEventImage from '../assets/images/client/baw-event.webp';

import TeamAos from './team-aos';
import Sign from '../assets/images/sign.png';
import { Link } from 'react-router-dom';
import Aos from 'aos';

export default function BawEventAbout() {
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
      <section className='relative py-24 bg-blue-dark' id='about'>
        <div
          className='container mx-auto'
          data-aos='fade-up'
          data-aos-delay='200'
        >
          <div className='grid grid-cols-1 lg:grid-cols-12 md:grid-cols-2 gap-10 items-start'>
            <div className='lg:col-span-7'>
              <div className='lg:ms-7'>
                <h6 className='text-amber-500 text-base font-medium uppercase mb-2'>
                  Brain Awareness Week 2026
                </h6>
                <h3 className='mb-4 md:text-2xl text-xl font-medium text-white'>
                  Apa itu Kisah Otak yang Tangguh?
                </h3>

                <p className='text-slate-300 max-w-2xl mx-auto md:text-lg'>
                  Perayaan kreativitas dan sains untuk{' '}
                  <span className='font-bold'>pelajar se-Indonesia</span> yang
                  mengajak pelajar TK–SMA mengekspresikan{' '}
                  <span className='font-bold'>
                    refleksi, imajinasi, dan harapan{' '}
                  </span>{' '}
                  tentang otaknya: bagaimana ia belajar, bertahan, dan pulih.
                  <br />
                  <br />
                  Finalis akan tampil pada FAIR + GRAND FINAL sebagai bagian
                  dari{' '}
                  <span className='font-bold'>Brain Awareness Week 2026</span>
                  <br />
                  <br /> <span className='font-bold'>Penyelenggara:</span>
                  <br />
                  Rewiring Hope by The Excellent Study
                  <br />
                  <br /> <span className='font-bold'>Didukung oleh</span>
                  <br />
                  IBRO (International Brain Research Organization) <br />
                  Dana Foundation
                </p>
              </div>
            </div>

            <div className='lg:col-span-5'>
              <div className=' flex flex-col items-center text-center rounded-lg justify-center pb-8 relative overflow-hidden'>
                <img src={BawEventImage} className='relative w-full' alt='' />

                <div className=' mt-4 text-lg md:text-xl leading-tight text-amber-500 font-semibold'>
                  📍 Grhatama Pustaka DIY
                  <br />2 Juli 2026
                </div>
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

        <div
          data-aos='fade-up'
          data-aos-duration='1000'
          class='bg-blue-dark flex flex-col items-center pt-12 px-4 sm:px-6 lg:px-8 text-white'
        >
          <div class='text-center mb-16 max-w-3xl'>
            <h6 className='text-amber-500 text-base font-medium uppercase mb-2'>
              Brain Awareness Week 2026
            </h6>
            <h3 className='mb-4 md:text-2xl text-xl font-medium text-white'>
              Kisah Otak yang Tangguh: Refleksi, Imajinasi, dan Harapan
            </h3>
            <p class='text-4xl font-bold'>Timeline</p>
          </div>

          <div class='relative w-full max-w-5xl mx-auto'>
            <div class='absolute left-1/2 top-6 bottom-36 border-l-4 border-dashed border-blue-800 -translate-x-1/2 md:hidden z-0'></div>

            <div class='hidden md:block absolute top-6 left-[16%] right-[16%] border-t-4 border-dashed border-blue-800 z-0'></div>

            <div class='relative z-10 flex flex-col md:flex-row justify-between items-start gap-16 md:gap-0'>
              <div class='flex flex-col items-center text-center w-full md:w-1/3'>
                <div class='w-12 h-12 bg-amber-500 rounded-full border-4 border-blue-800 mb-4 shadow-md z-10'></div>
                <div class='px-4 bg-blue-dark'>
                  <p class='leading-tight mb-1'>1 Maret – 31 Mei 2026</p>
                  <p class='font-bold text-lg'>Pengumpulan karya</p>
                </div>
              </div>

              <div class='flex flex-col items-center text-center w-full md:w-1/3'>
                <div class='w-12 h-12 bg-amber-500 rounded-full border-4 border-blue-800 mb-4 shadow-md z-10'></div>
                <div class='px-4 bg-blue-dark'>
                  <p class='leading-tight mb-1'>13 Juni 2026</p>
                  <p class='font-bold text-lg'>Pengumuman finalis</p>
                </div>
              </div>

              <div class='flex flex-col items-center text-center w-full md:w-1/3'>
                <div class='w-12 h-12 bg-amber-500 rounded-full border-4 border-blue-800 mb-4 shadow-md z-10'></div>
                <div class='px-4 bg-blue-dark'>
                  <p class='leading-tight mb-1'>2 Juli 2026</p>
                  <p class='font-bold text-lg'>FAIR + GRAND FINAL</p>
                  <p class='text-gray-200 text-sm uppercase tracking-wider'>
                    di Grhatama Pustaka DIY
                  </p>
                </div>
              </div>
            </div>
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
