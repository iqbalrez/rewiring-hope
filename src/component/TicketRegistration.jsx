import Aos from 'aos';
import React, { useEffect, useState } from 'react';
import FullyFundedModal from './Modal/FullyFundedModal';
import brainImage from '../assets/images/brain.jpg';

export default function TicketRegistration() {
  const eventId = 'c2314b19-6311-4f4a-9e46-12723df7f74d';

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formMessage, setFormMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const ticketInfo = {
    title: 'Yang Akan Anda Rasakan dan Pelajari',
    features: [
      'Memahami bagaimana otak belajar dan merespons pengalaman',
      'Berbagi dan berdialog langsung dengan para pembicara',
      'Waktu refleksi untuk menghubungkan pengalaman dengan praktik nyata',
      'Ruang belajar yang aman untuk bertanya dan memahami diri',
      'Terhubung dengan komunitas Rewiring Hope',
    ],
  };

  useEffect(() => {
    Aos.init();
  }, []);

  return (
    <>
      <section
        id='register'
        className='py-16 md:py-24 bg-gray-50 dark:bg-gray-900'
      >
        <div className='container mx-auto' data-aos='fade-up'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8 items-center'>
            {/* LEFT — Info */}
            <div className='bg-dark rounded-lg shadow-lg p-8'>
              <h2 className='text-2xl font-bold text-primary italic mb-6'>
                {ticketInfo.title}
              </h2>
              <ul className='space-y-3 text-slate-100'>
                {ticketInfo.features.map((feature, i) => (
                  <li key={i} className='flex items-start gap-2'>
                    <i className='mdi mdi-circle-small text-primary text-xl leading-tight'></i>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* RIGHT — Image + CTA */}
            <div className='flex flex-col items-center text-center gap-6'>
              <h3 className='text-2xl font-bold text-dark'>
                Teaching <br /> the Healing Brain
              </h3>

              <img
                src={brainImage}
                alt='Teaching the Healing Brain'
                className='w-48 h-48 object-cover p-4 bg-white rounded-md '
              />

              {!submitted ? (
                <>
                  <p className='text-primary font-semibold italic text-sm'>
                    Bergabung tanpa biaya. Kuota terbatas.
                    <br />
                    Peserta yang terpilih akan dihubungi melalui email.
                  </p>

                  <button
                    onClick={() => setIsModalOpen(true)}
                    className='px-8 py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-full uppercase tracking-widest transition shadow-md'
                  >
                    Mulai Perjalanan Ini →
                  </button>

                  <p className='text-xs text-gray-500'>
                    Dengan dukungan dari <br />
                    <span className='italic'>
                      International Brain Research Organization (IBRO)
                    </span>{' '}
                    <br />
                    dan Pemda Daerah Istimewa Yogyakarta
                  </p>
                </>
              ) : (
                <div className='text-center text-gray-700 bg-green-50 border border-green-200 rounded-lg p-6'>
                  <i className='mdi mdi-check-circle text-green-500 text-4xl mb-2 block'></i>
                  <h4 className='text-xl font-semibold mb-2'>{formMessage}</h4>
                  <p className='text-sm text-gray-500'>
                    Mohon menunggu info lebih lanjut.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <FullyFundedModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        setFormMessage={setFormMessage}
        eventId={eventId}
        setSubmitted={setSubmitted}
      />
    </>
  );
}
