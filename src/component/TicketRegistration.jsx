import Aos from 'aos';
import React, { useEffect, useState } from 'react';

export default function TicketRegistration() {
  const ticket = {
    title: 'Teaching The Healing Brain: 27 Juni 2026',
    price: 30000,
    features: [
      'Fullday Pass',
      'Exclusive VIP materials',
      'Meet & greet with speakers',
      'Access to after-party',
    ],
  };

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Simulasikan pengiriman data, bisa dikembangkan untuk backend atau API call
  };

  useEffect(() => {
    Aos.init();
  }, []);

  return (
    <section
      id='register'
      className='py-16 md:py-24 bg-gray-50 dark:bg-gray-900'
    >
      <div
        className='container mx-auto'
        data-aos='fade-up'
        data-aos-delay='200'
      >
        {/* Layout dengan dua kolom */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          {/* Kolom Kiri - Info Tiket */}
          <div className='bg-dark rounded-lg shadow-lg p-8'>
            <h3 className='text-md uppercase font-semibold text-primary dark:text-slate-100 mb-4'>
              {ticket.title}
            </h3>
            <div className='mb-6 flex items-center'>
              <span className='text-3xl font-semibold text-slate-100 '>
                Rp{ticket.price.toLocaleString('id-ID')}
              </span>
              <span className='text-xl ml-2 text-slate-100 dark:text-gray-400'>
                / ticket
              </span>
            </div>
            <ul className='space-y-3 mb-6 text-left text-slate-100 dark:text-slate-300'>
              {ticket.features.map((feature, index) => (
                <li className='flex items-center' key={index}>
                  <i className='uil uil-check-circle text-lg text-green-600 mr-2'></i>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Kolom Kanan - Formulir Pendaftaran */}
          <div className='bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8'>
            <h3 className='text-2xl font-semibold text-gray-800 dark:text-white mb-6'>
              Register Now
            </h3>

            <form onSubmit={handleSubmit}>
              <div className='mb-6'>
                <label
                  htmlFor='name'
                  className='block text-lg font-medium text-gray-700 dark:text-gray-300'
                >
                  Nama Lengkap
                </label>
                <input
                  type='text'
                  id='name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className='w-full p-4 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600'
                  placeholder='Enter your full name'
                  required
                />
              </div>

              <div className='mb-6'>
                <label
                  htmlFor='email'
                  className='block text-lg font-medium text-gray-700 dark:text-gray-300'
                >
                  Alamat Email
                </label>
                <input
                  type='email'
                  id='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className='w-full p-4 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600'
                  placeholder='Enter your email'
                  required
                />
              </div>

              <button
                type='submit'
                className='w-full py-3 bg-amber-600 text-white rounded-full hover:bg-amber-700 transition-all duration-300'
              >
                Daftar Sekarang
              </button>
            </form>

            {submitted && (
              <div className='mt-6 text-green-500'>
                <p className='font-semibold'>
                  Thank you for registering! A confirmation email will be sent
                  to you shortly.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
