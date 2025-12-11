import React from 'react';

import { Link } from 'react-router-dom';
import CountUp from 'react-countup';

import avatarStella from '../assets/images/client/stella.jpg';
import avatarFely from '../assets/images/client/fely.jpg';
import avatarChristine from '../assets/images/client/christine.jpg';
import { ScrollLink } from 'react-scroll';

export default function Speaker() {
  const speaker = [
    {
      name: 'Prof. Stella Christie',
      profile: avatarStella,
      designation: 'CEO & Founder',
    },
    {
      name: ' Prof. Felycia Soetardjo',
      profile: avatarFely,
      designation: 'Role',
    },
    {
      name: 'Prof. Christin Wibhowo',
      profile: avatarChristine,
      designation: 'Role',
    },
  ];

  return (
    <>
      <section
        className='relative md:py-24 py-16 bg-gray-50 dark:bg-slate-800'
        id='speaker'
      >
        <div className='grid grid-cols-1 lg:grid-cols-5 gap-6 container'>
          <div className='col-span-2 flex flex-col gap-2 text-start'>
            <h6 className='text-primary text-base font-medium uppercase'>
              Keynote
            </h6>
            <h3 className='md:text-2xl text-xl font-medium dark:text-white'>
              Speakers
            </h3>

            <p className='text-md lg:text-lg text-slate-500 dark:text-slate-300 w-full mx-auto'>
              Ini bukan seminar neurosains biasa. Ini adalah ruang bertemu
              antara ilmu mendalam dan realitas sehari-hari. Setiap sesi
              dirancang untuk meninggalkan "jejak emosional" dan "jejak
              kognitif" yang bertahan lama.
            </p>

            <ScrollLink
              to='footer'
              smooth={true}
              spy={true}
              duration={500}
              className='mt-4 py-2 px-5 inline-block font-normal tracking-wide border align-middle duration-500 text-base text-center bg-primary hover:bg-primary-dark border-primary hover:border-primary-dark text-white rounded-full'
            >
              Daftar Sekarang
            </ScrollLink>
          </div>

          <div className='col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6'>
            {speaker.map((member, index) => (
              <div
                key={index}
                className='relative rounded-md overflow-hidden group'
              >
                <img
                  src={member.profile}
                  className='group-hover:origin-center group-hover:scale-105 object-cover w-full aspect-square md:aspect-[3/4] object-top transition duration-500'
                  alt=''
                />
                <div className='absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/30 z-0 transition duration-500'></div>

                <div className='content absolute start-0 end-0 -bottom-0 bg-white dark:bg-dark p-3 rounded-md text-center transition-all duration-500'>
                  <Link
                    to='#'
                    className='h5 text-md text-dark dark:text-white hover:text-primary dark:hover:text-primary font-medium'
                  >
                    {member.name}
                  </Link>
                  {/* <h6 className='text-slate-400 dark:text-slate-300 mb-0 font-light'>
                    {member.designation}
                  </h6> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
