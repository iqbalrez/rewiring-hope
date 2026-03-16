import React, { useState, useEffect } from 'react';
import { Brain, GraduationCap, Users, Clapperboard } from 'lucide-react';

export default function VolunteerWhy() {
  const features = [
    {
      id: 1,
      title: 'Pengalaman Neurosains untuk Publik',
      desc: 'Terlibat dalam dua acara ilmiah besar yang menggabungkan neurosains, pendidikan, dan kesehatan mental.',
      image: <Brain size={48} />,
    },
    {
      id: 2,
      title: 'Belajar dari Peneliti & Praktisi',
      desc: 'Berinteraksi dengan akademisi dan praktisi yang menghubungkan neuroscience dengan masyarakat.',
      image: GraduationCap,
    },
    {
      id: 3,
      title: 'Soft Skills & Leadership',
      desc: 'Mengasah koordinasi, komunikasi, teamwork, crisis response, dan pelayanan acara profesional.',
      image: 'https://placehold.co/400',
    },
    {
      id: 4,
      title: 'Behind the Scences',
      desc: 'Melihat bagaimana edukasi ilmiah dirancang, dikemas, dan dijalankan untuk masyarakat luas.',
      image: 'https://placehold.co/400',
    },
  ];

  return (
    <>
      {/* Start */}

      <section
        className='relative md:py-20 py-16 space-y-4 bg-primary'
        id='features'
      >
        <div className='container space-y-4'>
          <div className='grid grid-cols-1 pb-4 text-center'>
            <h6 className='text-white text-base font-medium uppercase mb-2'>
              Brain Awareness Week & Teaching the Healing Brain Volunteer 2026
            </h6>
            <h3 className='mb-4 md:text-2xl text-xl font-bold   text-white'>
              Why Volunteer
            </h3>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 h-full'>
            {features.map((item, key) => (
              <div
                className='p-8 h-full flex flex-col justify-between bg-zinc-50 hover:bg-white dark:bg-gray-800 dark:hover:bg-slate-900 rounded-md shadow-sm shadow-slate-200 dark:shadow-slate-700 transition duration-500'
                key={key}
              >
                <div className='h-full flex flex-col text-center'>
                  <img
                    className='mx-auto mb-3'
                    src={item.image}
                    alt={item.title}
                  ></img>
                  <h3 className='text-lg md:text-xl font-bold text-dark dark:text-white mb-2'>
                    {item.title}
                  </h3>
                  <p className='mb-3 text-sm text-dark'>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <h6 className='text-white text-center text-base font-medium mt-8'>
            Volunteering here means serving knowledge, compassion, and science
            to the community.
          </h6>
        </div>
      </section>
    </>
  );
}
