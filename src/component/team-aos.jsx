import React, { useEffect } from 'react';

import { Link } from 'react-router-dom';
import CountUp from 'react-countup';
import Aos from 'aos';

import avatarTantri from '../assets/images/client/tantri (2).jpg';
import avatarMarina from '../assets/images/client/marina.jpg';
import avatarLaura from '../assets/images/client/laura.jpg';
import avatarLinda from '../assets/images/client/linda.jpg';
import avatarHesti from '../assets/images/client/hesti.jpg';
import avatarChristiyanti from '../assets/images/client/christiyanti.jpg';
import avatarVega from '../assets/images/client/vega.jpg';
import avatarFransiska from '../assets/images/client/fransiska.jpeg';

export default function TeamAos() {
  const team = [
    {
      name: 'Anastasia Tantri, M.Ed',
      profile: avatarTantri,
      designation: 'Founder & Program Director',
    },
    {
      name: 'dr. Vega Pratiwi Putri, Sp.N, M.Sc',
      profile: avatarVega,
      designation: 'Neurosciene & Clinical Neurology Advisor',
    },
    {
      name: 'Christiyanti Aprinastuti, M.Pd',
      profile: avatarChristiyanti,
      designation: 'Mathematical Thinking & Quality Assurance Specialist',
    },
    {
      name: 'Linda Devi Fitriana, Ph.D',
      profile: avatarLinda,
      designation: 'Cognitive Pedagogy Specialist',
    },
    {
      name: 'Laurensia Aptik Evanjeli,  M.A',
      profile: avatarLaura,
      designation: 'Media, Communication & Inclusive Education Coordinator',
    },
    {
      name: 'Marina Hardiyanti, M.Sc',
      profile: avatarMarina,
      designation: 'Food Science & Nutrition Coordinator',
    },
    {
      name: 'Hesti Miranda, M.Ed',
      profile: avatarHesti,
      designation: 'Community Engagement Coordinator',
    },
    {
      name: 'Fransiska Atika Indriyani, S.Si',
      profile: avatarFransiska,
      designation: 'Strategic Partnerships Lead',
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
              Bergerak Bersama Untuk Memulihkan Harapan
            </h3>

            <p className='text-dark dark:text-slate-300 max-w-5xl mx-auto'>
              Rewiring Hope merupakan wadah bagi para pendidik, ilmuwan,
              psikolog, dan praktisi yang meyakini bahwa proses belajar dapat
              menjadi sarana pemulihan. Mereka berada di garis depan dalam
              menegaskan kembali bahwa ketika otak merasa aman, hubungan dapat
              dipulihkan, dan motivasi kembali tumbuh, maka belajar menjadi
              perjalanan menuju keutuhan diri.
            </p>
          </div>

          <div className='max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8'>
            {team.map((member, index) => (
              <div
                key={index}
                className='relative rounded-md shadow-lg overflow-hidden group'
              >
                <img
                  src={member.profile}
                  className='group-hover:origin-center group-hover:scale-105 object-cover aspect-[5/7] lg:aspect-[4/5] object-top transition duration-500'
                  alt=''
                />
                <div className='absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/30 z-0 transition duration-500'></div>

                <div className='content absolute start-0 end-0 top-8/11 lg:top-5/7 bottom-0 bg-white dark:bg-dark p-3 rounded-md text-center transition-all duration-500 flex flex-col gap-1 h-full'>
                  <Link
                    to='#'
                    className='line-clamp-1 hover:line-clamp-none h5 text-md text-dark dark:text-white hover:text-primary dark:hover:text-primary font-medium'
                  >
                    {member.name}
                  </Link>
                  <h6 className='text-dark dark:text-slate-300 mb-0 text-xs font-light'>
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
        {/* <!--end container--> */}
      </section>
    </>
  );
}
