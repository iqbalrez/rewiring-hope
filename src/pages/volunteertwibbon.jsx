import { useState } from 'react';

import twibbon from '../assets/images/volunteer/Twibbon Volunteer.png';
import poster from '../assets/images/volunteer/Twibbon Volunteer-2.png';

const InfoBanner = () => (
  <div className='bg-green-50 border border-green-200 rounded-xl px-4 py-4 mb-7'>
    <p className='text-sm font-semibold text-green-800 mb-3 flex items-center gap-2'>
      <span>📌</span> Cara memposting yang benar
    </p>
    <ul className='space-y-2.5'>
      {[
        {
          icon: '🎀',
          label: 'Slide 1',
          desc: 'Foto kamu dengan frame twibbon (#Ready to Make An Impact).',
        },
        {
          icon: '📢',
          label: 'Slide 2',
          desc: 'Poster event Brain Awareness Week & Teaching the Healing Brain (wajib disertakan).',
        },
        {
          icon: '✍️',
          label: 'Caption',
          desc: (
            <>
              Copy caption yang sudah tersedia di bawah, lalu tag{' '}
              <strong className='font-semibold'>@rewiringhopeindonesia</strong>.
            </>
          ),
        },
        {
          icon: '🔗',
          label: 'Salin link',
          desc: (
            <>
              Salin link postingan Instagram kamu dan tempelkan di kolom{' '}
              <strong className='font-semibold'>22b</strong> form pendaftaran.
            </>
          ),
        },
      ].map((item, i) => (
        <li key={i} className='flex items-start gap-3'>
          <span className='text-base flex-shrink-0 mt-0.5'>{item.icon}</span>
          <p className='text-xs text-green-700 leading-relaxed'>
            <strong className='font-semibold'>{item.label}</strong> —{' '}
            {item.desc}
          </p>
        </li>
      ))}
    </ul>
  </div>
);

const FileCard = ({
  badge,
  label,
  name,
  desc,
  downloadName,
  href,
  btnText,
}) => (
  <div className='border border-gray-200 rounded-xl overflow-hidden hover:border-blue-300 hover:shadow-md transition-all duration-200'>
    <div className='bg-gray-100 aspect-[4/5] relative flex items-center justify-center'>
      <span className='absolute top-2.5 left-2.5 bg-white/90 backdrop-blur-sm border border-gray-200 text-[10px] font-semibold text-gray-700 px-2.5 py-1 rounded-full'>
        {badge}
      </span>
      {href ? (
        <img src={href} alt={name} className='w-full h-full object-cover' />
      ) : (
        <div className='text-gray-300 text-6xl select-none'>🖼</div>
      )}
    </div>
    <div className='p-4'>
      <p className='text-[10px] font-semibold uppercase tracking-widest text-blue-600 mb-1'>
        {label}
      </p>
      <p className='text-sm font-bold text-gray-800 mb-1'>{name}</p>
      <p
        className='text-xs text-gray-500 mb-4 leading-relaxed'
        dangerouslySetInnerHTML={{ __html: desc }}
      />
      <a
        className='flex items-center justify-center gap-2 w-full py-2.5 rounded-[10px] text-sm font-semibold text-white bg-green-600 hover:bg-green-700 active:scale-[0.98] transition-all cursor-pointer'
        download={downloadName}
        href={href || '#'}
      >
        ⬇ {btnText}
      </a>
    </div>
  </div>
);

const CAPTION = `[CALLING ALL CHANGE-MAKERS: BE THE VOICE OF HOPE 🧠✨]

Perubahan tidak selalu dimulai dari hal besar.
Kadang cukup dari satu keputusan: mau peduli.

Saya, (nama) siap berkontribusi sebagai volunteer di Brain Awareness Week & Teaching the Healing Brain 2026 bersama Rewiring Hope.

Siap belajar. Siap bertumbuh. Siap menyalakan harapan bersama.

Mari jadi bagian dari perubahan. 🤍

(Tag @rewiringhopeindonesia & 3 temanmu!)
#RewiringHope #BrainAwarenessWeek #TeachingTheHealingBrain #RewiringHopeVolunteer`;

