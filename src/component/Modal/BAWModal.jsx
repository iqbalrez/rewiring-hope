import React, { useEffect, useState } from 'react';
import axios from 'axios';

const INITIAL_FORM = {
  // Step 1 — Data Diri
  name: '',
  age: '',
  level: '',
  school: '',
  village: '',
  parentName: '',
  email: '',
  phone: '',
  type: '',

  // Step 2 — Kuesioner
  prevActivity: [],
  learningDifficulty: '',
  whenSadAngry: '',
  whyJoin: '',

  // Step 3 — Refleksi
  whenFail: '',
  wantToChange: '',
  shareToFriend: '',
  afterActivity: '',
  helpOthers: '',
  whyNeed: '',

  // Step 4 — Persetujuan
  agree: false,
};

const STEPS = ['Data Diri', 'Pengalaman Belajar', 'Refleksi Diri', 'Persetujuan'];

const LEVEL_OPTIONS = {
  MW: [{ group: 'TK', options: [['TK', 'TK']] }],
  ST: [
    {
      group: 'SD',
      options: [['SD1','SD Kelas 1'],['SD2','SD Kelas 2'],['SD3','SD Kelas 3'],['SD4','SD Kelas 4'],['SD5','SD Kelas 5'],['SD6','SD Kelas 6']],
    },
  ],
  RV: [
    {
      group: 'SMP',
      options: [['SMP7','SMP Kelas 7'],['SMP8','SMP Kelas 8'],['SMP9','SMP Kelas 9']],
    },
    {
      group: 'SMA',
      options: [['SMA10','SMA Kelas 10'],['SMA11','SMA Kelas 11'],['SMA12','SMA Kelas 12']],
    },
  ],
  DI: [
    {
      group: 'SMP',
      options: [['SMP7','SMP Kelas 7'],['SMP8','SMP Kelas 8'],['SMP9','SMP Kelas 9']],
    },
    {
      group: 'SMA',
      options: [['SMA10','SMA Kelas 10'],['SMA11','SMA Kelas 11'],['SMA12','SMA Kelas 12']],
    },
  ],
};

