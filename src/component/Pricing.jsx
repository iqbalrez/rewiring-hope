import React from 'react';

export default function Pricing({ setType }) {
  const pricing = [
    {
      id: 1,
      key: 'MHS',
      title: 'Mahasiswa',
      price: 150000,
      for: 'Kategori Mahasiswa (S1/S2)',
    },
    {
      id: 2,
      key: 'OTGR',
      title: 'Guru/Orang Tua',
      price: 350000,
      for: 'Kategori Guru, Konselor Sekolah, Fasilitator Komunitas, Orang tua',
    },
    {
      id: 3,
      key: 'PRO',
      title: 'Professional',
      price: 500000,
      for: 'Kategori Psikolog, Dokter, Mahasiswa S3, Peneliti, Akademisi',
    },
    {
      id: 4,
      key: 'FF',
      title: 'Fully Funded',
      price: 0,
      for: 'Guru, orang tua, mahasiswa, dan fasilitator komunitas',
    },
  ];

  return (
    <>
      {/* Start */}

      <section className='relative md:py-24 py-16' id='pricing'>
        <div className='container'>
          <div className='grid grid-cols-1 pb-8 text-center'>
            <h6 className='text-primary text-base font-medium uppercase mb-2'>
              TEACHING THE HEALING BRAIN: 4 JULI 2026
            </h6>
            <h3 className='mb-4 md:text-2xl text-xl font-medium dark:text-white'>
              Daftarkan Diri Anda
            </h3>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 h-full'>
            {pricing.map((item, key) => (
              <div
                className='p-8 h-full flex flex-col justify-between bg-zinc-50 hover:bg-white dark:bg-gray-800 dark:hover:bg-slate-900 rounded-md shadow-sm shadow-slate-200 dark:shadow-slate-700 transition duration-500'
                key={key}
              >
                <div className='h-full flex flex-col text-center'>
                  <h3 className='text-lg md:text-xl font-medium dark:text-white '>
                    {item.title}
                  </h3>
                  {item.key == 'FF' && (
                    <p className='mt-1 text-xs text-dark italic'>
                      Pendaftaran sampai <br />
                      tanggal 15 Maret 2026
                    </p>
                  )}
                  <div className='my-3 dark:text-white/70'>
                    <span className='relative text-2xl'>Rp</span>
                    <span className='text-2xl font-semibold dark:text-white'>
                      {item.price.toLocaleString('id-ID')}
                    </span>
                    {item.key == 'FF' && (
                      <p className='text-xs'>
                        (termasuk akomodasi, pendaftaran, dan transportasi)
                      </p>
                    )}
                  </div>
                  {item.key == 'FF' ? (
                    <>
                      <p className='font-bold text-lg'>25 Kuota</p>
                      <p className='mb-3 text-slate-430 dark:text-slate-300'>
                        Prioritas: <span className='font-bold'>{item.for}</span>
                      </p>
                    </>
                  ) : (
                    <p className='mb-3 text-slate-430 dark:text-slate-300'>
                      {item.for}
                    </p>
                  )}
                </div>
                <a
                  href='#register'
                  onClick={() => setType && setType(item.key)}
                  className='py-2 px-5 inline-block font-normal tracking-wide border align-middle duration-500 text-base text-center bg-primary hover:bg-primary-dark border-primary hover:border-primary-dark text-white rounded-md w-full'
                >
                  Daftar Sekarang
                </a>
              </div>
            ))}
          </div>
          <p className='text-center text-sm text-dark font-semibold italic mt-4'>
            Penetapan harga tiket dilakukan untuk menjaga keberlanjutan acara
            serta membuka akses bagi peserta dari berbagai latar belakang.
            <br /> Kami percaya setiap peserta dapat memilih kategori tiket yang
            paling sesuai dengan kondisi masing-masing.
          </p>
        </div>
      </section>
    </>
  );
}
