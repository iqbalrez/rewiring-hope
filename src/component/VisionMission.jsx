import React, { useEffect } from 'react';

import AboutImage from '../assets/images/about4.jpg';
import VisionImage from '../assets/images/vision.png';
import MissionImage from '../assets/images/mission.jpeg';
import Aos from 'aos';

export default function VisionMission() {
  useEffect(() => {
    Aos.init();
  }, []);

  return (
    <>
      <section
        className='relative py-8 md:py-16 bg-gray-100 dark:bg-slate-800'
        id='vision'
      >
        <div className='w-full max-w-4xl px-4 lg:px-0 mx-auto'>
          <div className='grid grid-cols-1 lg:grid-cols-12 md:grid-cols-2 gap-10 items-center '>
            <div className='lg:col-span-7'>
              <div className=''>
                <h3
                  className='pt-8 md:pt-0 mb-4 text-4xl font-semibold text-dark'
                  data-aos='fade-up'
                  data-aos-delay='400'
                >
                  Visi
                </h3>
                <h6
                  className='text-primary text-xl font-bold italic mb-4'
                  data-aos='fade-up'
                  data-aos-delay='300'
                >
                  Education that heals.
                  <br />
                  Integrity that shapes.
                  <br />
                  Hope that lasts.
                  <br />
                  <span className='text-dark text-xs font-normal'>
                    (Pendidikan yang memulihkan. Integritas yang membentuk.
                    Harapan yang bertahan.)
                  </span>
                </h6>

                <p
                  className='text-dark italic font-semibold dark:text-slate-300 max-w-2xl mx-auto md:text-lg'
                  data-aos='fade-up'
                  data-aos-delay='500'
                >
                  Kami percaya bahwa pendidikan seharusnya memulihkan, bukan
                  melukai.
                  <br />
                  <br />
                  Dengan menyelaraskan kembali hati dan pikiran, setiap anak
                  dapat menemukan kembali makna belajar dan percaya bahwa masa
                  depan adalah sesuatu yang dapat mereka bangun.
                </p>
              </div>
            </div>

            <div
              className='lg:col-span-5'
              data-aos='fade-up'
              data-aos-delay='200'
            >
              <div className='relative flex-col text-center justify-center'>
                <img
                  src={VisionImage}
                  className='md:w-full w-1/2 rounded-lg saturate-120 object-cover relative mx-auto'
                  alt=''
                />
                <p>
                  Ilustrasi oleh Nafiza Dinda, <br />
                  SMAN 4 Semarang
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className='relative py-12 md:py-20 bg-dark dark:bg-slate-800'
        id='mission'
      >
        <div className='w-full max-w-4xl px-4 lg:px-0 mx-auto'>
          <div className='grid grid-cols-1 lg:grid-cols-12 md:grid-cols-2 gap-10 items-center '>
            <div
              className='lg:col-span-7'
              data-aos='fade-up'
              data-aos-delay='200'
            >
              <div className='relative'>
                <img
                  src={MissionImage}
                  className='rounded-lg w-full saturate-120 object-cover object-left relative'
                  alt=''
                />
              </div>
            </div>

            <div
              className='lg:col-span-5 h-full'
              data-aos='fade-up'
              data-aos-delay='400'
            >
              <div className='h-full place-content-end'>
                <h3 className='mb-4 text-4xl font-semibold text-white'>Misi</h3>

                <p className='text-white max-w-2xl mx-auto md:text-lg'>
                  Menumbuhkan harapan dan mentransformasi ruang belajar menjadi
                  tempat yang memulihkan.
                  <br />
                  <br />
                  Kami membimbing sekolah dan keluarga untuk menumbuhkan
                  ketangguhan, integritas, dan keberanian dalam diri anak, agar
                  mereka dapat kembali bermimpi dan berkembang secara utuh. Kami
                  tidak hanya mengajarkan cara belajar.
                  <br />
                  <br />
                  Kami membantu membangun kembali manusia
                </p>
              </div>
            </div>
          </div>
          <h3
            className='mt-8 text-xl font-bold text-center text-white'
            data-aos='fade-up'
            data-aos-delay='500'
          >
            Empati • Neuroplastisitas • Integritas • Harapan
          </h3>
        </div>
      </section>
    </>
  );
}