export default function BAWModal({ isOpen, onClose, setFormMessage, setSubmitted, eventId, initialType }) {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const VITE_API_URL = import.meta.env.VITE_API_URL;

  const set = (field, value) => setFormData((prev) => ({ ...prev, [field]: value }));

  useEffect(() => {
    setFormData((prev) => ({ ...prev, type: initialType, level: '' }));
  }, [initialType]);

  const toggleCheckbox = (field, value) => {
    setFormData((prev) => {
      const arr = prev[field];
      return {
        ...prev,
        [field]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value],
      };
    });
  };

  const inputClass = 'w-full p-2 border rounded-md mt-1 text-sm';
  const labelClass = 'block text-sm font-medium mt-4 mb-1';

  const handleNext = (e) => {
    e.preventDefault();
    setStep((s) => s + 1);
  };

  const handleBack = () => setStep((s) => s - 1);

  const handleClose = () => {
    setFormData(INITIAL_FORM);
    setStep(0);
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${VITE_API_URL}/orders/register`, {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        eventId,
        category: formData.type,
        submissionData: {
          personal_info: {
            name: formData.name,
            age: formData.age,
            email: formData.email,
            phone: formData.phone,
            institution: formData.school,
            level: formData.level,
            type: formData.type,
          },
          submission: {
            type: formData.type,
            title: '',
            link: '',
          },
          baw_form_answer: {
            village: formData.village,
            parent_name: formData.parentName,
            prev_activity: formData.prevActivity,
            learning_difficulty: formData.learningDifficulty,
            when_sad_angry: formData.whenSadAngry,
            why_join: formData.whyJoin,
            when_fail: formData.whenFail,
            want_to_change: formData.wantToChange,
            share_to_friend: formData.shareToFriend,
            after_activity: formData.afterActivity,
            help_others: formData.helpOthers,
            why_need: formData.whyNeed,
          },
        },
      });

      setFormMessage('Pendaftaran berhasil dikirim! Mohon cek email Anda untuk informasi lebih lanjut.');
      setSubmitted(true);
      handleClose();
    } catch (err) {
      alert(err.response?.data?.message || 'Gagal mengirim pendaftaran.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const levelOptions = LEVEL_OPTIONS[formData.type] || [];

  return (
    <div className='fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-4'>
      <div className='bg-white rounded-xl w-full max-w-lg mt-20 max-h-[80vh] overflow-auto shadow-2xl'>

        {/* Header */}
        <div className='sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-start z-10'>
          <div>
            <h3 className='text-lg font-bold text-primary leading-tight'>
              Formulir Pendaftaran<br />
              <span className='text-sm font-normal text-gray-500'>Brain Awareness Week — Kisah Otak yang Tangguh</span>
            </h3>
            <div className='bg-blue-50 mt-2 border border-blue-200 rounded-lg p-3 text-sm text-primary font-semibold'>
              Kategori: {
                { MW: 'Mewarnai (TK)', ST: 'Story Telling (SD)', RV: 'Reels Video (SMP & SMA)', DI: 'Desain Infografis (SMP & SMA)' }[formData.type]
              }
            </div>
          </div>
          <button onClick={handleClose} className='p-1 rounded hover:bg-gray-100 ml-4'>
            <i className='mdi mdi-close text-lg'></i>
          </button>
        </div>

        {/* Step indicator */}
        <div className='px-6 pt-4'>
          <div className='flex items-center gap-1'>
            {STEPS.map((label, i) => (
              <React.Fragment key={i}>
                <div className={`flex items-center gap-1 ${i <= step ? 'text-primary' : 'text-gray-300'}`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border-2 ${i < step ? 'bg-primary border-primary text-white' : i === step ? 'border-primary text-primary' : 'border-gray-300 text-gray-300'}`}>
                    {i < step ? <i className='mdi mdi-check text-xs'></i> : i + 1}
                  </div>
                  <span className='text-xs hidden sm:inline'>{label}</span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className={`flex-1 h-0.5 ${i < step ? 'bg-primary' : 'bg-gray-200'}`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className='px-6 pb-6 pt-4'>

          {/* ── STEP 0: Data Diri ── */}
          {step === 0 && (
            <form onSubmit={handleNext}>
              <p className='text-sm font-semibold text-gray-700 mb-3'>A. Data Diri</p>

              <label className={labelClass}>Nama Lengkap</label>
              <input type='text' value={formData.name} onChange={(e) => set('name', e.target.value)} className={inputClass} placeholder='Nama lengkap kamu' required />

              <label className={labelClass}>Usia</label>
              <input type='number' value={formData.age} onChange={(e) => set('age', e.target.value)} className={inputClass} placeholder='Usia kamu' min={4} max={20} required />

              <label className={labelClass}>Level</label>
              <select
                value={formData.level}
                onChange={(e) => set('level', e.target.value)}
                className={`${inputClass} h-9`}
                required
              >
                <option value=''>-- Pilih level --</option>
                {levelOptions.map(({ group, options }) => (
                  <optgroup key={group} label={group}>
                    {options.map(([val, label]) => (
                      <option key={val} value={val}>{label}</option>
                    ))}
                  </optgroup>
                ))}
              </select>

              <label className={labelClass}>Nama Sekolah</label>
              <input type='text' value={formData.school} onChange={(e) => set('school', e.target.value)} className={inputClass} placeholder='Nama sekolah kamu' required />

              <label className={labelClass}>Desa / Kecamatan</label>
              <input type='text' value={formData.village} onChange={(e) => set('village', e.target.value)} className={inputClass} placeholder='Desa atau kecamatan tempat tinggal' required />

              <label className={labelClass}>Nama Orang Tua / Wali</label>
              <input type='text' value={formData.parentName} onChange={(e) => set('parentName', e.target.value)} className={inputClass} placeholder='Nama orang tua atau wali' required />

              <label className={labelClass}>Email Aktif</label>
              <input type='email' value={formData.email} onChange={(e) => set('email', e.target.value)} className={inputClass} placeholder='Email aktif orang tua / wali' required />

              <label className={labelClass}>Nomor WhatsApp</label>
              <input type='text' value={formData.phone} onChange={(e) => set('phone', e.target.value)} className={inputClass} placeholder='No. WA aktif' required />

              <button type='submit' className='w-full mt-6 py-3 bg-primary text-white rounded-full font-semibold hover:opacity-90 transition'>
                Lanjut →
              </button>
            </form>
          )}

          {/* ── STEP 1: Pengalaman Belajar ── */}
          {step === 1 && (
            <form onSubmit={handleNext}>
              <p className='text-sm font-semibold text-gray-700 mb-3'>B. Pengalaman Belajar</p>

              <label className={labelClass}>1. Apakah sebelumnya kamu pernah ikut kegiatan tentang:</label>
              {[['brain', 'Otak / sains'], ['mental', 'Kesehatan mental'], ['never', 'Belum pernah sama sekali']].map(([val, label]) => (
                <label key={val} className='flex items-center gap-2 mt-2 text-sm cursor-pointer'>
                  <input
                    type='checkbox'
                    checked={formData.prevActivity.includes(val)}
                    onChange={() => toggleCheckbox('prevActivity', val)}
                    className='accent-primary h-4 w-4'
                  />
                  {label}
                </label>
              ))}

              <label className={labelClass}>2. Seberapa sering kamu merasa kesulitan saat belajar?</label>
              {[['often', 'Sering'], ['sometimes', 'Kadang-kadang'], ['rarely', 'Jarang']].map(([val, label]) => (
                <label key={val} className='flex items-center gap-2 mt-2 text-sm cursor-pointer'>
                  <input
                    type='radio'
                    name='learningDifficulty'
                    value={val}
                    checked={formData.learningDifficulty === val}
                    onChange={() => set('learningDifficulty', val)}
                    className='accent-primary h-4 w-4'
                    required
                  />
                  {label}
                </label>
              ))}

              <label className={labelClass}>3. Saat kamu merasa sedih atau marah, apa yang biasanya kamu lakukan?</label>
              <textarea value={formData.whenSadAngry} onChange={(e) => set('whenSadAngry', e.target.value)} className={inputClass} rows={3} placeholder='Tuliskan jawabanmu...' required />

              <label className={labelClass}>4. Kenapa kamu ingin ikut acara ini?</label>
              <textarea value={formData.whyJoin} onChange={(e) => set('whyJoin', e.target.value)} className={inputClass} rows={3} placeholder='Contoh: Aku ingin belajar tentang…' required />

              <div className='flex gap-3 mt-6'>
                <button type='button' onClick={handleBack} className='flex-1 py-3 border border-gray-300 text-gray-600 rounded-full font-semibold hover:bg-gray-50 transition'>
                  ← Kembali
                </button>
                <button type='submit' className='flex-1 py-3 bg-primary text-white rounded-full font-semibold hover:opacity-90 transition'>
                  Lanjut →
                </button>
              </div>
            </form>
          )}

          {/* ── STEP 2: Refleksi Diri ── */}
          {step === 2 && (
            <form onSubmit={handleNext}>
              <p className='text-sm font-semibold text-gray-700 mb-3'>C. Refleksi Diri</p>

              <label className={labelClass}>5. Saat kamu gagal atau tidak bisa sesuatu, biasanya kamu:</label>
              {[['give_up', 'Langsung menyerah'], ['try_again', 'Coba lagi sebentar'], ['keep_trying', 'Terus mencoba sampai bisa']].map(([val, label]) => (
                <label key={val} className='flex items-center gap-2 mt-2 text-sm cursor-pointer'>
                  <input
                    type='radio'
                    name='whenFail'
                    value={val}
                    checked={formData.whenFail === val}
                    onChange={() => set('whenFail', val)}
                    className='accent-primary h-4 w-4'
                    required
                  />
                  {label}
                </label>
              ))}

              <label className={labelClass}>6. Aku ingin berubah dalam hal…</label>
              <textarea value={formData.wantToChange} onChange={(e) => set('wantToChange', e.target.value)} className={inputClass} rows={2} placeholder='Tuliskan jawabanmu...' required />

              <label className={labelClass}>7. Setelah mengikuti kegiatan ini, apa yang ingin kamu bagikan ke temanmu?</label>
              <textarea value={formData.shareToFriend} onChange={(e) => set('shareToFriend', e.target.value)} className={inputClass} rows={2} placeholder='Tuliskan jawabanmu...' required />

              <label className={labelClass}>8. Jika kamu terpilih menjadi peserta, apa yang akan kamu lakukan setelah kegiatan ini?</label>
              <textarea value={formData.afterActivity} onChange={(e) => set('afterActivity', e.target.value)} className={inputClass} rows={2} placeholder='Tuliskan jawabanmu...' required />

              <label className={labelClass}>9. Menurut kamu, bagaimana cara kamu bisa membantu orang lain setelah belajar di acara ini?</label>
              <textarea value={formData.helpOthers} onChange={(e) => set('helpOthers', e.target.value)} className={inputClass} rows={2} placeholder='Tuliskan jawabanmu...' required />

              <label className={labelClass}>10. Menurut kamu, kenapa kamu perlu ikut kegiatan ini?</label>
              <textarea value={formData.whyNeed} onChange={(e) => set('whyNeed', e.target.value)} className={inputClass} rows={2} placeholder='Tuliskan jawabanmu...' required />

              <div className='flex gap-3 mt-6'>
                <button type='button' onClick={handleBack} className='flex-1 py-3 border border-gray-300 text-gray-600 rounded-full font-semibold hover:bg-gray-50 transition'>
                  ← Kembali
                </button>
                <button type='submit' className='flex-1 py-3 bg-primary text-white rounded-full font-semibold hover:opacity-90 transition'>
                  Lanjut →
                </button>
              </div>
            </form>
          )}

          {/* ── STEP 3: Persetujuan ── */}
          {step === 3 && (
            <form onSubmit={handleSubmit}>
              <p className='text-sm font-semibold text-gray-700 mb-4'>D. Persetujuan</p>

              <div className='bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-gray-700 space-y-2 mb-5'>
                <p className='font-semibold text-primary'>Saya memahami bahwa:</p>
                <ul className='space-y-1 list-none'>
                  <li className='flex items-center gap-2'><i className='mdi mdi-check-circle text-primary'></i> Kegiatan ini gratis</li>
                  <li className='flex items-center gap-2'><i className='mdi mdi-check-circle text-primary'></i> Peserta terbatas</li>
                  <li className='flex items-center gap-2'><i className='mdi mdi-check-circle text-primary'></i> Data yang diberikan benar</li>
                </ul>
              </div>

              <div className='bg-gray-50 rounded-lg p-4 text-sm text-gray-600 space-y-1 mb-5'>
                <p className='font-semibold text-gray-700 mb-2'>Ringkasan Pendaftaran</p>
                <p><span className='font-medium'>Nama:</span> {formData.name}</p>
                <p><span className='font-medium'>Level:</span> {formData.level}</p>
                <p><span className='font-medium'>Sekolah:</span> {formData.school}</p>
                <p><span className='font-medium'>Email:</span> {formData.email}</p>
                <p><span className='font-medium'>Kategori:</span> {formData.type}</p>
              </div>

              <label className='flex items-start gap-3 cursor-pointer text-sm'>
                <input
                  type='checkbox'
                  checked={formData.agree}
                  onChange={(e) => set('agree', e.target.checked)}
                  className='mt-1 h-4 w-4 accent-primary'
                  required
                />
                <span>Ya, saya setuju dan memahami ketentuan di atas.</span>
              </label>

              <div className='flex gap-3 mt-6'>
                <button type='button' onClick={handleBack} className='flex-1 py-3 border border-gray-300 text-gray-600 rounded-full font-semibold hover:bg-gray-50 transition'>
                  ← Kembali
                </button>
                <button
                  type='submit'
                  disabled={loading || !formData.agree}
                  className={`flex-1 py-3 rounded-full font-semibold text-white transition ${loading || !formData.agree ? 'bg-gray-300 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`}
                >
                  {loading ? 'Mengirim...' : 'Kirim Pendaftaran'}
                </button>
              </div>
            </form>
          )}

        </div>
      </div>
    </div>
  );
}