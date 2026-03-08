import React from 'react';

import VolunteerImage from '../assets/images/volunteer/ReqImage.webp';

const whatWeLookFor = [
  'Disiplin waktu & siap hadir sejak pukul 06.30',
  'Komunikatif, ramah, cepat beradaptasi, dan mampu bekerja dalam tim',
  'Memiliki sikap proaktif & profesional selama bertugas',
  'Tertarik pada neurosains, pendidikan, mental health, atau event organizing',
  'Bersedia ditempatkan di posisi mana pun sesuai kebutuhan lapangan',
  'Memiliki sensitivitas terhadap audiens yang beragam (anak-anak, pelajar, orang dewasa)',
  'Mendukung aksesibilitas & inklusi dalam seluruh interaksi dengan peserta',
  'Mampu menjelaskan konsep sederhana dengan bahasa yang ramah non-ahli',
];

export default function VolunteerReq() {
  return (
    <section className='bg-primary '>
      {/* Hero Image */}
      <div className='relative w-full'>
        <img
          src={VolunteerImage}
          alt='Volunteer'
          className='w-full object-cover max-h-96 saturate-0'
        />
        <div className='absolute inset-0 bg-primary/40' />
        <div className='absolute bottom-0 left-0 right-0 bg-dark/30 py-3 px-6 z-0'>
          <p className='text-white italic text-center font-semibold text-sm md:text-base'>
            "You don't need to know neuroscience, you only need the willingness
            to serve and learn."
          </p>
        </div>
      </div>

      {/* Green Section */}
      <div className='container px-8 py-10 flex flex-col md:flex-row justify-between items-start gap-8'>
        <div className='flex-1'>
          <h6 className='text-white text-base font-medium uppercase mb-2'>
            Brain Awareness Week & Teaching the Healing Brain <br /> Volunteer
            2026
          </h6>
          <h3 className='mb-4 md:text-2xl text-xl font-bold text-white'>
            What We Look For?
          </h3>

          <ul className='space-y-3'>
            {whatWeLookFor.map((item, index) => (
              <li
                key={index}
                className='flex items-start gap-3 text-white text-md'
              >
                <i className='mdi mdi-star-four-points text-white text-base' />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Button */}
        <div className='flex items-end md:items-center self-center md:self-end'>
          <a
            href='#register'
            className='bg-white text-primary font-bold px-6 py-3 rounded-full whitespace-nowrap hover:bg-gray-100 transition'
          >
            REGISTER NOW →
          </a>
        </div>
      </div>
    </section>
  );
}
