import React, { useEffect } from 'react';

import BawEventImage from '../assets/images/client/baw-event.webp';
import Aos from 'aos';

export default function VolunteerBenefit() {
  useEffect(() => {
    Aos.init();
  }, []);

  const benefits = [
    'Certificate of Contribution dari IBRO/Dana Foundation',
    'Pengalaman komunikasi sains',
    'Pengalaman langsung di dunia neuroscience & public outreach',
    'Portofolio dokumentasi edukasi publik',
    'Networking multidisipliner',
    'Snack, lunch, volunteer kit',
    'Training mini tentang neuroscience-informed event management',
  ];

  return (
    <>
      <section
        className='relative py-16 md:py-20 bg-slate-100 dark:bg-slate-800'
        id='about'
      >
        <div
          className='max-w-3xl px-6 md:px-0 mx-auto'
          data-aos='fade-up'
          data-aos-delay='200'
        >
          <h6 className='text-center text-dark text-base font-medium uppercase mb-2'>
            Brain Awareness Week & Teaching the Healing Brain Volunteer 2026
          </h6>
          <h3 className='text-center mb-4 md:text-2xl text-xl font-bold text-primary dark:text-white'>
            What You Get
          </h3>
          <div className='grid grid-cols-1 lg:grid-cols-12 md:grid-cols-2 gap-10 items-center justify-center'>
            <div className='lg:col-span-4 h-full bg-slate-200 p-4 space-y-4'>
              <div className='relative overflow-hidden rounded-lg w-full aspect-square mx-auto'>
                <img
                  src={BawEventImage}
                  className='object-cover object-center w-full'
                  alt=''
                />
              </div>
              <p className='text-blue-dark max-w-2xl mx-auto mt-4 md:text-lg text-center'>
                Volunteer <br />
                Rewiring Hope
              </p>
              <div className='flex justify-center'>
                <a
                  href='#register'
                  className='hover:scale-105 font-bold bg-white text-primary py-3 px-6 rounded-full shadow-lg hover:bg-primary hover:text-white transition-all duration-300 w-fit'
                >
                  Register Now
                </a>
              </div>
            </div>
            {/* end col */}

            <div className='lg:col-span-8'>
              <div className=''>
                <ul className='space-y-3 text-slate-100'>
                  {benefits.map((benefit, i) => (
                    <li
                      key={i}
                      className='flex items-start text-md text-blue-dark'
                    >
                      <i className='mdi mdi-star-four-points text-primary mr-2'></i>{' '}
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- End --> */}
    </>
  );
}
