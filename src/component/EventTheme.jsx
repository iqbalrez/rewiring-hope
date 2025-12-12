import React, { useEffect } from 'react';

import Aos from 'aos';

export default function EventTheme() {
  const team = [
    {
      title: `Unlocking the Brain’s Hidden Language of Learning`,
      icon: 'adjust-circle',
      content: `Menjelajahi bagaimana otak belajar secara alami melalui hubungan, pola, dan analogi, serta mengapa pemahaman ini penting untuk membangun fondasi pendidikan yang sehat.`,
    },
    {
      title: `Rewiring Hope: STEM and Neuroplasticity in Indonesian Education`,
      icon: 'circuit',
      content: `Menggali bagaimana prinsip neuroplastisitas dan pendekatan STEM dapat membangkitkan motivasi, membangun ketahanan, dan menciptakan ruang belajar yang penuh harapan.`,
    },
    {
      title: `Neurocognitive Pathways to Student Resilience`,
      icon: 'fire',
      content: `Memahami jalur neurokognitif yang mendukung regulasi emosi dan ketahanan mental siswa, serta bagaimana strategi berbasis otak dapat diterapkan dalam konteks budaya Indonesia.`,
    },
  ];

  useEffect(() => {
    Aos.init();
  }, []);

  return (
    <>
      {/* Start */}
      <section className='relative md:py-24 py-16 active' id='features'>
        <div
          className='container lg mx-auto'
          data-aos='fade-up'
          data-aos-delay='200'
        >
          <div className='grid grid-cols-1 text-center mb-2'>
            <h3 className='mb-2 md:text-2xl text-xl font-medium dark:text-white'>
              Tema Utama
            </h3>
            <h6 className='text-primary text-base font-medium uppercase'>
              Teaching the Healing Brain
            </h6>
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-6'>
            {team.map((item, key) => (
              <div
                key={key}
                className={`features p-6 shadow-xl shadow-slate-100 dark:shadow-slate-800`}
              >
                {/* <div className='w-20 h-20 bg-primary/5 text-primary rounded-xl text-3xl flex align-middle justify-center items-center'>
                  <i className={`uil uil-${item.icon}`}></i>
                </div> */}

                <div className='content mt-7'>
                  <h7 className='text-lg text-dark dark:text-white transition-all duration-500 ease-in-out font-bold'>
                    {item.title}
                  </h7>
                  <p className='text-dark mt-3 leading-relaxed'>
                    {item.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
