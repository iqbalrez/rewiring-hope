import React, { useEffect } from 'react';

import { Link } from 'react-router-dom';
import CountUp from 'react-countup';

import avatarIda from '../assets/images/client/ida.webp';
import avatarMirza from '../assets/images/client/mirza.webp';

import Aos from 'aos';

export default function Speaker() {
  const speaker = [
    {
      name: 'dr. Ida Rochmawati, M.Sc., Sp.KJ',
      profile: avatarIda,
      designation: `Psikiater Empati I Bantu Adaptasi Diri Konsultan Psikiatri Komunitas`,
      // expertise: `Cognitive Scientist`,
    },
    {
      name: 'Dr. Mirza Hapsari Sakti Titis Penggalih, S.Gz., Dietisien, MPH',
      profile: avatarMirza,
      designation: `Medical and Health Sciences I Dietetics and Nutrigenomics I Nutrition and Dietetics`,
      // expertise: `STEM Expert`,
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
          <div className='col-span-3 flex flex-col gap-2 text-start'>
            <h6 className='text-amber-600 text-base font-medium uppercase'>
              Brain Awareness Week (Kisah Otak yang Tangguh)
            </h6>
            <h3 className='md:text-2xl text-xl font-medium text-blue-dark dark:text-white'>
              Acara Puncak: FAIR + GRAND FINAL
            </h3>

            <p className='text-md lg:text-lg text-blue-dark dark:text-slate-300 w-full mx-auto'>
              <span className='font-bold'>BRAIN ACTIVITY</span> (Hands-on
              Neuroscience Experience) - Kolaborasi dengan{' '}
              <span className='font-bold'>University of Queensland </span>
              <br />
              <br />
              <span className='font-bold'>BRAIN FAIR</span> Ruang pamer edukasi
              bagi sekolah, komunitas, universitas, UMKM, dan pelaku literasi.{' '}
              <br />
              <br />
              <span className='font-bold'>
                PAMERAN KARYA FINALIS (Infografis)
              </span>{' '}
              <br />
              <br />
              <span className='font-bold'>GRAND FINAL:</span> Storytelling live,
              pemutaran video finalis, dan pengumuman pemenang. <br />
              <br />
              <span className='font-bold'>Sesi refleksi</span>
              <br /> <i className='mdi mdi-circle-medium'></i>Otak Tangguh, Jiwa
              Tangguh <br />
              <i className='mdi mdi-circle-medium'></i>Nutrisi untuk Belajar,
              Pulih, dan Bertumbuh
            </p>
          </div>

          <div className='col-span-2 flex flex-col'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              {speaker.map((member, index) => (
                <div
                  key={index}
                  className='relative hover:scale-105 transition rounded-md overflow-hidden group flex flex-col h-full' // Flex dengan h-full untuk memastikan tinggi 100%
                >
                  <img
                    src={member.profile}
                    className='object-cover rounded-full mx-auto w-1/2 md:w-full aspect-square object-top'
                    alt=''
                  />
                  {/* <div className='absolute inset-0 bg-slate-900/0 group-hover:bg-primary/30 z-0 transition duration-500'></div> */}

                  <div className='content text-center md:text-start bg-white dark:bg-blue-dark p-3 rounded-md transition-all duration-500 flex flex-col h-full'>
                    <Link
                      to='#'
                      className='md:text-md font-bold text-blue-dark dark:text-white leading-tight mb-1'
                    >
                      {member.name}
                    </Link>
                    <h6 className='text-blue-dark text-md md:text-xs dark:text-slate-300 mb-0 font-light'>
                      {member.designation}
                    </h6>
                    <h6 className='text-primary text-md md:text-xs font-medium dark:text-slate-300 mt-2'>
                      {member.expertise}
                    </h6>
                  </div>
                </div>
              ))}
            </div>
            <div className='mt-4 bg-white rounded-md p-2 text-md text-center text-blue-dark'>
              📍 Grhatama Pustaka DIY
              <br />2 Juli 2026
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
