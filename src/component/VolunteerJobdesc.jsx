import React, { useEffect } from 'react';

import WhyImage from '../assets/images/volunteer/WhyImage.webp';
import TeamAos from './team-aos';
import Sign from '../assets/images/sign.png';
import { Link } from 'react-router-dom';
import Aos from 'aos';
import { Link as ScrollLink } from 'react-scroll';

export default function VolunteerJobdesc() {
  useEffect(() => {
    Aos.init();
  }, []);

  const whatYouWillDo = [
    {
      id: 1,
      title: 'Participant Support',
      desc: 'Menyambut peserta, memberi informasi, dan memastikan pengalaman acara berjalan hangat dan teratur.',
    },
    {
      id: 2,
      title: 'Science Engagement',
      desc: 'Mendampingi aktivitas edukasi otak dan membantu menjelaskan konsep dengan bahasa sederhana.',
    },
    {
      id: 3,
      title: 'Speaker & Session Assistance',
      desc: 'Mendukung kebutuhan narasumber dan membantu kelancaran di ruang presentasi dan lomba.',
    },
    {
      id: 4,
      title: 'Crowd & Direction Control',
      desc: 'Mengatur arus peserta, membantu penunjuk arah, dan menjaga ketertiban selama acara.',
    },
    {
      id: 5,
      title: 'Logistics & Movement',
      desc: 'Membantu distribusi perlengkapan, konsumsi, dan mendukung mobilitas di lapangan.',
    },
    {
      id: 6,
      title: 'Medical & Safety Support',
      desc: 'Membantu tim medis, memantau kebutuhan kesehatan dasar peserta, dan mendukung respons cepat jika dibutuhkan.',
    },
  ];

  return (
    <>
      <section
        className='relative py-24 bg-slate-100 dark:bg-slate-800'
        id='what-you-will-do'
      >
        <div
          className='container mx-auto'
          data-aos='fade-up'
          data-aos-delay='200'
        >
          <div className='grid grid-cols-1 lg:grid-cols-12 md:grid-cols-2 gap-10 items-start'>
            <div className='lg:col-span-5 h-full'>
              <div className='relative overflow-hidden rounded-lg h-full md:rounded-s-md md:rounded-e-4xl'>
                <img
                  src={WhyImage}
                  className='object-cover object-center w-full h-full'
                  alt=''
                />
              </div>
            </div>
            {/* end col */}

            <div className='lg:col-span-7'>
              <div className='lg:ms-7'>
                <h6 className='text-dark text-base font-medium uppercase mb-2'>
                  Brain Awareness Week & Teaching the Healing Brain <br />{' '}
                  Volunteer 2026
                </h6>
                <h3 className='mb-4 md:text-2xl text-xl font-bold text-primary dark:text-white'>
                  What You Will Do
                </h3>
                <div className='grid grid-cols-2 gap-x-8 gap-y-4'>
                  {whatYouWillDo.map((item) => (
                    <div key={item.id} className='flex gap-2'>
                      <i className='mdi mdi-star-four-points text-primary shrink-0 text-[#1a237e]' />
                      <div>
                        <p className='text-lg font-bold text-primary'>
                          {item.title}
                        </p>
                        <p className=' text-dark'>{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- End --> */}
    </>
  );
}
