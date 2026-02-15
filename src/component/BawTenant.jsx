import React, { useEffect } from 'react';

import IBROImage from '../assets/images/client/IBROImage.jpg';
import DanaFoundationImage from '../assets/images/client/DanaFoundationImageColor.png';
import BAWColorImage from '../assets/images/client/bawcolor.svg';

import TeamAos from './team-aos';
import Sign from '../assets/images/sign.png';
import { Link } from 'react-router-dom';
import Aos from 'aos';
import { Link as ScrollLink } from 'react-scroll';

export default function BawTenant() {
  useEffect(() => {
    Aos.init();
  }, []);

  const benefits = [
    'Eksposure Brand di Brain Awareness Week 2026, Indonesia',
    'Kolaborasi Internasional dalam rangkaian acara didukung IBRO, Dana Foundation, dan aktivitas kolaboratif University of Queensland',
    'Aktivasi Edukasi langsung dan Kesempatan Berjejaring dengan pengunjung sasaran keluarga, pelajar, guru, dan komunitas',
    'Peluang sosialisasi program (ektrakurikuler, klub sains, program studi)',
    'Eksposur Media Sosial & Dokumentasi Resmi',
  ];

  return (
    <>
      <section className='relative py-24 bg-blue-dark' id='about'>
        <div
          className='container mx-auto'
          data-aos='fade-up'
          data-aos-delay='200'
        >
          <h3 className='md:text-2xl text-xl text-center font-bold text-amber-500 dark:text-white'>
            BRAIN FAIR
          </h3>
          <p className='text-white text-center md:text-xl text-lg  mb-8'>
            Open Call for Exhibitors
          </p>
          <div className='grid grid-cols-1 lg:grid-cols-12 md:grid-cols-2 gap-10 items-start justify-center'>
            <div className='lg:col-span-4 h-full bg-white p-4 space-y-2 rounded-md'>
              <div className='relative overflow-hidden rounded-lg w-full p-4 border border-gray-100'>
                <div className='flex items-center justify-center gap-6 w-full h-full'>
                  <img
                    src={IBROImage}
                    className='flex-1 w-0 h-auto max-h-16 object-contain'
                    alt='IBRO Logo'
                  />
                  <img
                    src={DanaFoundationImage}
                    className='flex-1 w-0 h-auto max-h-16 object-contain'
                  />
                </div>
              </div>
              <div className='relative overflow-hidden rounded-lg w-full p-4 border border-gray-100'>
                <div className='flex items-center justify-center gap-6 w-full h-full'>
                  <img
                    src={BAWColorImage}
                    className='flex-1 w-0 h-auto object-contain'
                    alt='BAW Logo'
                  />
                </div>
              </div>
              <p className='text-blue-dark max-w-2xl mx-auto md:text-lg text-center '>
                Rp350.000
              </p>
              <div className='flex justify-center mb-2'>
                <a
                  href='#register'
                  className='hover:scale-105 bg-amber-600 text-white text-center py-3 px-6 rounded-md shadow-lg hover:bg-amber-700 transition-all duration-300 w-fit'
                >
                  Daftar Tenant BRAIN FAIR
                </a>
              </div>
            </div>
            {/* end col */}

            <div className='lg:col-span-8'>
              <div className=''>
                <p className='text-white text-start'>
                  <span className='font-bold'>Untuk siapa:</span> sekolah,
                  komunitas, universitas, BEM/UKM, lab, startup edu-sains, UMKM
                  Food & Beverages, toko buku / penerbit.
                  <br />
                  <br />
                  <span className='font-bold'>
                    Apa yang bisa dipamerkan:
                  </span>{' '}
                  demo eksperimen sederhana, permainan edukatif, pameran karya
                  siswa/mahasiswa, program literasi sains-otak, layanan
                  konseling/dukungan belajar, minuman dan makanan sehat, booth
                  kopi/teh, buku.
                  <br />
                  <br />
                </p>
                <p className='text-white font-bold mb-3'>
                  Keuntungan bagi tenant:
                </p>
                <ul className='space-y-3 text-slate-100'>
                  {benefits.map((benefit, i) => (
                    <li key={i} className='flex items-start text-white'>
                      <i className='mdi mdi-star-four-points text-amber-600 mr-2'></i>{' '}
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- End --> */}
    </>
  );
}
