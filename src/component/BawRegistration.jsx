import Aos from 'aos';
import React, { useEffect, useState } from 'react';
import BAWModal from './Modal/BAWModal';
import brainImage from '../assets/images/client/baw-illust.png';

const INITIAL_INLINE = {
  name: '',
  age: '',
  level: '',
  school: '',
  village: '',
  parentName: '',
  email: '',
  phone: '',
};

export default function BAWRegistration() {
  const eventId = '29bd3506-0a83-11f1-909d-0a002700000b';

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formMessage, setFormMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [inlineData, setInlineData] = useState(INITIAL_INLINE);

  const setField = (field, value) =>
    setInlineData((prev) => ({ ...prev, [field]: value }));

  const faq = [
    {
      question: 'Siapa yang bisa ikut kegiatan ini?',
      answer: 'Kegiatan ini terbuka untuk siswa SD, SMP, dan SMA di wilayah Yogyakarta dan sekitarnya.',
    },
    {
      question: 'Apa tujuan dari kegiatan Kisah Otak yang Tangguh?',
      answer: 'Kegiatan ini bertujuan membantu anak memahami cara kerja otak, mengenali emosi, serta membangun kepercayaan diri dan resiliensi melalui pengalaman belajar yang menyenangkan.',
    },
    {
      question: 'Apa manfaat yang akan didapatkan anak?',
      answer: 'Anak akan belajar fokus, kerja sama, mengenal perasaan, serta mengekspresikan diri secara sehat melalui aktivitas berbasis neuroscience dan seni.',
    },
    {
      question: 'Apakah kegiatan ini aman untuk anak?',
      answer: 'Ya. Seluruh kegiatan dirancang dalam lingkungan yang aman, didampingi oleh fasilitator yang berpengalaman.',
    },
    {
      question: 'Apakah anak harus memiliki kemampuan khusus untuk ikut?',
      answer: 'Tidak. Kegiatan ini terbuka untuk semua anak, tanpa persyaratan kemampuan khusus.',
    },
  ];

  useEffect(() => {
    Aos.init();
  }, []);

  const inputClass = 'w-full p-2 border rounded-md mt-1 text-sm';
  const labelClass = 'block text-sm font-medium mt-3 mb-1 text-gray-700';

  const handleOpenModal = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  return (
    <>
      <section id='register' className='py-16 md:py-24 bg-gray-50 dark:bg-gray-900'>
        <div className='container mx-auto' data-aos='fade-up'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8 items-start'>

            {/* LEFT — FAQ */}
            <div className='bg-blue-dark rounded-lg shadow-lg p-8 h-full'>
              <h2 className='text-2xl font-bold text-amber-500 italic mb-6'>
                Pertanyaan yang Sering Ditanyakan
              </h2>
              <ul className='space-y-4 text-slate-100'>
                {faq.map((item, i) => (
                  <li key={i}>
                    <p className='font-semibold text-sm'>{item.question}</p>
                    <p className='text-sm mt-1 text-slate-300'>{item.answer}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* RIGHT — CTA */}
            <div className='bg-white rounded-lg shadow-lg p-8 flex flex-col h-full '>
              <h3 className='text-2xl font-bold text-blue-dark'>
                Daftar Sekarang
              </h3>
              <p className='text-blue-dark'>Isi formulir ini untuk bergabung dalam Kisah Otak Yang Tangguh.</p>

              {!submitted ? (
                <form onSubmit={handleOpenModal} className='w-full flex flex-col gap-1'>
                  <label className={labelClass}>Nama Lengkap</label>
                  <input
                    type='text'
                    value={inlineData.name}
                    onChange={(e) => setField('name', e.target.value)}
                    className={inputClass}
                    placeholder='Nama lengkap kamu'
                    required
                  />

                  <label className={labelClass}>Usia</label>
                  <input
                    type='number'
                    value={inlineData.age}
                    onChange={(e) => setField('age', e.target.value)}
                    className={inputClass}
                    placeholder='Usia kamu'
                    min={4}
                    max={20}
                    required
                  />

                  <label className={labelClass}>Kelas</label>
                  <input
                    type='text'
                    value={inlineData.level}
                    onChange={(e) => setField('level', e.target.value)}
                    className={inputClass}
                    placeholder='Contoh: SD Kelas 3, SMP Kelas 8'
                    required
                  />

                  <label className={labelClass}>Nama Sekolah</label>
                  <input
                    type='text'
                    value={inlineData.school}
                    onChange={(e) => setField('school', e.target.value)}
                    className={inputClass}
                    placeholder='Nama sekolah kamu'
                    required
                  />

                  <label className={labelClass}>Desa / Kecamatan</label>
                  <input
                    type='text'
                    value={inlineData.village}
                    onChange={(e) => setField('village', e.target.value)}
                    className={inputClass}
                    placeholder='Desa atau kecamatan tempat tinggal'
                    required
                  />

                  <label className={labelClass}>Nama Orang Tua / Wali</label>
                  <input
                    type='text'
                    value={inlineData.parentName}
                    onChange={(e) => setField('parentName', e.target.value)}
                    className={inputClass}
                    placeholder='Nama orang tua atau wali'
                    required
                  />

                  <label className={labelClass}>Email Aktif</label>
                  <input
                    type='email'
                    value={inlineData.email}
                    onChange={(e) => setField('email', e.target.value)}
                    className={inputClass}
                    placeholder='Email aktif orang tua / wali'
                    required
                  />

                  <label className={labelClass}>Nomor WhatsApp</label>
                  <input
                    type='text'
                    value={inlineData.phone}
                    onChange={(e) => setField('phone', e.target.value)}
                    className={inputClass}
                    placeholder='No. WA aktif'
                    required
                  />

                  <button
                    type='submit'
                    className='w-full mt-5 px-8 py-4 font-semibold rounded-full uppercase tracking-widest transition shadow-md text-center text-white bg-amber-500 hover:bg-amber-600'
                  >
                    Mulai Perjalanan Ini
                  </button>
                </form>
              ) : (
                <div className='w-full h-full flex flex-col items-center justify-center text-center bg-green-50 border border-green-200 rounded-lg p-6'>
                  <i className='mdi mdi-check-circle text-green-500 text-4xl mb-2 block'></i>
                  <h4 className='text-xl font-semibold mb-2 text-gray-700'>{formMessage}</h4>
                  <p className='text-sm text-gray-500'>Mohon menunggu info lebih lanjut.</p>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      <BAWModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        setFormMessage={setFormMessage}
        setSubmitted={setSubmitted}
        eventId={eventId}
        initialType='BAW'
        prefillData={inlineData}
      />
    </>
  );
}