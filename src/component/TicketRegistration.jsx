import Aos from 'aos';
import React, { useEffect, useState } from 'react';
import FullyFundedModal from './Modal/FullyFundedModal';
// import axios from 'axios';

export default function TicketRegistration({ initialType }) {
  const VITE_API_URL = import.meta.env.VITE_API_URL;

  const [isFFModalOpen, setIsFFModalOpen] = useState(false);
  const [formMessage, setFormMessage] = useState(
    'Sistem Pembayaran sedang dikembangkan.',
  );

  const handleFFClick = () => {
    if (
      formData.name &&
      formData.email &&
      formData.waNumber &&
      formData.institution
    ) {
      setIsFFModalOpen(true);
    } else {
      alert(
        'Please fill out all required fields before selecting Fully Funded.',
      );
    }
  };

  const closeModal = () => {
    setIsFFModalOpen(false);
  };

  const ticketInfo = {
    title: 'Teaching the Healing Brain: 4 Juli 2026',
    features: [
      'Akses penuh seluruh sesi',
      'Live Q&A dengan pembicara',
      'Coffee/Tea Breaks',
      'Reflection Circle Experience',
      'Komunitas Rewiring Hope',
    ],
  };

  const [type, setType] = useState('MHS');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    waNumber: '',
    institution: '',
    type: type,
  });

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
    <>
      <section
        id='register'
        className='py-16 md:py-24 bg-gray-50 dark:bg-gray-900'
      >
        <div className='container mx-auto' data-aos='fade-up'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            {/* INFO EVENT */}
            <div className='bg-dark rounded-lg shadow-lg p-8'>
              <div className='mb-6 flex items-center'>
                <span className='text-2xl font-bold text-primary '>
                  {ticketInfo.title}
                </span>
              </div>

              <ul className='space-y-3 text-slate-100'>
                {ticketInfo.features.map((feature, i) => (
                  <li key={i} className='flex items-center'>
                    <i className='mdi mdi-star-four-points text-primary mr-2'></i>{' '}
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
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className='w-full p-4 mt-2 border rounded-md'
                      placeholder='Masukkan nama lengkap'
                      required
                    />
                  </div>

                  <div className='mb-6'>
                    <label className='block font-medium'>Email</label>
                    <input
                      type='email'
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className='w-full p-4 mt-2 border rounded-md'
                      placeholder='Masukkan email aktif'
                      required
                    />
                  </div>

                  <div className='mb-6'>
                    <label className='block font-medium'>No. WhatsApp</label>
                    <input
                      type='number'
                      value={formData.waNumber}
                      onChange={(e) =>
                        setFormData({ ...formData, waNumber: e.target.value })
                      }
                      className='w-full p-4 mt-2 border rounded-md'
                      placeholder='Masukkan No. WA aktif'
                      required
                    />
                  </div>

                  <div className='mb-6'>
                    <label className='block font-medium'>Kategori</label>
                    <select
                      value={type}
                      onChange={(e) => {
                        setType(e.target.value);
                        setFormData({ ...formData, type: e.target.value });
                      }}
                      className='w-full p-4 mt-2 border rounded-md'
                      required
                    >
                      <option value='MHS'>Mahasiswa</option>
                      <option value='OTGR'>Guru & Orang Tua</option>
                      <option value='PRO'>Profesional</option>
                      <option value='FF'>Fully Funded</option>
                    </select>
                  </div>

                  <div className='mb-6'>
                    <label className='block font-medium'>Institusi</label>
                    <input
                      type='text'
                      value={formData.institution}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          institution: e.target.value,
                        })
                      }
                      className='w-full p-4 mt-2 border rounded-md'
                      placeholder='Masukkan asal institusi'
                      required
                    />
                  </div>
                  <p className='text-center text-dark mb-2'>
                    Kami percaya Anda dapat memilih kategori yang paling sesuai
                    dengan kondisi Anda.
                  </p>
                  {type !== 'FF' ? (
                    <>
                      <button
                        type='submit'
                        disabled={loading}
                        className='w-full py-3 bg-amber-600 text-white rounded-full hover:bg-amber-700'
                      >
                        {loading ? 'Memproses...' : 'Daftar'}
                      </button>
                    </>
                  ) : (
                    <div className='text-gray-600 flex flex-col text-center items-center my-auto'>
                      <button
                        onClick={handleFFClick}
                        className='w-full py-3 bg-green-600 text-white rounded-full hover:bg-green-700 mt-4'
                      >
                        Open Fully Funded Form
                      </button>
                    </div>
                  )}
                </form>
              ) : (
                <div className='text-gray-600 flex flex-col text-center items-center my-auto'>
                  <h4 className='text-xl font-semibold mb-2'>{formMessage}</h4>
                  <p>Mohon menunggu info lebih lanjut.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      {/* Modal for FF */}
      <FullyFundedModal
        isOpen={isFFModalOpen}
        onClose={closeModal}
        formData={formData}
        setFormData={setFormData}
        setFormMessage={setFormMessage}
      />
    </>
  );
}
