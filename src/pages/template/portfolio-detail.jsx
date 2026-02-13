import React from 'react';
import Navbar from '../../component/navbar';
import GetInTouch from '../../component/template/GetInTouch';
import image1 from '../../assets/images/portfolio/1.jpg';
import image2 from '../../assets/images/portfolio/2.jpg';
import image3 from '../../assets/images/portfolio/3.jpg';
import Footer from '../../component/Footer';
import Switcher from '../../component/Switcher';

export default function PortfolioDetail() {
  return (
    <>
      <Navbar />
      <section className="py-28 w-full table relative bg-[url('../../assets/images/bg/auth.jpg')] bg-top bg-no-repeat">
        <div className='absolute inset-0 bg-slate-950/80'></div>

        <div className='container'>
          <div className='grid grid-cols-1 pb-8 text-center mt-10'>
            <h3 className='mb-3 text-3xl leading-normal font-medium text-white'>
              New Trends in SEO
            </h3>

            <ul className='list-none'>
              <li className='inline text-white/60 me-2'>
                {' '}
                <span className='text-white'>Client :</span> Calvin Carlo
              </li>
              <li className='inline text-white/60'>
                {' '}
                <span className='text-white'>Date :</span> 5th May, 2024
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className='relative md:py-24 py-16'>
        <div className='container md:pb-24 pb-16'>
          <div className='grid md:grid-cols-12 grid-cols-1 gap-[30px]'>
            <div className='lg:col-span-5 md:col-span-6'>
              <div className='grid grid-cols-1 gap-[30px]'>
                <img src={image1} className='rounded-md' alt='' />
                <img src={image2} className='rounded-md' alt='' />
                <img src={image3} className='rounded-md' alt='' />
              </div>
            </div>

            <div className='lg:col-span-7 md:col-span-6'>
              <div className='sticky top-20'>
                <div className='grid lg:grid-cols-12 grid-cols-1 gap-[30px]'>
                  <div className='lg:col-span-12'>
                    <div className='work-details'>
                      <h4 className='text-xl font-medium mb-3 border-b border-gray-100 dark:border-gray-700 pb-3'>
                        Project Detail :
                      </h4>
                      <p className='text-slate-400'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Suscipit totam atque dignissimos porro, exercitationem,
                        neque alias ea aliquid quibusdam voluptates impedit
                        maxime aut asperiores consequatur iste. Corporis fuga
                        ducimus dignissimos. Lorem ipsum dolor sit amet,
                        consectetur adipisicing elit. Adipisci non dolorem
                        consequatur vitae hic.
                      </p>
                      <p className='text-slate-400 mt-2'>
                        Suscipit totam atque dignissimos porro, exercitationem,
                        neque alias ea aliquid quibusdam voluptates impedit
                        maxime aut asperiores consequatur iste. Corporis fuga
                        ducimus dignissimos.
                      </p>
                    </div>
                  </div>

                  <div className='lg:col-span-7'>
                    <div className='bg-gray-50 dark:bg-slate-800 shadow-sm dark:shadow-gray-800 p-6 rounded-md'>
                      <h5 className='text-lg font-medium border-b border-gray-100 dark:border-gray-700 pb-3 mb-3'>
                        Project Info :
                      </h5>
                      <dl className='grid grid-cols-12 mb-0'>
                        <dt className='md:col-span-4 col-span-5 mt-2'>
                          Client :
                        </dt>
                        <dd className='md:col-span-8 col-span-7 mt-2 text-slate-400'>
                          Calvin Carlo
                        </dd>

                        <dt className='md:col-span-4 col-span-5 mt-2'>
                          Category :
                        </dt>
                        <dd className='md:col-span-8 col-span-7 mt-2 text-slate-400'>
                          Web Design
                        </dd>

                        <dt className='md:col-span-4 col-span-5 mt-2'>
                          Date :
                        </dt>
                        <dd className='md:col-span-8 col-span-7 mt-2 text-slate-400'>
                          23rd July, 2023
                        </dd>

                        <dt className='md:col-span-4 col-span-5 mt-2'>
                          Website :
                        </dt>
                        <dd className='md:col-span-8 col-span-7 mt-2 text-slate-400'>
                          www.yourdomain.com
                        </dd>

                        <dt className='md:col-span-4 col-span-5 mt-2'>
                          Location :
                        </dt>
                        <dd className='md:col-span-8 col-span-7 mt-2 text-slate-400'>
                          3/2/64 Mongus Street, UK
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <GetInTouch />
      </section>
      <Footer />
      <Switcher />
    </>
  );
}
