import Aos from 'aos';
import React, { useEffect, useState } from 'react';
import BAWModal from './Modal/BAWModal';
import brainImage from '../assets/images/client/baw-illust.png';

export default function BAWRegistration() {
  const eventId = '29bd3506-0a83-11f1-909d-0a002700000b';

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formMessage, setFormMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
const [selectedType, setSelectedType] = useState('');
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

  return (
    <>
      <section id='register' className='py-16 md:py-24 bg-gray-50 dark:bg-gray-900'>
        <div className='container mx-auto' data-aos='fade-up'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8 items-start'>

            {/* LEFT — FAQ */}
            <div className='bg-blue-dark rounded-lg shadow-lg p-8'>
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
            <div className='bg-white rounded-lg shadow-lg p-8 flex flex-col justify-center items-center h-full gap-5'>
              <h3 className='text-2xl font-bold text-dark'>
                  Brain Awareness Week <br /> Competition
                </h3>
  
                <img
                  src={brainImage}
                  alt='Teaching the Healing Brain'
                  className='w-48 h-48 object-cover'
                />
  
                {!submitted ? (
    <>
      {/* Pilihan Kategori Lomba */}
      <div>
        <p className='text-sm font-semibold text-gray-700 mb-3'>Pilih Kategori Lomba:</p>
        <div className='grid md:grid-cols-2 gap-3'>
          {[
            { value: 'MW', label: 'Mewarnai', desc: 'Untuk TK', icon: 'mdi-palette' },
            { value: 'ST', label: 'Story Telling', desc: 'Untuk SD', icon: 'mdi-microphone' },
            { value: 'RV', label: 'Reels Video', desc: 'Untuk SMP & SMA', icon: 'mdi-video' },
            { value: 'DI', label: 'Desain Infografis', desc: 'Untuk SMP & SMA', icon: 'mdi-palette-swatch' },
          ].map((cat) => (
            <button
              key={cat.value}
              type='button'
              onClick={() => setSelectedType(cat.value)}
              className={`flex items-center gap-4 p-4 rounded-lg border-2 text-left transition ${
                selectedType === cat.value
                  ? 'border-primary bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <i className={`mdi ${cat.icon} text-2xl ${selectedType === cat.value ? 'text-primary' : 'text-gray-400'}`}></i>
              <div>
                <p className={`font-semibold text-sm ${selectedType === cat.value ? 'text-primary' : 'text-gray-700'}`}>
                  {cat.label}
                </p>
                <p className='text-xs text-gray-400'>{cat.desc}</p>
              </div>
              {selectedType === cat.value && (
                <i className='mdi mdi-check-circle text-primary ml-auto text-lg'></i>
              )}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={() => setIsModalOpen(true)}
        disabled={!selectedType}
        className={`w-full px-8 py-4 font-semibold rounded-full uppercase tracking-widest transition shadow-md text-center text-white ${
          selectedType
            ? 'bg-amber-500 hover:bg-amber-600'
            : 'bg-gray-300 cursor-not-allowed'
        }`}
      >
        Mulai Perjalanan Ini
      </button>
                  </>
  ) : (
    <div className='w-full text-center bg-green-50 border border-green-200 rounded-lg p-6'>
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
        initialType={selectedType} 
      />
    </>
  );
}