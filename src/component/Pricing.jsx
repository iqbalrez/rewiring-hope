import React from 'react';

export default function Pricing({ setType }) {
  const pricing = [
    {
      id: 1,
      key: 'MHS',
      title: 'Mahasiswa',
      price: 250000,
      for: 'Kategori Mahasiswa S1 & S2',
      features: [
        'Complete documentation',
        'Working materials in Figma',
        '100GB cloud storage',
        '500 team members',
      ],
    },
    {
      id: 2,
      key: 'OTGR',
      title: 'Guru/Orang Tua',
      price: 500000,
      for: 'Kategori Guru & Orang Tua',
    },
    {
      id: 3,
      key: 'PRO',
      title: 'Professional',
      price: 750000,
      for: 'Kategori Dokter, Psikolog, Mahasiswa S3, Psikiater',
    },
    {
      id: 4,
      key: 'FF',
      title: 'Fully Funded',
      price: 0,
      for: '25 Kuota Gratis untuk Guru maupun Orang Tua Berdampak',
    },
  ];

  return (
    <>
      {/* Start */}

      <section className='relative md:py-24 py-16' id='pricing'>
        <div className='container'>
          <div className='grid grid-cols-1 pb-8 text-center'>
            <h6 className='text-primary text-base font-medium uppercase mb-2'>
              TEACHING THE HEALING BRAIN: 27 JUNI 2026
            </h6>
            <h3 className='mb-4 md:text-2xl text-xl font-medium dark:text-white'>
              Daftarkan Diri Anda
            </h3>
          </div>

          <div className='flex flex-wrap'>
            {pricing.map((item, key) => (
              <div
                className='w-full md:w-1/2 lg:w-1/4 px-0 md:px-3 mt-8'
                key={key}
              >
                <div className='h-auto flex flex-col pt-8 pb-8 bg-zinc-50 hover:bg-white dark:bg-gray-800 dark:hover:bg-slate-900 rounded-md shadow-sm shadow-slate-200 dark:shadow-slate-700 transition duration-500'>
                  <div className='px-8 pb-8'>
                    <h3 className='mb-3 text-lg md:text-xl font-medium dark:text-white'>
                      {item.title}
                    </h3>
                    <div className='mb-3 dark:text-white/70'>
                      <span className='relative text-2xl'>Rp</span>
                      <span className='text-2xl font-semibold dark:text-white'>
                        {item.price == 0
                          ? 'Gratis'
                          : item.price.toLocaleString('id-ID')}
                      </span>
                    </div>
                    <p className='mb-3 text-slate-430 dark:text-slate-300'>
                      {item.for}
                    </p>
                    <a
                      href='#register'
                      onClick={() => setType && setType(item.key)}
                      className='py-2 px-5 inline-block font-normal tracking-wide border align-middle duration-500 text-base text-center bg-primary hover:bg-primary-dark border-primary hover:border-primary-dark text-white rounded-md w-full'
                    >
                      Daftar Sekarang
                    </a>
                  </div>
                  {/* <div className='border-b border-slate-200 dark:border-slate-700'></div> */}
                  {/* <ul className='self-start px-8 pt-8'>
                    {item.features.map((subitem, index) => (
                      <li
                        className='flex items-center my-1 text-slate-400 dark:text-slate-300'
                        key={index}
                      >
                        <i className='uil uil-check-circle text-lg text-green-600 me-1'></i>
                        <span>{subitem}</span>
                      </li>
                    ))}
                  </ul> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
