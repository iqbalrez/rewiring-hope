import React from 'react';

export default function FullyFundedModal({
  isOpen,
  onClose,
  formData,
  setFormData,
  setFormMessage,
}) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onClose();
    setFormMessage('Sistem pendaftaran sedang dikembangkan.');
  };

  return (
    isOpen && (
      <div className='fixed inset-0 bg-black/20 text-dark bg-opacity-50 flex justify-center items-center z-50'>
        <div className='bg-white p-6 rounded-lg w-4/5 md:w-3/5 max-h-[80%] mt-20 overflow-auto'>
          <div className='w-full flex justify-between'>
            <h3 className='text-2xl font-semibold mb-4 text-primary'>
              Form Seleksi Fully Funded <br /> Teaching the Healing Brain
            </h3>
            <button
              onClick={onClose}
              className='p-2 rounded-md h-fit cursor-pointer hover:bg-primary hover:text-white'
            >
              <i className='mdi mdi-close'></i>
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className='mb-4'>
              <h4 className='font-semibold'>A. Informasi Pribadi</h4>
              <label className='block'>Nama</label>
              <input
                type='text'
                name='name'
                placeholder='Masukkan nama Anda'
                value={formData.name}
                onChange={handleChange}
                className='w-full p-2 border rounded-md mt-2'
                required
              />
              <label className='block mt-4'>Alamat lengkap</label>
              <input
                type='text'
                name='address'
                placeholder='Masukkan alamat Anda'
                value={formData.address}
                onChange={handleChange}
                className='w-full p-2 border rounded-md mt-2'
                required
              />
              <label className='block mt-4'>Usia</label>
              <input
                type='number'
                name='age'
                placeholder='Masukkan usia Anda'
                value={formData.age}
                onChange={handleChange}
                className='w-full p-2 border rounded-md mt-2'
                required
              />
              <label className='block mt-4'>No whatsapp</label>
              <input
                type='text'
                name='waNumber'
                placeholder='Masukkan no. WA aktif'
                value={formData.waNumber}
                onChange={handleChange}
                className='w-full p-2 border rounded-md mt-2'
                required
              />
              <label className='block mt-4'>Kota domisili saat ini</label>
              <input
                type='text'
                name='city'
                placeholder='Masukkan domisili Anda'
                value={formData.city}
                onChange={handleChange}
                className='w-full p-2 border rounded-md mt-2'
                required
              />
              <label className='block mt-4'>
                Pekerjaan atau peran Anda saat ini
              </label>
              <input
                type='text'
                name='currentRole'
                placeholder='Masukkan pekerjaan/peran Anda'
                value={formData.currentRole}
                onChange={handleChange}
                className='w-full p-2 border rounded-md mt-2'
                required
              />
              <label className='block mt-4'>
                Komunitas tempat Anda beraktivitas
              </label>
              <input
                type='text'
                name='community'
                placeholder='Masukkan komunitas Anda'
                value={formData.community}
                onChange={handleChange}
                className='w-full p-2 border rounded-md mt-2'
                required
              />
            </div>

            <div className='mb-4'>
              <h4 className='font-semibold'>B. Empowering Communities</h4>
              <label className='block'>
                Siapa yang paling merasakan dampak positif dari peran Anda dalam
                komunitas? Ceritakan satu situasi spesifik dan apa perubahan
                yang terjadi.
              </label>
              <textarea
                name='impact'
                placeholder='Isi jawaban Anda'
                value={formData.impact}
                onChange={handleChange}
                className='w-full p-2 border rounded-md mt-2'
                required
              />
              <label className='block mt-4'>
                Berapa lama Anda sudah mendampingi atau bekerja bersama
                komunitas tersebut?
              </label>
              <input
                type='text'
                name='duration'
                placeholder='Isi jawaban Anda'
                value={formData.duration}
                onChange={handleChange}
                className='w-full p-2 border rounded-md mt-2'
                required
              />
            </div>

            <div className='mb-4'>
              <h4 className='font-semibold'>C. Equity & Inclusion</h4>
              <label className='block'>
                Ketika menghadapi keterbatasan ekonomi, strategi apa yang
                biasanya Anda gunakan untuk tetap bisa belajar atau mendukung
                komunitas Anda? Berikan contoh nyata.
              </label>
              <textarea
                name='strategy'
                placeholder='Isi jawaban Anda'
                value={formData.strategy}
                onChange={handleChange}
                className='w-full p-2 border rounded-md mt-2'
                required
              />
              <label className='block mt-4'>
                Bagaimana kondisi Anda saat ini, dan tantangan apa yang mungkin
                Anda hadapi untuk dapat mengikuti acara ini?
              </label>
              <textarea
                name='challenges'
                placeholder='Isi jawaban Anda'
                value={formData.challenges}
                onChange={handleChange}
                className='w-full p-2 border rounded-md mt-2'
                required
              />
            </div>

            <div className='mb-4'>
              <h4 className='font-semibold'>D. Respect & Accountability</h4>
              <label className='block'>
                Ceritakan tantangan yang Anda hadapi saat mendampingi komunitas
                atau individu, dan apa tanggung jawab yang tetap Anda jalankan
                meski dalam kondisi sulit.
              </label>
              <textarea
                name='challenges'
                placeholder='Isi jawaban Anda'
                value={formData.challenges}
                onChange={handleChange}
                className='w-full p-2 border rounded-md mt-2'
                required
              />
            </div>

            <div className='mb-4'>
              <h4 className='font-semibold'>
                E. Empowerment & Measurable Impact
              </h4>
              <label className='block'>
                Mengapa kesempatan fully funded ini penting bagi Anda, baik
                untuk pengembangan pribadi maupun profesional?
              </label>
              <textarea
                name='importance'
                placeholder='Isi jawaban Anda'
                value={formData.importance}
                onChange={handleChange}
                className='w-full p-2 border rounded-md mt-2'
                required
              />
              <label className='block mt-4'>
                Setelah mengikuti acara ini, kontribusi apa yang ingin Anda
                berikan bagi diri Anda, siswa, sekolah, atau komunitas di
                sekitar Anda?
              </label>
              <textarea
                name='contribution'
                placeholder='Isi jawaban Anda'
                value={formData.contribution}
                onChange={handleChange}
                className='w-full p-2 border rounded-md mt-2'
                required
              />
              <label className='block mt-4'>
                Apa yang biasanya Anda lakukan dalam rangka bekerja sama dengan
                guru, orang tua, atau komunitas untuk mendukung kesejahteraan
                belajar dan kesehatan mental?
              </label>
              <textarea
                name='collaboration'
                placeholder='Isi jawaban Anda'
                value={formData.collaboration}
                onChange={handleChange}
                className='w-full p-2 border rounded-md mt-2'
                required
              />
              <label className='block mt-4'>
                Jika Anda dapat mengubah satu hal kecil dalam lingkungan Anda
                saat ini, perubahan apa yang ingin Anda lakukan dan mengapa hal
                itu penting bagi Anda?
              </label>
              <textarea
                name='change'
                placeholder='Isi jawaban Anda'
                value={formData.change}
                onChange={handleChange}
                className='w-full p-2 border rounded-md mt-2'
                required
              />
            </div>

            <div className='text-center flex justify-center mt-6'>
              <button
                type='submit'
                className='bg-green-600 text-white w-full py-3 rounded-md'
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
}
