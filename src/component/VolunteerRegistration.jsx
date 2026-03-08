import Aos from 'aos';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function VolunteerRegistration() {
  const VITE_API_URL = import.meta.env.VITE_API_URL;

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [instagramProof, setInstagramProof] = useState(null);
  const [cvPortfolio, setCvPortfolio] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
    occupation: '',
    organization: '',
  });

  const [submissionData, setSubmissionData] = useState({
    q1: '',
    q2: '',
    q3: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmissionChange = (e) => {
    setSubmissionData({ ...submissionData, [e.target.name]: e.target.value });
  };

  const isMainFormValid =
    formData.name &&
    formData.email &&
    formData.address &&
    formData.phone &&
    formData.occupation;

  const handleOpenModal = () => {
    setErrorMsg('');
    if (!isMainFormValid) {
      setErrorMsg('Harap lengkapi semua field yang wajib diisi.');
      return;
    }
    setShowModal(true);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setErrorMsg('');

    try {
      const payload = new FormData();
      Object.entries(formData).forEach(([key, val]) =>
        payload.append(key, val),
      );
      payload.append('submissionData', JSON.stringify(submissionData));
      if (instagramProof) payload.append('instagramProof', instagramProof);
      if (cvPortfolio) payload.append('cvPortfolio', cvPortfolio);

      await axios.post(`${VITE_API_URL}/volunteer/register`, payload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setShowModal(false);
      setSubmitted(true);
    } catch (err) {
      const msg = err.response?.data?.message || 'Gagal memproses pendaftaran';
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
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
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            {/* INFO */}
            <div className='bg-blue-dark rounded-lg shadow-lg p-8 flex flex-col justify-between'>
              <div>
                <h2 className='text-2xl font-bold text-amber-500 mb-4'>
                  Time Commitment
                </h2>
                <h3 className='text-white font-bold text-lg mb-6'>
                  Tanggal penting volunteer
                </h3>

                <div className='space-y-5 text-slate-100'>
                  <div>
                    <p className='font-semibold'>
                      Mini training neuroscience-informed event management
                      (online)
                    </p>
                  </div>

                  <div>
                    <p className='font-semibold mb-2'>Briefing H-2 (online)</p>
                    <ul className='space-y-1 ml-2'>
                      {[
                        '30 Juni 2026 untuk Brain Awareness Week',
                        '2 Juli 2026 untuk Teaching the Healing Brain',
                      ].map((item, i) => (
                        <li key={i} className='flex items-start gap-2'>
                          <i className='mdi mdi-circle-small text-primary text-xl leading-none' />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className='font-semibold mb-2'>
                      Waktu event: 06.30 - 17.00
                    </p>
                    <ul className='space-y-1 ml-2'>
                      {[
                        '2 Juli 2026 untuk Brain Awareness Week',
                        '4 Juli 2026 untuk Teaching the Healing Brain',
                      ].map((item, i) => (
                        <li key={i} className='flex items-start gap-2'>
                          <i className='mdi mdi-circle-small text-primary text-xl leading-none' />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <p className='font-semibold text-white text-center text-md mt-8'>
                "Because everyone deserves to understand their brain."
              </p>
            </div>

            {/* FORM */}
            <div className='bg-white rounded-lg shadow-lg p-8 flex flex-col'>
              <h3 className='text-2xl font-semibold mb-6'>Daftar Volunteer</h3>

              {!submitted ? (
                <div className='space-y-5'>
                  <div>
                    <label className='block font-medium'>
                      Nama Lengkap <span className='text-red-500'>*</span>
                    </label>
                    <input
                      name='name'
                      type='text'
                      value={formData.name}
                      onChange={handleChange}
                      className='w-full p-4 mt-2 border rounded-md'
                      placeholder='Nama lengkap'
                    />
                  </div>

                  <div>
                    <label className='block font-medium'>
                      Domisili <span className='text-red-500'>*</span>
                    </label>
                    <input
                      name='address'
                      type='text'
                      value={formData.address}
                      onChange={handleChange}
                      className='w-full p-4 mt-2 border rounded-md'
                      placeholder='Kota domisili'
                    />
                  </div>

                  <div>
                    <label className='block font-medium'>
                      Nomor WhatsApp <span className='text-red-500'>*</span>
                    </label>
                    <input
                      name='phone'
                      type='tel'
                      value={formData.phone}
                      onChange={handleChange}
                      className='w-full p-4 mt-2 border rounded-md'
                      placeholder='08xxxxxxxxxx'
                    />
                  </div>

                  <div>
                    <label className='block font-medium'>
                      Email <span className='text-red-500'>*</span>
                    </label>
                    <input
                      name='email'
                      type='email'
                      value={formData.email}
                      onChange={handleChange}
                      className='w-full p-4 mt-2 border rounded-md'
                      placeholder='Email aktif'
                    />
                  </div>

                  <div>
                    <label className='block font-medium'>
                      Status <span className='text-red-500'>*</span>
                    </label>
                    <select
                      name='occupation'
                      value={formData.occupation}
                      onChange={handleChange}
                      className='w-full p-4 mt-2 border rounded-md bg-white'
                    >
                      <option value=''>Pilih status</option>
                      <option value='pelajar'>Pelajar</option>
                      <option value='mahasiswa'>Mahasiswa</option>
                      <option value='karyawan'>Karyawan</option>
                    </select>
                  </div>

                  {(formData.occupation === 'pelajar' ||
                    formData.occupation === 'mahasiswa') && (
                    <div>
                      <label className='block font-medium'>Institusi</label>
                      <input
                        name='organization'
                        type='text'
                        value={formData.organization}
                        onChange={handleChange}
                        className='w-full p-4 mt-2 border rounded-md'
                        placeholder='Nama sekolah/universitas'
                      />
                    </div>
                  )}

                  {errorMsg && (
                    <div className='p-3 bg-red-100 text-red-700 text-sm rounded-md'>
                      {errorMsg}
                    </div>
                  )}

                  {/* TOMBOL — disabled */}
                  <button
                    type='button'
                    disabled={true}
                    onClick={handleOpenModal}
                    className='w-full py-3 bg-slate-300 text-white rounded-full '
                  >
                    Pendaftaran Segera Dibuka
                  </button>
                </div>
              ) : (
                <div className='text-gray-600 flex flex-col text-center items-center my-auto'>
                  <i className='mdi mdi-check-circle text-primary text-5xl mb-4' />
                  <h4 className='text-xl font-semibold mb-2'>
                    Pendaftaran Berhasil!
                  </h4>
                  <p>
                    Kami akan menghubungi Anda melalui email. Mohon cek inbox
                    secara berkala.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* MODAL PERTANYAAN */}
      {showModal && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
          <div className='bg-white rounded-xl shadow-2xl w-full max-w-lg mx-4 p-8 max-h-[90vh] overflow-y-auto'>
            <div className='flex justify-between items-center mb-6'>
              <h3 className='text-xl font-semibold'>Pertanyaan Seleksi</h3>
              <button
                onClick={() => setShowModal(false)}
                className='text-gray-400 hover:text-gray-600'
              >
                <i className='mdi mdi-close text-2xl' />
              </button>
            </div>

            <div className='space-y-5'>
              {/* Instagram Proof */}
              <div>
                <label className='block font-medium'>
                  Bukti Follow Instagram <span className='text-red-500'>*</span>
                </label>
                <div className='mt-2 p-4 border-2 border-dashed border-gray-300 rounded-md bg-gray-50'>
                  <input
                    type='file'
                    accept='image/*'
                    onChange={(e) => setInstagramProof(e.target.files[0])}
                    className='w-full'
                  />
                  <p className='text-xs text-gray-500 mt-2'>
                    Upload bukti follow{' '}
                    <a
                      href='https://instagram.com/rewiringhopeindonesia'
                      target='_blank'
                      className='text-blue-600'
                    >
                      @rewiringhopeindonesia
                    </a>
                  </p>
                </div>
              </div>

              {/* CV Portfolio */}
              <div>
                <label className='block font-medium'>
                  CV / Portfolio{' '}
                  <span className='text-gray-400 text-sm'>(opsional)</span>
                </label>
                <div className='mt-2 p-4 border-2 border-dashed border-gray-300 rounded-md bg-gray-50'>
                  <input
                    type='file'
                    accept='.pdf,.doc,.docx,image/*'
                    onChange={(e) => setCvPortfolio(e.target.files[0])}
                    className='w-full'
                  />
                </div>
              </div>

              <div>
                <label className='block font-medium'>
                  Mengapa ingin menjadi volunteer?{' '}
                  <span className='text-red-500'>*</span>
                </label>
                <textarea
                  name='q1'
                  value={submissionData.q1}
                  onChange={handleSubmissionChange}
                  className='w-full p-4 mt-2 border rounded-md'
                  rows={3}
                  placeholder='Ceritakan motivasimu...'
                />
              </div>

              <div>
                <label className='block font-medium'>
                  Pengalaman organisasi/volunteering sebelumnya
                </label>
                <textarea
                  name='q2'
                  value={submissionData.q2}
                  onChange={handleSubmissionChange}
                  className='w-full p-4 mt-2 border rounded-md'
                  rows={3}
                  placeholder='Opsional'
                />
              </div>

              <div>
                <label className='block font-medium'>
                  Divisi yang diminati
                </label>
                <input
                  name='q3'
                  type='text'
                  value={submissionData.q3}
                  onChange={handleSubmissionChange}
                  className='w-full p-4 mt-2 border rounded-md'
                  placeholder='Participant Support, Logistics, dll'
                />
              </div>

              {errorMsg && (
                <div className='p-3 bg-red-100 text-red-700 text-sm rounded-md'>
                  {errorMsg}
                </div>
              )}

              <div className='flex gap-3 pt-2'>
                <button
                  onClick={() => setShowModal(false)}
                  className='flex-1 py-3 border border-gray-300 rounded-full text-gray-600 hover:bg-gray-50'
                >
                  Batal
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className={`flex-1 py-3 text-white rounded-full transition ${
                    loading
                      ? 'bg-slate-300 cursor-not-allowed'
                      : 'bg-primary hover:bg-primary/90'
                  }`}
                >
                  {loading ? 'Memproses...' : 'Kirim Pendaftaran'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
