import Aos from 'aos';
import React, { useEffect, useState } from 'react';
import FullyFundedModal from './Modal/FullyFundedModal';
import axios from 'axios';

export default function TicketRegistration({ initialType, initialPrice }) {
  const VITE_API_URL = import.meta.env.VITE_API_URL;
  const eventId = 'c2314b19-6311-4f4a-9e46-12723df7f74d';

  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isFFModalOpen, setIsFFModalOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

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
  const [price, setPrice] = useState(initialPrice);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const priceMap = {
    MHS: 150000,
    OTGR: 350000,
    PRO: 500000,
    FF: 0,
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    waNumber: '',
    institution: '',
    type: type,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (type === 'FF') {
      handleFFClick();
      return;
    }
    setLoading(true);
    setErrorMsg('');

    try {
      // 1️⃣ Call backend untuk create order + snap token
      const data = new FormData();
      data.append('name', formData.name);
      data.append('email', formData.email);
      data.append('phone', formData.waNumber);
      data.append('category', type); // MHS, OTGR, PRO
      data.append('eventId', eventId); // Pastikan ID Event benar

      const submissionData = {
        personal_info: {
          name: formData.name,
          email: formData.email,
          phone: formData.waNumber,
          institution: formData.institution,
          type: type,
        },
      };

      data.append('submissionData', JSON.stringify(submissionData));

      if (file) {
        data.append('paymentProof', file);
      }

      await axios.post(`${VITE_API_URL}/orders/register`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setFormMessage(
        'Pendaftaran Berhasil! Mohon cek email Anda untuk instruksi selanjutnya.',
      );
      setSubmitted(true);

      // const { token } = res.data;

      // 2️⃣ Trigger Midtrans Snap Popup
      // window.snap.pay(token, {
      //   onSuccess: function () {
      //     setSubmitted(true);
      //   },
      //   onPending: function () {
      //     alert('Menunggu pembayaran...');
      //   },
      //   onError: function () {
      //     alert('Pembayaran gagal');
      //   },
      //   onClose: function () {
      //     console.log('Popup ditutup');
      //   },
      // });
    } catch (err) {
      const msg = err.response?.data?.message || 'Gagal memproses pendaftaran';
      setErrorMsg(msg);
      alert(msg);
      console.error(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    Aos.init();
  }, []);

  // Sync parent-provided initial type (when user clicks pricing) into local state
  useEffect(() => {
    if (initialType) setType(initialType);
    if (initialPrice) setPrice(initialPrice);
  }, [initialType, initialPrice]);

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
                        setPrice(priceMap[e.target.value] || initialPrice || 0);
                        setFormData({ ...formData, type: e.target.value });
                      }}
                      className='w-full p-4 mt-2 border rounded-md h-14'
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
                  <p className='text-center text-dark mb-4'>
                    Kami percaya Anda dapat memilih kategori yang paling sesuai
                    dengan kondisi Anda.
                  </p>
                  {type !== 'FF' ? (
                    <>
                      <div className='mb-6'>
                        <label className='block font-medium'>
                          Bukti Transfer (JPG/PNG)
                        </label>
                        <div className='mt-2 p-4 border-2 border-dashed border-gray-300 rounded-md bg-gray-50'>
                          <input
                            type='file'
                            accept='image/*'
                            onChange={(e) => setFile(e.target.files[0])}
                            className='w-full'
                            required={type !== 'FF'}
                          />
                          <div className='mt-4 p-3 bg-gray-50 rounded-lg border border-dashed border-gray-300'>
                            <p className='text-xs text-gray-500'>
                              Silakan transfer tepat sejumlah:
                            </p>
                            <p className='text-lg font-bold text-blue-600'>
                              Rp{price.toLocaleString('id-ID')}
                            </p>

                            <div className='mt-2'>
                              <p className='text-xs text-gray-500 uppercase tracking-wider'>
                                Bank Mandiri
                              </p>
                              <p className='text-sm font-semibold text-gray-800 tracking-widest'>
                                1360037231120
                              </p>
                              <p className='text-xs text-gray-500'>
                                a/n ANASTASIA AJENG WULAN TANTRI
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='mb-4 flex items-start gap-3'>
                        <input
                          id='agreeTerms'
                          type='checkbox'
                          className='mt-1 h-4 w-4 accent-amber-600'
                          checked={agreeTerms}
                          onChange={(e) => setAgreeTerms(e.target.checked)}
                          disabled={loading}
                          required
                        />
                        <label
                          htmlFor='agreeTerms'
                          className='text-sm text-slate-700 leading-relaxed'
                        >
                          Saya telah membaca dan menyetujui{' '}
                          <a
                            href='/terms-and-conditions'
                            target='_blank'
                            rel='noreferrer'
                            className='font-semibold text-amber-700 underline hover:text-amber-800'
                          >
                            Syarat & Ketentuan
                          </a>
                          .
                        </label>
                      </div>

                      <button
                        type='submit'
                        disabled={loading || !agreeTerms}
                        className={`w-full py-3 text-white rounded-full transition ${
                          loading || !agreeTerms
                            ? 'bg-slate-300 cursor-not-allowed'
                            : 'bg-amber-600 hover:bg-amber-700'
                        }`}
                      >
                        {loading ? 'Memproses...' : 'Daftar'}
                      </button>
                    </>
                  ) : (
                    <div className='text-gray-600 flex flex-col text-center items-center my-auto'>
                      <button
                        type='button'
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
              {errorMsg && (
                <div className='mb-4 p-3 bg-red-100 text-red-700 text-sm rounded-md'>
                  {errorMsg}
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
        eventId={eventId}
        setSubmitted={setSubmitted}
      />
    </>
  );
}
