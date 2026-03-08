import React, { useEffect } from 'react';

import BawStoryImage from '../assets/images/volunteer/VolunteerStory.png';

import TeamAos from './team-aos';
import Sign from '../assets/images/sign.png';
import { Link } from 'react-router-dom';
import Aos from 'aos';
import { Link as ScrollLink } from 'react-scroll';

export default function VolunteerImpact() {
  useEffect(() => {
    Aos.init();
  }, []);

  const impacts = [
    'Membantu masyarakat memahami pentingnya kesehatan otak',
    'Mendorong minat generasi muda untuk terjun ke sains',
    'Menghubungkan ilmu saraf dengan kehidupan sehari-hari',
    'Membuat ruang belajar yang inklusif dan menyenangkan',
    'Memberikan kontribusi pada kampanye global Brain Awareness Week',
  ];

  return (
    <>
      <section className='relative py-16 md:py-20 px-8 bg-white' id='impact'>
        <div
          className='max-w-4xl px-6 md:px-0 mx-auto'
          data-aos='fade-up'
          data-aos-delay='200'
        >
          <div className='grid grid-cols-1 lg:grid-cols-12 md:grid-cols-2 gap-10 items-start justify-center'>
            <div className='lg:col-span-7 h-full flex flex-col justify-between'>
              <div className='space-y-4'>
                <div className=''>
                  <h6 className='text-dark text-base font-medium uppercase mb-2'>
                    Brain Awareness Week & Teaching the Healing Brain <br />{' '}
                    Volunteer 2026
                  </h6>
                  <h3 className='mb-4 md:text-2xl text-xl font-bold   text-primary'>
                    Your Impact as Volunteer
                  </h3>
                </div>
                <div className=''>
                  <ul className='space-y-3 text-slate-100'>
                    {impacts.map((item, i) => (
                      <li
                        key={i}
                        className='flex items-start text-md text-blue-dark'
                      >
                        <i className='mdi mdi-star-four-points text-primary mr-2'></i>{' '}
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <h6 className='flex text-primary font-semibold text-center'>
                “Volunteers are the bridge between science and society.” <br />
                IBRO/Dana Foundation
              </h6>
            </div>

            <div className='lg:col-span-5 h-full bg-slate-200 rounded-md'>
              <div className='relative overflow-hidden  h-full mx-auto'>
                <img
                  src={BawStoryImage}
                  className='object-cover object-center h-full'
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
