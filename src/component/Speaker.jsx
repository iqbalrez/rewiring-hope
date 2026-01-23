import React, { useEffect } from 'react';

import { Link } from 'react-router-dom';
import CountUp from 'react-countup';

import avatarStella from '../assets/images/client/stella.jpg';
import avatarFely from '../assets/images/client/fely.jpg';
import avatarChristine from '../assets/images/client/christine.jpg';
import { Link as ScrollLink } from 'react-scroll';
import Aos from 'aos';

export default function Speaker() {
  const speaker = [
    {
      name: 'Prof. Stella Christie',
      profile: avatarStella,
      designation: `Wakil Menteri Pendidikan Tinggi, Sains, dan Teknologi Republik Indonesia`,
      expertise: `Cognitive Scientist`,
    },
    {
      name: ' Prof. Felycia Edy Soetardjo',
      profile: avatarFely,
      designation: `Dekan Fakultas Teknik Universitas Katolik Widya Mandala Surabaya`,
      expertise: `STEM Expert`,
    },
    {
      name: 'Prof. Christin Wibhowo',
      profile: avatarChristine,
      designation: `Dosen Psikologi Universitas Katolik Soegijapranata`,
      expertise: `Clinical Psychologist`,
    },
  ];

  useEffect(() => {
    Aos.init();
  }, []);

  return (
    <>
      <section
        className='relative md:py-24 py-16 bg-gray-50 dark:bg-slate-800'
        id='speaker'
      >
        <div
          className='grid grid-cols-1 lg:grid-cols-5 gap-6 container'
          data-aos='fade-up'
          data-aos-delay='200'
        >
          <div className='col-span-2 flex flex-col gap-2 text-start'>
            <h6 className='text-primary text-base font-medium uppercase'>
              Teaching the Healing Brain: 4 Juli 2026
            </h6>
            <h3 className='md:text-2xl text-xl font-medium dark:text-white'>
              Keynote Speakers
            </h3>

            <p className='text-md lg:text-lg text-slate-500 dark:text-slate-300 w-full mx-auto'>
              <span className='font-bold'>
                Ketika ilmu bertemu keberanian, kami percaya hal besar akan
                terjadi.
                <br />
                <br />
              </span>{' '}
              Energi yang dihadirkan oleh para pembicara ini akan membuat kita
              melihat pendidikan sebagai peluang perubahan.
              <br />
              <br />
              <span className='font-bold'>
                Mereka datang untuk membuka jalan,
              </span>{' '}
              memberi inspirasi dan perspektif baru, serta mengingatkan kita
              bahwa harapan bisa dibangun dengan pengetahuan yang akurat,
              langkah yang tepat, dan hubungan yang kuat.
              <br />
              <br />
              Ini bukan tentang sesuatu yang rumit, namun bagaimana kita bisa
              menciptakan pendidikan sebagai peluang perubahan.
            </p>
          </div>

          <div className='col-span-3'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              {speaker.map((member, index) => (
                <div
                  key={index}
                  className='relative hover:scale-105 transition rounded-md overflow-hidden group flex flex-col h-full' // Flex dengan h-full untuk memastikan tinggi 100%
                >
                  <img
                    src={member.profile}
                    className='object-cover w-full aspect-square object-top'
                    alt=''
                  />
                  {/* <div className='absolute inset-0 bg-slate-900/0 group-hover:bg-primary/30 z-0 transition duration-500'></div> */}

                  <div className='content bg-white dark:bg-dark p-3 rounded-md text-start transition-all duration-500 flex flex-col h-full'>
                    <Link
                      to='#'
                      className='md:text-md font-bold text-dark dark:text-white leading-tight mb-1'
                    >
                      {member.name}
                    </Link>
                    <h6 className='text-dark text-md md:text-xs dark:text-slate-300 mb-0 font-light'>
                      {member.designation}
                    </h6>
                    <h6 className='text-primary text-md md:text-xs font-medium dark:text-slate-300 mt-2'>
                      {member.expertise}
                    </h6>
                  </div>
                </div>
              ))}
            </div>

            <ScrollLink
              to='register'
              smooth={true}
              spy={true}
              duration={500}
              className='mt-4 p-3 w-fit inline-block font-normal tracking-wide border align-middle duration-500 text-base text-center bg-primary hover:bg-primary-dark border-primary hover:border-primary-dark text-white rounded-md'
            >
              Daftar Sekarang
            </ScrollLink>
          </div>
        </div>
      </section>
    </>
  );
}
