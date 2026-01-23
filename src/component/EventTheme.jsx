import React, { useEffect } from 'react';

import Aos from 'aos';

export default function EventTheme() {
  const team = [
    {
      title: `Unlocking the Brain’s Hidden Language of Learning`,
      icon: 'adjust-circle',
      content: (
        <>
          <p>
            Bagaimana sebenarnya otak dapat berkembang?
            <br />
            Jawabannya sederhana:
            <br />
            Melalui hubungan yang aman, pola yang jelas, dan tantangan yang
            tepat (tidak berlebihan, tidak kurang).
            <br />
            <br />
            <span class='font-bold'>
              Ini fondasi yang menentukan apakah seorang anak bisa fokus,
              memahami, mengingat, dan akhirnya bertumbuh.
            </span>
          </p>
        </>
      ),
    },
    {
      title: `Rewiring Hope: STEM and Neuroplasticity in Indonesian Education`,
      icon: 'circuit',
      content: (
        <>
          <p>
            Bangun karakter, fokus, dan ketangguhan anak dengan pola pikir
            ilmiah:
            <span class='font-bold'>
              curiosity, problem‑solving, trial & error, dan grit.
              <br />
              <br />
            </span>
            <span class='font-bold'>
              Tetap hadir secara emosional, bahkan di tengah jadwal profesional
              yang padat.
            </span>
            <br />
            <br />
            Sederhana. Relevan. Inspiratif.
          </p>
        </>
      ),
    },
    {
      title: `Neurocognitive Pathways to Student Resilience`,
      icon: 'fire',
      content: (
        <>
          <p>
            Anak-anak tidak tumbuh kuat hanya karena “disuruh kuat.”{' '}
            <span className='font-bold'>
              Mereka kuat ketika otaknya merasa aman.{' '}
            </span>
            <br />
            <br />
            Resiliensi bukan keberuntungan. Ia adalah jalur neurokognitif yang
            bisa dipahami, diasah dan dibangun.
            <br />
            <br />
            Anak butuh orang dewasa yang berani melihat lebih dalam, bukan hanya
            menilai dari apa yang tampak.
          </p>
        </>
      ),
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

                <div className='content mt-7 text-dark'>
                  <h6 className='text-lg text-dark dark:text-white transition-all duration-500 ease-in-out font-bold mb-4'>
                    {item.title}
                  </h6>
                  {item.content && item.content}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
