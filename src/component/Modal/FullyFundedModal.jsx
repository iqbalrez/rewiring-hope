import React, { useState } from 'react';
import axios from 'axios';

const INITIAL_FORM = {
  name: '', email: '', waNumber: '', type: 'MHS',
  institution: '', address: '', age: '', city: '',
  currentRole: '', community: '',
  impact: '', duration: '',
  strategy: '', condition: '',
  challenge: '',
  importance: '', contribution: '', collaboration: '', change: '',
};

const Field = ({ label, children }) => (
  <div className='mt-4'>
    <label className='block'>{label}</label>
    {children}
  </div>
);

export default function FullyFundedModal({ isOpen, onClose, setFormMessage, setSubmitted, eventId }) {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [loading, setLoading] = useState(false);
  const VITE_API_URL = import.meta.env.VITE_API_URL;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const inputClass = 'w-full p-2 border rounded-md mt-2';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${VITE_API_URL}/orders/register`, {
        name: formData.name,
        email: formData.email,
        phone: formData.waNumber,
        eventId,
        category: formData.type,
        submissionData: {
          personal_info: {
            name: formData.name,
            email: formData.email,
            phone: formData.waNumber,
            institution: formData.institution,
            address: formData.address,
            age: formData.age,
            city: formData.city,
            currentRole: formData.currentRole,
            community: formData.community,
            type: formData.type,
          },
          assesment: {
            section_b: { impact: formData.impact, duration: formData.duration },
            section_c: { strategy: formData.strategy, condition: formData.condition },
            section_d: { challenge: formData.challenge },
            section_e: {
              importance: formData.importance,
              contribution: formData.contribution,
              collaboration: formData.collaboration,
              change: formData.change,
            },
          },
        },
      });

      setFormMessage('Pendaftaran berhasil dikirim! Mohon cek email Anda untuk informasi lebih lanjut.');
      setSubmitted(true);
      setFormData(INITIAL_FORM);
      onClose();
    } catch (err) {
      alert(err.response?.data?.message || 'Gagal mengirim pendaftaran.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black/20 text-dark bg-opacity-50 flex justify-center items-center z-50'>
      <div className='bg-white p-6 rounded-lg w-4/5 md:w-3/5 max-h-[80%] mt-20 overflow-auto'>
        <div className='w-full flex justify-between'>
          <h3 className='text-2xl font-semibold mb-4 text-primary'>
            Formulir Pendaftaran <br /> Teaching the Healing Brain
          </h3>
          <button onClick={onClose} className='p-2 rounded-md h-fit cursor-pointer hover:bg-primary hover:text-white'>
            <i className='mdi mdi-close'></i>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* A. Informasi Pribadi */}
          <h4 className='font-semibold'>A. Informasi Pribadi</h4>

          <Field label='Nama'>
            <input type='text' name='name' placeholder='Masukkan nama Anda' value={formData.name} onChange={handleChange} className={inputClass} required />
          </Field>
          <Field label='Email'>
            <input type='email' name='email' placeholder='Masukkan email aktif' value={formData.email} onChange={handleChange} className={inputClass} required />
          </Field>
          <Field label='No. WhatsApp'>
            <input type='text' name='waNumber' placeholder='Masukkan no. WA aktif' value={formData.waNumber} onChange={handleChange} className={inputClass} required />
          </Field>
          <Field label='Kategori'>
            <select name='type' value={formData.type} onChange={handleChange} className={`${inputClass} h-10`} required>
              <option value='MHS'>Mahasiswa</option>
              <option value='OTGR'>Guru &amp; Orang Tua</option>
              <option value='PRO'>Profesional</option>
            </select>
          </Field>
          <Field label='Institusi'>
            <input type='text' name='institution' placeholder='Masukkan asal institusi' value={formData.institution} onChange={handleChange} className={inputClass} required />
          </Field>
          <Field label='Alamat lengkap'>
            <input type='text' name='address' placeholder='Masukkan alamat Anda' value={formData.address} onChange={handleChange} className={inputClass} required />
          </Field>
          <Field label='Usia'>
            <input type='number' name='age' placeholder='Masukkan usia Anda' value={formData.age} onChange={handleChange} className={inputClass} required />
          </Field>
          <Field label='Kota domisili saat ini'>
            <input type='text' name='city' placeholder='Masukkan domisili Anda' value={formData.city} onChange={handleChange} className={inputClass} required />
          </Field>
          <Field label='Pekerjaan atau peran Anda saat ini'>
            <input type='text' name='currentRole' placeholder='Masukkan pekerjaan/peran Anda' value={formData.currentRole} onChange={handleChange} className={inputClass} required />
          </Field>
          <Field label='Komunitas tempat Anda beraktivitas'>
            <input type='text' name='community' placeholder='Masukkan komunitas Anda' value={formData.community} onChange={handleChange} className={inputClass} required />
          </Field>

          {/* B. Empowering Communities */}
          <h4 className='font-semibold mt-6'>B. Empowering Communities</h4>
          <Field label='Siapa yang paling merasakan dampak positif dari peran Anda dalam komunitas? Ceritakan satu situasi spesifik dan apa perubahan yang terjadi.'>
            <textarea name='impact' placeholder='Isi jawaban Anda' value={formData.impact} onChange={handleChange} className={inputClass} required />
          </Field>
          <Field label='Berapa lama Anda sudah mendampingi atau bekerja bersama komunitas tersebut?'>
            <input type='text' name='duration' placeholder='Isi jawaban Anda' value={formData.duration} onChange={handleChange} className={inputClass} required />
          </Field>

          {/* C. Equity & Inclusion */}
          <h4 className='font-semibold mt-6'>C. Equity &amp; Inclusion</h4>
          <Field label='Ketika menghadapi keterbatasan ekonomi, strategi apa yang biasanya Anda gunakan untuk tetap bisa belajar atau mendukung komunitas Anda? Berikan contoh nyata.'>
            <textarea name='strategy' placeholder='Isi jawaban Anda' value={formData.strategy} onChange={handleChange} className={inputClass} required />
          </Field>
          <Field label='Bagaimana kondisi Anda saat ini, dan tantangan apa yang mungkin Anda hadapi untuk dapat mengikuti acara ini?'>
            <textarea name='condition' placeholder='Isi jawaban Anda' value={formData.condition} onChange={handleChange} className={inputClass} required />
          </Field>

          {/* D. Respect & Accountability */}
          <h4 className='font-semibold mt-6'>D. Respect &amp; Accountability</h4>
          <Field label='Ceritakan tantangan yang Anda hadapi saat mendampingi komunitas atau individu, dan apa tanggung jawab yang tetap Anda jalankan meski dalam kondisi sulit.'>
            <textarea name='challenge' placeholder='Isi jawaban Anda' value={formData.challenge} onChange={handleChange} className={inputClass} required />
          </Field>

          {/* E. Empowerment & Measurable Impact */}
          <h4 className='font-semibold mt-6'>E. Empowerment &amp; Measurable Impact</h4>
          <Field label='Mengapa kesempatan fully funded ini penting bagi Anda, baik untuk pengembangan pribadi maupun profesional?'>
            <textarea name='importance' placeholder='Isi jawaban Anda' value={formData.importance} onChange={handleChange} className={inputClass} required />
          </Field>
          <Field label='Setelah mengikuti acara ini, kontribusi apa yang ingin Anda berikan bagi diri Anda, siswa, sekolah, atau komunitas di sekitar Anda?'>
            <textarea name='contribution' placeholder='Isi jawaban Anda' value={formData.contribution} onChange={handleChange} className={inputClass} required />
          </Field>
          <Field label='Apa yang biasanya Anda lakukan dalam rangka bekerja sama dengan guru, orang tua, atau komunitas untuk mendukung kesejahteraan belajar dan kesehatan mental?'>
            <textarea name='collaboration' placeholder='Isi jawaban Anda' value={formData.collaboration} onChange={handleChange} className={inputClass} required />
          </Field>
          <Field label='Jika Anda dapat mengubah satu hal kecil dalam lingkungan Anda saat ini, perubahan apa yang ingin Anda lakukan dan mengapa hal itu penting bagi Anda?'>
            <textarea name='change' placeholder='Isi jawaban Anda' value={formData.change} onChange={handleChange} className={inputClass} required />
          </Field>

          <div className='text-center flex justify-center mt-6'>
            <button
              type='submit'
              disabled={loading}
              className={`w-full py-3 rounded-md text-white ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`}
            >
              {loading ? 'Submitting...' : 'Submit Aplikasi'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}