import Aos from 'aos';
import React, { useEffect, useState } from 'react';
// import axios from 'axios';

export default function TicketRegistration({ initialType }) {
  const VITE_API_URL = import.meta.env.VITE_API_URL;

  const ticketInfo = {
    title: 'Teaching The Healing Brain: 27 Juni 2026',
    features: [
      'Isi Nama Lengkap & Email Anda',
      'Pilih Kategori Tiket',
      'Klik Daftar',
      'Selesaikan Pembayaran',
      'Tiket akan dikirim ke email Anda',
    ],
  };

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [type, setType] = useState('MHS');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    setSubmitted(true);
    setLoading(false);
    // try {
    //   // 1️⃣ Call backend untuk create order + snap token
    //   const res = await axios.post(`${VITE_API_URL}/payment/create`, {
    //     name,
    //     email,
    //     eventId: ticket.eventId,
    //   });

    //   const { token } = res.data;

    //   // 2️⃣ Trigger Midtrans Snap Popup
    //   window.snap.pay(token, {
    //     onSuccess: function () {
    //       setSubmitted(true);
    //     },
    //     onPending: function () {
    //       alert('Menunggu pembayaran...');
    //     },
    //     onError: function () {
    //       alert('Pembayaran gagal');
    //     },
    //     onClose: function () {
    //       console.log('Popup ditutup');
    //     },
    //   });
    // } catch (err) {
    //   alert('Gagal memproses pembayaran');
    //   console.error(err);
    // } finally {
    //   setLoading(false);
    // }
  };

  useEffect(() => {
    Aos.init();
  }, []);

  // Sync parent-provided initial type (when user clicks pricing) into local state
  useEffect(() => {
    if (initialType) setType(initialType);
  }, [initialType]);

  return (
    <section
      id='register'
      className='py-16 md:py-24 bg-gray-50 dark:bg-gray-900'
    >
      <div className='container mx-auto' data-aos='fade-up'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          {/* INFO EVENT */}
          <div className='bg-dark rounded-lg shadow-lg p-8'>
            <h3 className='text-md uppercase font-semibold text-primary mb-4'>
              {ticketInfo.title}
            </h3>
            <div className='mb-6 flex items-center'>
              <span className='text-2xl text-slate-100'>
                Langkah Registrasi
              </span>
            </div>

            <ul className='space-y-3 text-slate-100'>
              {ticketInfo.features.map((feature, i) => (
                <li key={i} className='flex items-center'>
                  <span className=' text-green-600 mr-2 border border-primary w-6 pl-1 h-6 rounded-full'>
                    {i + 1}.
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* FORM */}
          <div className='bg-white rounded-lg shadow-lg p-8 h-full flex flex-col'>
            <h3 className='text-2xl font-semibold mb-6'>Register Now</h3>

            {!submitted ? (
              <form onSubmit={handleSubmit}>
                <div className='mb-6'>
                  <label className='block font-medium'>Nama Lengkap</label>
                  <input
                    type='text'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className='w-full p-4 mt-2 border rounded-md'
                    placeholder='Masukkan nama lengkap'
                    required
                  />
                </div>

                <div className='mb-6'>
                  <label className='block font-medium'>Email</label>
                  <input
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='w-full p-4 mt-2 border rounded-md'
                    placeholder='Masukkan email aktif'
                    required
                  />
                </div>

                <div className='mb-6'>
                  <label className='block font-medium'>Kategori</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className='w-full p-4 mt-2 border rounded-md'
                    required
                  >
                    <option value='MHS'>Mahasiswa</option>
                    <option value='OTGR'>Guru & Orang Tua</option>
                    <option value='PRO'>Profesional</option>
                    <option value='FF'>Fully Funded</option>
                  </select>
                </div>

                {type !== 'FF' ? (
                  <button
                    type='submit'
                    disabled={loading}
                    className='w-full py-3 bg-amber-600 text-white rounded-full hover:bg-amber-700'
                  >
                    {loading ? 'Memproses...' : 'Daftar'}
                  </button>
                ) : (
                  <div className='text-gray-600 flex flex-col text-center items-center my-auto'>
                    <h4 className='text-xl font-semibold mb-2'>
                      Program Fully Funded sedang dikembangkan
                    </h4>
                    <p>Mohon menunggu informasi selanjutnya.</p>
                  </div>
                )}
              </form>
            ) : (
              <div className='text-gray-600 flex flex-col text-center items-center my-auto'>
                <h4 className='text-xl font-semibold mb-2'>
                  Sistem pendaftaran & pembayaran sedang dikembangkan
                </h4>
                <p>Mohon menunggu info lebih lanjut.</p>
              </div>
              // <div className='text-green-600 text-center'>
              //   <h4 className='text-xl font-semibold mb-2'>
              //     🎉 Pembayaran Berhasil
              //   </h4>
              //   <p>
              //     Tiket akan dikirim ke email <b>{email}</b>
              //   </p>
              // </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
