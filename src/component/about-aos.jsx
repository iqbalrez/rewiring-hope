import React, { useEffect } from 'react';

import AboutImage from '../assets/images/about4.jpg';
import Sign from '../assets/images/sign.png';
import { Link } from 'react-router-dom';
import Aos from 'aos';

export default function AboutAos() {
  // const [isOpen, setOpen] = useState(false)
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

  useEffect(() => {
    Aos.init();
  }, []);

  return (
    <>
      <section
        className='relative py-24 bg-slate-100 dark:bg-slate-800'
        id='about'
      >
        <div className='w-full max-w-4xl px-4 lg:px-0 mx-auto'>
          <h3
            className='mb-8 md:text-2xl text-xl font-bold text-dark text-center'
            data-aos='fade-up'
            data-aos-delay='200'
          >
            When Hope Leaves. Learning Stops
          </h3>
          <div
            className='grid grid-cols-1 lg:grid-cols-12 md:grid-cols-2 md:gap-10 items-start'
            data-aos='fade-up'
            data-aos-delay='300'
          >
            <div className='lg:col-span-5 h-full order-last md:order-first'>
              <div className='border-b-1 border-dark relative h-full '>
                <div className='absolute -z-10 rounded-full w-84 h-84 bottom-0 left-1/2 -translate-x-1/2 bg-dark/5'></div>
                <img
                  src={AboutImage}
                  className='h-full relative object-cover object-bottom  saturate-80 rounded-xl'
                  alt=''
                />
              </div>
            </div>

            <div className='lg:col-span-7'>
              <div className=''>
                <p className='text-dark dark:text-slate-300 max-w-2xl mx-auto text-base text-center md:text-end'>
                  Di balik angka dan ujian, ada anak yang diam. <br /> Mereka
                  bukan malas; mereka kehilangan harapan. <br /> Dan ketika
                  harapan hilang, belajar berhenti. <br /> Pendidikan tidak
                  boleh hanya mengukur pengetahuan, <br /> tetapi harus
                  memulihkan hati. <br /> Kami percaya harapan adalah bahan
                  bakar belajar, <br />
                  tanpanya ilmu tidak tinggal di hati. <br /> Rewiring Hope
                  hadir untuk menyalakan kembali harapan agar setiap anak
                  percaya: masa depan adalah miliknya.
                </p>

                <div className='mt-8 flex flex-col w-full text-center md:text-end mb-8'>
                  <div className='w-full flex justify-center md:justify-end'>
                    <img src={Sign} className='w-36 p-2' />
                  </div>
                  <p className='text-dark font-bold '>Anastasia Tantri</p>
                  <p className='text-slate-500'>CEO & Founder</p>
                </div>
                {/* <div
                  className='relative mt-8'
                  data-aos='fade-up'
                  data-aos-delay='600'
                >
                  <a
                    href=''
                    className='py-2 px-5 inline-block text-md lg:text-lg font-normal tracking-wide border align-middle duration-500 text-base text-center bg-primary hover:bg-primary-dark border-primary hover:border-primary-dark text-white rounded-md'
                  >
                    Mulai Perubahan Bersama Kami
                  </a>
                </div> */}

                {/* Accordion
                <div className='border-b border-slate-200 mt-10'>
                  <button
                    onClick={() => toggleAccordion(1)}
                    class='w-full flex justify-between items-center py-5 text-md md:text-lg text-slate-700'
                    data-aos='fade-up'
                    data-aos-delay='700'
                  >
                    <span>Mengapa Kami Ada</span>
                    <span
                      id='icon-1'
                      class='text-md md:text-lg text-slate-700 transition-transform duration-300'
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 16 16'
                        fill='currentColor'
                        class='w-4 h-4'
                      >
                        <path d='M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z' />
                      </svg>
                    </span>
                  </button>
                  <div
                    id='content-1'
                    class='max-h-0 overflow-hidden transition-all duration-300 ease-in-out'
                  >
                    <div class='text-md lg:text-lg leading-relaxed text-slate-500 bg-white rounded-md p-5'>
                      Kami percaya otak manusia bisa berubah. Kami percaya
                      harapan bisa dipulihkan. Rewiring Hope lahir untuk
                      menjembatani kembali hati dan otak melalui pengalaman
                      belajar yang memulihkan agar setiap anak mampu bertumbuh,
                      berdaya, dan menulis ulang masa depannya dengan tinta
                      harapan.
                    </div>
                  </div>
                </div>

                Accordion 2
                <div className='border-b border-slate-200 mt-2'>
                  <button
                    onClick={() => toggleAccordion(2)}
                    class='w-full flex justify-between items-center py-5 text-md md:text-lg text-slate-700'
                    data-aos='fade-up'
                    data-aos-delay='800'
                  >
                    <span>Bergabung dengan Gerakan</span>
                    <span
                      id='icon-2'
                      class='text-md md:text-lg text-slate-700 transition-transform duration-300'
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 16 16'
                        fill='currentColor'
                        class='w-4 h-4'
                      >
                        <path d='M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z' />
                      </svg>
                    </span>
                  </button>

                  <div
                    id='content-2'
                    class='max-h-0 overflow-hidden transition-all duration-300 ease-in-out'
                  >
                    <div class='text-md lg:text-lg leading-relaxed text-slate-500 bg-white rounded-md p-5'>
                      Harapan bukan hanya kata-kata. Harapan adalah tindakan.
                      Kami mengundang sekolah, guru, orang tua, komunitas, dan
                      mitra pendanaan untuk membangun budaya belajar yang
                      menyembuhkan di Indonesia.
                      <div className='relative mt-4 flex flex-col md:flex-row gap-2'>
                        <a
                          href='#portfolio'
                          className='py-2 px-5 inline-block text-xs lg:text-lg font-normal tracking-wide border align-middle duration-500 text-center bg-primary hover:bg-primary-dark border-primary hover:border-primary-dark text-white rounded-md'
                        >
                          Hubungi Kami
                        </a>

                        <a
                          href='#portfolio'
                          className='py-2 px-5 inline-block text-xs lg:text-lg font-normal tracking-wide border align-middle duration-500 text-center bg-primary hover:bg-primary-dark border-primary hover:border-primary-dark text-white rounded-md'
                        >
                          Jadi Mitra Sekolah Percontohan
                        </a>
                      </div>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>

            {/* end col */}
          </div>
          <h3
            className='mt-8 text-xl text-dark text-center'
            data-aos='fade-up'
            data-aos-delay='200'
            data-aos-duration='500'
          >
            Mengapa harapan lebih penting daripada sekedar nilai?
          </h3>
        </div>
      </section>
      {/* <!-- End --> */}
      {/* {isOpen && (
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
        )} */}
    </>
  );
}