const CaptionCard = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(CAPTION).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <div className='bg-white rounded-2xl shadow-lg overflow-hidden mb-6'>
      <div className='px-6 py-5 border-b border-gray-100'>
        <p className='text-[15px] font-bold text-gray-800 mb-0.5'>
          Caption Siap Pakai
        </p>
        <p className='text-xs text-gray-400'>
          Copy dan tempel langsung ke kolom caption Instagram
        </p>
      </div>
      <div className='px-6 py-5'>
        <div className='bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-xs text-gray-500 leading-relaxed mb-4'>
          Jangan lupa tag{' '}
          <strong className='text-gray-700'>@rewiringhopeindonesia</strong> dan
          set postingan ke <strong className='text-gray-700'>publik</strong>{' '}
          agar tim kami bisa memverifikasi.
        </div>
        <textarea
          readOnly
          className='w-full min-h-[190px] px-4 py-3.5 border border-gray-300 rounded-xl text-sm text-gray-800 font-[inherit] leading-7 resize-none bg-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-all'
          value={CAPTION}
        />
        <button
          onClick={handleCopy}
          className={`mt-3 flex items-center gap-2 px-5 py-2.5 rounded-[10px] text-sm font-semibold text-white transition-all active:scale-[0.98] ${
            copied ? 'bg-green-600' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          <span>{copied ? '✅' : '📋'}</span>
          <span>{copied ? 'Tersalin!' : 'Salin Caption'}</span>
        </button>
      </div>
    </div>
  );
};

const STEPS = [
  {
    num: 1,
    title: 'Unduh kedua file di atas',
    desc: 'Frame twibbon dan poster event harus diunduh terlebih dahulu.',
    tag: null,
  },
  {
    num: 2,
    title: 'Pasang foto kamu di frame twibbon',
    desc: 'Gunakan Canva, PicsArt, atau aplikasi editor foto lainnya. Letakkan foto profil kamu di balik frame.',
    tag: null,
  },
  {
    num: 3,
    title: 'Buat postingan carousel di Instagram',
    desc: 'Slide 1 = foto dengan frame twibbon · Slide 2 = poster event (wajib).',
    tag: '⚠ Pastikan akun Instagram kamu publik',
  },
  {
    num: 4,
    title: 'Tempel caption & tag akun kami',
    desc: (
      <>
        Salin caption di atas, tempel di kolom caption Instagram, dan tag{' '}
        <strong>@rewiringhopeindonesia</strong>.
      </>
    ),
    tag: null,
  },
  {
    num: 5,
    title: 'Salin link postingan → isi kolom 22b',
    desc: 'Setelah posting, salin link postingan Instagram kamu dan tempel di form pendaftaran kolom 22b.',
    tag: null,
  },
];

const StepsCard = () => (
  <div className='bg-white rounded-2xl shadow-lg overflow-hidden'>
    <div className='px-6 py-5 border-b border-gray-100'>
      <p className='text-[15px] font-bold text-gray-800 mb-0.5'>
        Langkah-langkah
      </p>
      <p className='text-xs text-gray-400'>
        Ikuti urutan ini agar postingan kamu sesuai syarat pendaftaran
      </p>
    </div>
    <div className='px-6 py-5'>
      <div className='flex flex-col gap-4'>
        {STEPS.map((s) => (
          <div key={s.num} className='flex items-start gap-3.5'>
            <div className='w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center border-2 border-blue-200 bg-blue-50 text-blue-600 text-xs font-bold mt-0.5'>
              {s.num}
            </div>
            <div className='flex-1'>
              <p className='text-sm font-semibold text-gray-800 mb-0.5'>
                {s.title}
              </p>
              <p className='text-xs text-gray-500 leading-relaxed'>{s.desc}</p>
              {s.tag && (
                <span className='inline-block mt-1.5 text-[10px] font-semibold px-2 py-0.5 rounded-md bg-green-100 text-green-700'>
                  {s.tag}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default function VolunteerTwibbonPage() {
  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='max-w-3xl mx-auto px-4 py-12 pb-20'>
        <h1 className='text-[22px] font-bold text-gray-800 mb-1'>
          Download Twibbon & Poster Event
        </h1>
        <p className='text-sm text-gray-500 leading-relaxed mb-8'>
          Unduh dua file di bawah, pasang di Instagram, lalu salin link
          postingannya ke form pendaftaran (kolom 22b).
        </p>

        <InfoBanner />

        {/* File Downloads Card */}
        <div className='bg-white rounded-2xl shadow-lg overflow-hidden mb-6'>
          <div className='px-6 py-5 border-b border-gray-100'>
            <p className='text-[15px] font-bold text-gray-800 mb-0.5'>
              File yang Perlu Diunduh
            </p>
            <p className='text-xs text-gray-400'>
              Klik tombol hijau untuk mengunduh masing-masing file
            </p>
          </div>
          <div className='px-6 py-5'>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <FileCard
                badge='Slide 1'
                label='Frame Twibbon'
                name='#Ready to Make An Impact'
                desc='Pasang foto kamu di balik frame ini menggunakan Canva atau PicsArt, lalu jadikan slide pertama postingan.'
                downloadName='Frame_Twibbon_RewiringHope.png'
                href={twibbon}
                btnText='Unduh Frame Twibbon'
              />
              <FileCard
                badge='Slide 2'
                label='Poster Event — Wajib Slide 2'
                name='BAW & Teaching the Healing Brain'
                desc='Jadikan gambar ini sebagai <strong>slide kedua</strong> di postingan Instagram kamu. Wajib disertakan.'
                downloadName='Poster_Event_RewiringHope.png'
                href={poster}
                btnText='Unduh Poster Event'
              />
            </div>
          </div>
        </div>

        <CaptionCard />
        <StepsCard />
      </div>
    </div>
  );
}
