import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

export default function SubmitKaryaModal({ isOpen, onClose }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: Validasi, 2: Form Submit
  const [error, setError] = useState('');
  const [type, setType] = useState('');

  // State Form
  const [credentials, setCredentials] = useState({
    orderId: searchParams.get('orderId') || '',
    email: searchParams.get('email') || '',
  });
  const [submission, setSubmission] = useState({ title: '', link: '' });
  const [verifiedData, setVerifiedData] = useState(null);

  const VITE_API_URL = import.meta.env.VITE_API_URL;

  // Handle input perubahan
  const handleCredentialChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmissionChange = (e) => {
    setSubmission({ ...submission, [e.target.name]: e.target.value });
  };

  const mapType = (category) => {
    switch (category) {
      case 'MW':
        setType('Mewarnai - TK');
        break;
      case 'ST':
        setType('Story Telling - SD');
        break;
      case 'RV':
        setType('Reels Video - SMP/SMA');
        break;
      case 'DI':
        setType('Desain Infografis - SMP/SMA');
        break;
    }
  };

  // LANGKAH 1: Validasi Order & Email
  const handleCheckOrder = useCallback(
    async (e, manualData = null) => {
      e.preventDefault();

      const dataToVerify = manualData || credentials;
      if (!dataToVerify.orderId || !dataToVerify.email) {
        setError('Email dan Order ID harus diisi.');
        return;
      }

      setLoading(true);
      setError('');
      try {
        const res = await axios.post(
          `${VITE_API_URL}/orders/check-order`,
          dataToVerify,
        );
        setVerifiedData(res.data);
        mapType(res.data.currentSubmission.type);
        // Jika sudah ada submission sebelumnya, isi ke form agar user bisa update
        setSubmission({
          title: res.data.currentSubmission?.title || '',
          link: res.data.currentSubmission?.link || '',
        });
        setStep(2);
      } catch (e) {
        setError(
          'Gagal memvalidasi data. Harap masukkan email dan order ID yang sesuai.',
        );
        console.error(e);
      } finally {
        setLoading(false);
      }
    },
    [credentials, VITE_API_URL],
  );

  // LANGKAH 2: Kirim Karya
  const handleSubmitKarya = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(`${VITE_API_URL}/orders/submit`, {
        orderId: credentials.orderId,
        email: credentials.email,
        title: submission.title,
        link: submission.link,
      });

      alert('Karya berhasil dikumpulkan!');
      setSearchParams({});
      onClose(); // Tutup modal
      setStep(1); // Reset step untuk penggunaan berikutnya
      setSubmission({ title: '', link: '' });
      setCredentials({ orderId: '', email: '' });
    } catch (err) {
      alert(err.response?.data?.message || 'Gagal mengirim karya.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 flex justify-center items-center z-[9999] p-4'>
      <div
        className='absolute inset-0 backdrop-blur-sm bg-black/60 -z-[9999]'
        onClick={() => {
          setSearchParams({});
          onClose();
        }}
      ></div>
      <div className='bg-white rounded-xl w-full max-w-md overflow-hidden shadow-2xl'>
        {/* Header */}
        <div className='p-6 border-b flex justify-between items-center bg-blue-dark text-white'>
          <h3 className='text-xl font-bold'>
            {step === 1 ? 'Validasi Peserta' : 'Pengumpulan Karya'}
          </h3>
          <button
            onClick={onClose}
            className='hover:text-gray-200 transition-colors'
          >
            <i className='mdi mdi-close text-2xl'></i>
          </button>
        </div>

        <div className='p-6'>
          {/* STEP 1: FORM CEK ORDER */}
          {step === 1 && (
            <form onSubmit={handleCheckOrder} className='space-y-4'>
              <p className='text-sm text-gray-600 mb-4'>
                Masukkan Order ID yang Anda terima di email untuk melanjutkan
                pengumpulan karya.
              </p>

              <div>
                <label className='block text-sm font-semibold text-gray-700'>
                  Order ID (Nomor Registrasi)
                </label>
                <input
                  type='text'
                  name='orderId'
                  placeholder='Contoh: REG-RV-1739...'
                  value={credentials.orderId}
                  onChange={handleCredentialChange}
                  className='w-full p-3 border rounded-lg mt-1 focus:ring-2 focus:ring-blue-dark outline-none'
                  required
                />
              </div>

              <div>
                <label className='block text-sm font-semibold text-gray-700'>
                  Email Terdaftar
                </label>
                <input
                  type='email'
                  name='email'
                  placeholder='email@anda.com'
                  value={credentials.email}
                  onChange={handleCredentialChange}
                  className='w-full p-3 border rounded-lg mt-1 focus:ring-2 focus:ring-blue-dark outline-none'
                  required
                />
              </div>

              {error && (
                <p className='text-red-500 text-sm font-medium'>{error}</p>
              )}

              <button
                type='submit'
                disabled={loading}
                className='w-full bg-blue-dark text-white py-3 rounded-lg font-bold hover:bg-opacity-90 transition-all'
              >
                {loading ? 'Mencari Data...' : 'Verifikasi Pendaftaran'}
              </button>
            </form>
          )}

          {/* STEP 2: FORM INPUT KARYA */}
          {step === 2 && (
            <form onSubmit={handleSubmitKarya} className='space-y-4'>
              <div className='bg-blue-50 p-3 rounded-lg mb-4'>
                <p className='text-sm text-blue-800'>
                  Halo, <strong>{verifiedData?.name}</strong>!<br />
                  {verifiedData?.currentSubmission.submitted_at ? (
                    <>
                      Anda telah mengumpulkan karya pada{' '}
                      {new Date(
                        verifiedData?.currentSubmission.submitted_at,
                      ).toLocaleDateString('id-ID', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric',
                      })}
                      . Anda dapat melengkapi karya Anda sebelum pengumpulan
                      karya ditutup.
                    </>
                  ) : (
                    'Silakan lengkapi tautan karya Anda di bawah ini.'
                  )}
                </p>
              </div>

              <div>
                <label className='block text-sm font-semibold text-gray-700'>
                  Judul Karya - {type}
                </label>
                <input
                  type='text'
                  name='title'
                  placeholder='Masukkan judul karya Anda'
                  value={submission.title}
                  onChange={handleSubmissionChange}
                  className='w-full p-3 border rounded-lg mt-1 focus:ring-2 focus:ring-green-500 outline-none'
                  required
                />
              </div>

              <div>
                <label className='block text-sm font-semibold text-gray-700'>
                  Link Karya (
                  {verifiedData?.currentSubmission.type === 'RV'
                    ? 'Instagram'
                    : verifiedData?.currentSubmission.type === 'ST'
                      ? 'YouTube'
                      : 'Google Drive'}
                  )
                </label>
                <input
                  type='url'
                  name='link'
                  placeholder='https://drive.google.com/...'
                  value={submission.link}
                  onChange={handleSubmissionChange}
                  className='w-full p-3 border rounded-lg mt-1 focus:ring-2 focus:ring-green-500 outline-none'
                  required
                />
                <p className='text-[10px] text-gray-500 mt-1 italic'>
                  *Pastikan akses link sudah diatur ke "Anyone with the link"
                </p>
              </div>

              <div className='flex gap-2 pt-2'>
                <button
                  type='button'
                  onClick={() => {
                    setSearchParams({});
                    onClose();
                  }}
                  className='flex-1 py-3 border border-gray-300 rounded-lg font-semibold text-gray-600'
                >
                  Kembali
                </button>
                <button
                  type='submit'
                  disabled={loading}
                  className='flex-[2] bg-blue-dark text-white py-3 rounded-lg font-bold hover:scale-105 transition-all'
                >
                  {loading ? 'Mengirim...' : 'Kumpulkan Karya'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
