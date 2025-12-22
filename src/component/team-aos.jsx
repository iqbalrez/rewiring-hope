import React, { useEffect } from 'react';

import { Link } from 'react-router-dom';
import CountUp from 'react-countup';
import Aos from 'aos';

import avatarTantri from '../assets/images/client/tantri.jpg';
import avatarChristine from '../assets/images/client/christine.jpg';
import avatarLaura from '../assets/images/client/laura.jpg';
import avatarLinda from '../assets/images/client/linda.jpg';
import avatarHesti from '../assets/images/client/hesti.jpg';
import avatarFely from '../assets/images/client/fely.jpg';
import avatarChristiyanti from '../assets/images/client/christiyanti.jpg';
import avatarMaria from '../assets/images/client/maria.jpg';
import avatarVega from '../assets/images/client/vega.jpg';

import TELImage from '../assets/images/client/TELImage.jpg';
import IBROImage from '../assets/images/client/IBROImage.jpg';

export default function TeamAos() {
  const team = [
    {
      name: 'Anastasia Tantri',
      profile: avatarTantri,
      designation: 'CEO & Founder',
    },
    {
      name: 'Christine W.',
      profile: avatarChristine,
      designation: 'Role',
    },
    {
      name: 'Laura',
      profile: avatarLaura,
      designation: 'Role',
    },
    {
      name: 'Linda Devi',
      profile: avatarLinda,
      designation: 'Role',
    },
    {
      name: 'Hesti Miranda',
      profile: avatarHesti,
      designation: 'Role',
    },
    {
      name: 'Fely',
      profile: avatarFely,
      designation: 'Role',
    },
    {
      name: 'Christiyanti',
      profile: avatarChristiyanti,
      designation: 'Role',
    },
    {
      name: 'Maria',
      profile: avatarMaria,
      designation: 'Role',
    },
    {
      name: 'dr. Vega',
      profile: avatarVega,
      designation: 'Role',
    },
  ];

  useEffect(() => {
    Aos.init();
  }, []);

  return (
    <>
      <section
        className='relative md:py-24 py-16 bg-gray-50 dark:bg-slate-800'
        id='team'
        data-aos='fade-up'
      >
        <div className='container'>
          <div className='grid grid-cols-1 pb-8 text-center'>
            <h6 className='text-primary text-base font-medium uppercase mb-2' x>
              Tim Kami
            </h6>
            <h3 className='mb-4 md:text-2xl text-xl font-medium dark:text-white'>
              Bersama Menumbuhkan Harapan
            </h3>

            <p className='text-slate-400 dark:text-slate-300 max-w-xl mx-auto'>
              Kami percaya bahwa setiap individu memiliki kapasitas untuk
              belajar, bertumbuh, dan pulih. Kami bekerja secara kolaboratif
              untuk menghadirkan ruang yang aman, inklusif, dan membumi.
            </p>
          </div>

          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5  gap-6 mt-8'>
            {team.map((member, index) => (
              <div
                key={index}
                className='relative rounded-md shadow-lg overflow-hidden group'
              >
                <img
                  src={member.profile}
                  className='group-hover:origin-center group-hover:scale-105 object-cover aspect-[3/4] object-top transition duration-500'
                  alt=''
                />
                <div className='absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/30 z-0 transition duration-500'></div>
                {/* <ul className='list-none absolute z-10 opacity-0 group-hover:opacity-100 top-4 end-4 mb-0 transition-all duration-500'>
                         <li className='mb-1'>
                           <Link
                             to='#'
                             className='size-8 inline-flex items-center text-center justify-center tracking-wide border align-middle duration-500 bg-primary hover:bg-primary-dark border-primary hover:border-primary-dark text-white rounded-full'
                           >
                             <i className='uil uil-facebook-f'></i>
                           </Link>
                         </li>
                         <li className='mb-1'>
                           <Link
                             to='#'
                             className='size-8 inline-flex items-center text-center justify-center tracking-wide border align-middle duration-500 bg-primary hover:bg-primary-dark border-primary hover:border-primary-dark text-white rounded-full'
                           >
                             <i className='uil uil-instagram'></i>
                           </Link>
                         </li>
                         <li className='mb-1'>
                           <Link
                             to='#'
                             className='size-8 inline-flex items-center text-center justify-center tracking-wide border align-middle duration-500 bg-primary hover:bg-primary-dark border-primary hover:border-primary-dark text-white rounded-full'
                           >
                             <i className='uil uil-twitter'></i>
                           </Link>
                         </li>
                       </ul> */}

                <div className='content absolute start-0 end-0 -bottom-0 bg-white dark:bg-dark p-3 rounded-md text-center transition-all duration-500'>
                  <Link
                    to='#'
                    className='h5 text-md text-dark dark:text-white hover:text-primary dark:hover:text-primary font-medium'
                  >
                    {member.name}
                  </Link>
                  <h6 className='text-slate-400 dark:text-slate-300 mb-0 font-light'>
                    {member.designation}
                  </h6>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* <div className='container mt-12'>
                 <div className='grid grid-cols-2 md:grid-cols-4'>
                   <div className='counter-box position-relative text-center'>
                     <h3 className='font-medium text-3xl mb-2 dark:text-white'>
                       <CountUp
                         start={3}
                         className='counter-value'
                         end={40}
                         duration={2.75}
                       />
                       +
                     </h3>
                     <span className='counter-head text-slate-400 dark:text-slate-300'>
                       Projects
                     </span>
                   </div>
       
                   <div className='counter-box position-relative text-center'>
                     <h3 className='font-medium text-3xl mb-2 dark:text-white'>
                       <CountUp
                         start={1}
                         className='counter-value'
                         end={200}
                         duration={2.75}
                       />
                       +
                     </h3>
                     <span className='counter-head text-slate-400 dark:text-slate-300'>
                       Clients
                     </span>
                   </div>
       
                   <div className='counter-box position-relative text-center'>
                     <h3 className='font-medium text-3xl mb-2 dark:text-white'>
                       <CountUp
                         start={200}
                         className='counter-value'
                         end={457}
                         duration={2.75}
                       />
                       K
                     </h3>
                     <span className='counter-head text-slate-400 dark:text-slate-300'>
                       Members
                     </span>
                   </div>
       
                   <div className='counter-box position-relative text-center'>
                     <h3 className='font-medium text-3xl mb-2 dark:text-white'>
                       <CountUp
                         start={100}
                         className='counter-value'
                         end={150}
                         duration={2.75}
                       />
                       +
                     </h3>
                     <span className='counter-head text-slate-400 dark:text-slate-300'>
                       Employee
                     </span>
                   </div>
                 </div>
               </div> */}

        <div className='container mt-12'>
          <div className='flex flex-col lg:flex-row max-w-2xl mx-auto gap-6'>
            <div className='flex p-6 bg-white rounded-md w-full justify-center shadow-lg aspect-video'>
              <img
                src={TELImage}
                className='max-w-full h-full object-contain'
                alt=''
              />
            </div>

            <div className='flex p-6 bg-white rounded-md w-full justify-center shadow-lg aspect-video'>
              <img
                src={IBROImage}
                className='max-w-full h-full object-contain'
                alt=''
              />
            </div>
          </div>
        </div>
        {/* <!--end container--> */}
      </section>
    </>
  );
}
