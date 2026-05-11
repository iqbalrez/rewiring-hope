import Aos from 'aos';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import FullyFundedModal from './Modal/FullyFundedModal';
import axios from 'axios';
import qrisImage from '../assets/images/QRIS-Static.jpeg';

export default function TicketRegistration() {
  const VITE_API_URL = import.meta.env.VITE_API_URL;
  const eventId = '29bd3506-0a83-11f1-909d-0a002700000b';

  const [agreeTerms, setAgreeTerms] = useState(false);
  const [file, setFile] = useState(null);
  const [instagramProof, setInstagramProof] = useState(null);
  const [libMembershipProof, setLibMembershipProof] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [showQris, setShowQris] = useState(false);

  const [formMessage, setFormMessage] = useState(
    'Pendaftaran ditutup sementara.',
  );

  const ticketInfo = {
    title: 'FAQ',
    faq: [
      {
        question: 'Siapa yang boleh ikut?',
        answer: 'Siswa TK, SD, SMP, dan SMA di Indonesia.',
      },
      {
        question: 'Apakah boleh mengikuti lebih dari 1 lomba?',
        answer: 'Ya.',
      },
      {
        question: 'Apakah karya boleh dibantu orang lain?',
        answer: 'Tidak.',
      },
      {
        question: 'Apakah karya harus orisinal?',
        answer: 'Ya, belum pernah dipublikasikan.',
      },
      {
        question: 'Kapan pengumuman finalis?',
        answer: '13 Juni 2026',
      },
      {
        question: 'Bahasa video?',
        answer: 'Inggris/Indonesia',
      },
    ],
  };

  const [type, setType] = useState('MW');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(true);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    institution: '',
    type: type,
    level: 'TK',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      // 1️⃣ Call backend untuk create order + snap token
      const data = new FormData();
      data.append('name', formData.name);
      data.append('email', formData.email);
      data.append('phone', formData.phone);
      data.append('category', type);
      data.append('eventId', eventId); // Pastikan ID Event benar

      const finalSubmissionData = {
        personal_info: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          institution: formData.institution,
          level: formData.level,
          type: type,
        },
        submission: {
          type: type,
          title: '',
          link: '',
        },
      };

      data.append('submissionData', JSON.stringify(finalSubmissionData));

      if (file) {
        data.append('paymentProof', file);
      }
      if (instagramProof) {
        data.append('instagramProof', instagramProof);
      }
      if (libMembershipProof) {
        data.append('libMembershipProof', libMembershipProof);
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

  const levelOptions = {
    MW: [
      <option key='TK' value='TK'>
        TK
      </option>,
    ],
    ST: [
      <option key='SD1' value='SD1'>
        SD / Kelas 1
      </option>,
      <option key='SD2' value='SD2'>
        SD / Kelas 2
      </option>,
      <option key='SD3' value='SD3'>
        SD / Kelas 3
      </option>,
      <option key='SD4' value='SD4'>
        SD / Kelas 4
      </option>,
      <option key='SD5' value='SD5'>
        SD / Kelas 5
      </option>,
      <option key='SD6' value='SD6'>
        SD / Kelas 6
      </option>,
    ],
    RV: [
      <option key='SMP7' value='SMP7'>
        SMP / Kelas 7
      </option>,
      <option key='SMP8' value='SMP8'>
        SMP / Kelas 8
      </option>,
      <option key='SMP9' value='SMP9'>
        SMP / Kelas 9
      </option>,
      <option key='SMA10' value='SMA10'>
        SMA / Kelas 10
      </option>,
      <option key='SMA11' value='SMA11'>
        SMA / Kelas 11
      </option>,
      <option key='SMA12' value='SMA12'>
        SMA / Kelas 12
      </option>,
    ],
    DI: [
      // Karena RV dan DI opsinya sama, bisa dipisah atau di-alias
      <option key='SMP7' value='SMP7'>
        SMP / Kelas 7
      </option>,
      <option key='SMP8' value='SMP8'>
        SMP / Kelas 8
      </option>,
      <option key='SMP9' value='SMP9'>
        SMP / Kelas 9
      </option>,
      <option key='SMA10' value='SMA10'>
        SMA / Kelas 10
      </option>,
      <option key='SMA11' value='SMA11'>
        SMA / Kelas 11
      </option>,
      <option key='SMA12' value='SMA12'>
        SMA / Kelas 12
      </option>,
    ],
  };

  return (
    <>
      <section
        id='register'
        className='py-16 md:py-24 bg-gray-50 dark:bg-gray-900'
      >
        <div className='container mx-auto' data-aos='fade-up'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            {/* INFO EVENT */}
            <div className='bg-blue-dark rounded-lg shadow-lg p-8'>
              <div className='mb-6 flex items-center'>
                <span className='text-2xl font-bold text-amber-500'>
                  {ticketInfo.title}
                </span>
              </div>

              <ul className='space-y-4 text-slate-100'>
                {ticketInfo.faq.map((faq, i) => (
                  <li key={i} className='flex items-start'>
                    <i className='mdi mdi-star-four-points text-amber-500 mr-2'></i>{' '}
                    <p className='text-sm'>
                      <span className='font-semibold'>
                        {faq.question}
                        <br />
                      </span>
                      {faq.answer}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            {/* FORM */}
            <div className='bg-white rounded-lg shadow-lg p-8 h-full flex flex-col'>
              <h3 className='text-2xl font-semibold mb-2'>Daftar Sekarang</h3>
              <p className='text-sm text-gray-600 mb-6'>
                Formulir ini digunakan untuk mendaftarkan diri dalam kompetisi
                Brain Awareness Week 2026
              </p>
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
                    <label className='block font-medium'>Kategori Lomba</label>
                    <select
                      value={type}
                      onChange={(e) => {
                        setType(e.target.value);
                        setFormData({
                          ...formData,
                          type: e.target.value,
                          level: 'TK',
                        });
                      }}
                      className='w-full p-4 mt-2 border rounded-md h-14'
                      required
                    >
                      <option value='MW'>Mewarnai - TK</option>
                      <option value='ST'>Story Telling - SD</option>
                      <option value='RV'>Reels Video - SMP & SMA</option>
                      <option value='DI'>Desain Infografis - SMP & SMA</option>
                    </select>
                  </div>

                  <div className='mb-6'>
                    <label className='block font-medium'>Jenjang/Kelas</label>
                    <select
                      value={formData.level}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          level: e.target.value,
                        })
                      }
                      className='w-full p-4 mt-2 border rounded-md h-14'
                      required
                    >
                      {levelOptions[type] || <option value='TK'>TK</option>}
                    </select>
                  </div>

                  <div className='mb-6'>
                    <label className='block font-medium'>Email Aktif</label>
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
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className='w-full p-4 mt-2 border rounded-md'
                      placeholder='Masukkan No. WA aktif'
                      required
                    />
                  </div>

                  <div className='mb-6'>
                    <label className='block font-medium'>Sekolah</label>
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

                  <div className='mb-6'>
                    <label className='block font-medium'>
                      Bukti Follow Instagram (JPG/PNG)
                    </label>
                    <div className='mt-2 p-4 border-2 border-dashed border-gray-300 rounded-md bg-gray-50'>
                      <input
                        type='file'
                        accept='image/*'
                        onChange={(e) => setInstagramProof(e.target.files[0])}
                        className='w-full'
                        required={type !== 'FF'}
                      />
                      <div className='mt-4 p-3 bg-gray-50 rounded-lg border border-dashed border-gray-300'>
                        <p className='text-xs text-gray-500'>
                          Silakan upload bukti follow Instagram{' '}
                          <a
                            target='_blank'
                            href='https://instagram.com/rewiringhopeindonesia'
                            className='text-blue-600'
                          >
                            @rewiringhopeindonesia
                          </a>
                          .
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* QRIS Modal via Portal */}
                  {showQris &&
                    ReactDOM.createPortal(
                      <div
                        className='fixed inset-0 z-[9999] flex items-center justify-center bg-black/60'
                        onClick={() => setShowQris(false)}
                      >
                        <div
                          className='bg-white rounded-2xl shadow-2xl p-6 mx-4 max-w-sm w-full text-center'
                          onClick={(e) => e.stopPropagation()}
                        >
                          <h4 className='text-base font-semibold text-gray-800 mb-1'>
                            Bayar via QRIS
                          </h4>
                          <p className='text-xs text-gray-500 mb-2'>
                            Scan QR di bawah, bayar tepat sejumlah:
                          </p>
                          <p className='text-2xl font-bold text-blue-600 mb-4'>
                            Rp50.000
                          </p>
                          <img
                            src={qrisImage}
                            alt='QRIS Static Rewiring Hope'
                            className='mx-auto max-w-[240px] w-full rounded-xl border border-gray-200'
                          />
                          <p className='text-xs text-gray-400 mt-3'>
                            Berlaku untuk semua bank &amp; e-wallet
                          </p>
                          <button
                            type='button'
                            onClick={() => setShowQris(false)}
                            className='mt-4 px-6 py-2 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 transition'
                          >
                            Tutup
                          </button>
                        </div>
                      </div>,
                      document.body,
                    )}

                  <div className='mb-6'>
                    <label className='block font-medium'>
                      Bukti Pembayaran via QRIS (JPG/PNG)
                    </label>
                    <div className='mt-2 p-4 border-2 border-dashed border-gray-300 rounded-md bg-gray-50'>
                      <div className='mb-4 p-3 bg-white rounded-lg border border-gray-200 text-center'>
                        <p className='text-xs text-gray-500 mb-1'>
                          Bayar sebesar:
                        </p>
                        <p className='text-lg font-bold text-blue-600 mb-3'>
                          Rp50.000
                        </p>
                        <button
                          type='button'
                          onClick={() => setShowQris(true)}
                          className='px-5 py-2 bg-blue-600 text-white text-sm rounded-full hover:bg-blue-700 transition'
                        >
                          Tampilkan QRIS
                        </button>
                      </div>
                      <input
                        type='file'
                        accept='image/*'
                        onChange={(e) => setFile(e.target.files[0])}
                        className='w-full'
                        required={true}
                      />
                      <p className='text-xs text-gray-500 mt-2'>
                        Upload screenshot / foto bukti pembayaran QRIS
                      </p>
                    </div>
                  </div>

                  <div className='mb-6'>
                    <label className='block font-medium'>
                      Bukti Pendaftaran Keanggotaan Perpustakaan DIY (JPG/PNG){' '}
                      <span className='text-gray-400 font-normal text-sm'>
                        (Opsional)
                      </span>
                    </label>
                    <p className='text-xs text-gray-500 mt-1'>
                      Kami menganjurkan peserta untuk{' '}
                      <a
                        target='_blank'
                        href='https://balaiyanpus.jogjaprov.go.id/'
                        className='text-blue-600'
                      >
                        mendaftar keanggotaan di Perpustakaan DIY (gratis)
                      </a>
                      . Kartu anggota Perpustakaan DIY merupakan:
                    </p>
                    <ul className='mt-1 mb-2 text-xs text-gray-500 list-disc list-inside space-y-1'>
                      <li>
                        🏆 Syarat pengambilan hadiah lomba di Grhatama Pustaka
                      </li>
                      <li>🖼️ Syarat masuk wahana Diorama</li>
                      <li>🎬 Syarat masuk Bioskop 6D</li>
                    </ul>
                    <div className='mt-2 p-4 border-2 border-dashed border-gray-300 rounded-md bg-gray-50'>
                      <input
                        type='file'
                        accept='image/*'
                        onChange={(e) =>
                          setLibMembershipProof(e.target.files[0])
                        }
                        className='w-full'
                      />
                      <div className='mt-4 p-3 bg-gray-50 rounded-lg border border-dashed border-gray-300'>
                        <p className='text-xs text-gray-500'>
                          Upload bukti pendaftaran keanggotaan jika sudah
                          mendaftar
                        </p>
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
    </>
  );
}
