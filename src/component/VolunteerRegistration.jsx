import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Aos from 'aos';

// ─── Step config ─────────────────────────────────────────────
const STEPS = [
  { id: 0, label: 'Data Diri', short: 'Diri' },
  { id: 1, label: 'Ketersediaan', short: 'Waktu' },
  { id: 2, label: 'Motivasi', short: 'Motivasi' },
  { id: 3, label: 'Peran', short: 'Peran' },
  { id: 4, label: 'Situasional', short: 'Situasi' },
  { id: 5, label: 'Komitmen', short: 'Komitmen' },
];

const ROLE_OPTIONS = [
  'Participant Support',
  'Speaker & Session Assistance',
  'Logistics & Movement',
  'Science Engagement',
  'Crowd & Direction Control',
  'Medical & Safety Support',
];

// ─── Reusable field components ────────────────────────────────
const Label = ({ children, required }) => (
  <label className='block text-sm font-semibold text-gray-700 mb-1.5'>
    {children} {required && <span className='text-red-500'>*</span>}
  </label>
);

const Input = ({ className = '', ...props }) => (
  <input
    className={`w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors bg-white ${className}`}
    {...props}
  />
);

const Textarea = ({ className = '', ...props }) => (
  <textarea
    className={`w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors bg-white resize-none ${className}`}
    {...props}
  />
);

const Select = ({ children, className = '', ...props }) => (
  <select
    className={`w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors bg-white ${className}`}
    {...props}
  >
    {children}
  </select>
);

const RadioCard = ({ label, checked, onChange, name, value }) => (
  <label
    className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 cursor-pointer transition-all select-none ${
      checked
        ? 'border-primary bg-primary/5 text-primary'
        : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
    }`}
  >
    <input
      type='radio'
      name={name}
      value={value}
      checked={checked}
      onChange={onChange}
      className='hidden'
    />
    <div
      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
        checked ? 'border-primary' : 'border-gray-400'
      }`}
    >
      {checked && <div className='w-2 h-2 rounded-full bg-primary' />}
    </div>
    <span className='text-sm font-medium'>{label}</span>
  </label>
);

const CheckCard = ({ label, checked, onChange }) => (
  <label
    className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 cursor-pointer transition-all select-none ${
      checked
        ? 'border-primary bg-primary/5 text-primary'
        : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
    }`}
  >
    <input
      type='checkbox'
      checked={checked}
      onChange={onChange}
      className='hidden'
    />
    <div
      className={`w-4 h-4 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all ${
        checked ? 'border-primary bg-primary' : 'border-gray-400'
      }`}
    >
      {checked && (
        <svg width='10' height='8' viewBox='0 0 10 8' fill='none'>
          <path
            d='M1 4l3 3 5-6'
            stroke='white'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      )}
    </div>
    <span className='text-sm font-medium'>{label}</span>
  </label>
);

const FieldHint = ({ children }) => (
  <p className='text-xs text-gray-400 mt-1.5 leading-relaxed'>{children}</p>
);

// ─── Step progress bar ────────────────────────────────────────
function StepBar({ current, total }) {
  return (
    <div className='mb-8'>
      {/* Mobile: label + progress bar */}
      <div className='flex items-center justify-between mb-2 sm:hidden'>
        <span className='text-xs font-semibold text-primary'>
          {STEPS[current].label}
        </span>
        <span className='text-xs text-gray-400'>
          {current + 1} / {total}
        </span>
      </div>
      <div className='h-1.5 bg-gray-200 rounded-full overflow-hidden sm:hidden'>
        <div
          className='h-full bg-primary rounded-full transition-all duration-500'
          style={{ width: `${((current + 1) / total) * 100}%` }}
        />
      </div>

      {/* Desktop: step bubbles */}
      <div className='hidden sm:flex items-center'>
        {STEPS.map((step, i) => {
          const done = i < current;
          const active = i === current;
          return (
            <React.Fragment key={step.id}>
              <div className='flex flex-col items-center'>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${
                    done
                      ? 'bg-primary border-primary text-white'
                      : active
                        ? 'bg-white border-primary text-primary'
                        : 'bg-white border-gray-300 text-gray-400'
                  }`}
                >
                  {done ? (
                    <svg width='12' height='10' viewBox='0 0 12 10' fill='none'>
                      <path
                        d='M1 5l4 4L11 1'
                        stroke='white'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </svg>
                  ) : (
                    i + 1
                  )}
                </div>
                <span
                  className={`text-[10px] mt-1 font-medium whitespace-nowrap ${active ? 'text-primary' : done ? 'text-gray-500' : 'text-gray-300'}`}
                >
                  {step.label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-1 transition-all ${i < current ? 'bg-primary' : 'bg-gray-200'}`}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

// ─── Individual Steps ─────────────────────────────────────────

// Step 0: Data Pribadi
function StepDataDiri({ data, setData }) {
  return (
    <div className='space-y-5'>
      {/* Preparation banner */}
      <div className='bg-green-50 border border-green-200 rounded-xl px-4 py-4'>
        <p className='text-sm font-semibold text-green-800 mb-1 flex items-center gap-2'>
          <span>✅</span> Sebelum mulai, siapkan 3 hal ini
        </p>
        <p className='text-xs text-green-700 mb-3'>
          Formulir ini terdiri dari 6 langkah. File dibutuhkan di langkah
          terakhir — siapkan sekarang agar tidak perlu berhenti di tengah jalan.
        </p>
        <ul className='space-y-2.5'>
          {[
            {
              icon: '📸',
              label: 'Screenshot bukti follow',
              desc: 'Foto layar halaman profil @rewiringhopeindonesia yang menunjukkan Anda sudah mengikuti akun kami.',
              req: true,
            },
            {
              icon: '🎀',
              label: 'Link postingan twibbon',
              desc: (
                <>
                  Pasang twibbon Rewiring Hope di Instagram Anda, lalu salin
                  link postingannya. Belum punya frame twibbon?{' '}
                  <a
                    href='/volunteer/twibbon'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='underline font-semibold text-green-800 hover:text-green-600'
                  >
                    Klik di sini
                  </a>
                  .
                </>
              ),
              req: true,
            },
            {
              icon: '📄',
              label: 'CV atau portofolio',
              desc: 'CV singkat atau portofolio kegiatan volunteer sebelumnya dalam format PDF atau gambar.',
              req: false,
            },
          ].map((item, i) => (
            <li key={i} className='flex items-start gap-3'>
              <span className='text-base flex-shrink-0 mt-0.5'>
                {item.icon}
              </span>
              <div className='flex-1 min-w-0'>
                <div className='flex items-center gap-2 flex-wrap'>
                  <span className='text-sm font-semibold text-green-900'>
                    {item.label}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${item.req ? 'bg-green-200 text-green-800' : 'bg-green-100 text-green-600'}`}
                  >
                    {item.req ? 'Wajib' : 'Opsional'}
                  </span>
                </div>
                <p className='text-xs text-green-700 mt-0.5 leading-relaxed'>
                  {item.desc}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
        <div>
          <Label required>Nama Lengkap</Label>
          <Input
            value={data.name}
            placeholder='Nama lengkap sesuai KTP'
            onChange={(e) => setData((d) => ({ ...d, name: e.target.value }))}
          />
        </div>
        <div>
          <Label required>Usia</Label>
          <Input
            type='number'
            min='15'
            max='60'
            value={data.age}
            placeholder='Usia (tahun)'
            onChange={(e) => setData((d) => ({ ...d, age: e.target.value }))}
          />
        </div>
        <div>
          <Label required>Email Aktif</Label>
          <Input
            type='email'
            value={data.email}
            placeholder='email@contoh.com'
            onChange={(e) => setData((d) => ({ ...d, email: e.target.value }))}
          />
        </div>
        <div>
          <Label required>Nomor WhatsApp</Label>
          <Input
            type='tel'
            value={data.phone}
            placeholder='08xxxxxxxxxx'
            onChange={(e) => setData((d) => ({ ...d, phone: e.target.value }))}
          />
        </div>
        <div>
          <Label required>Kota Domisili</Label>
          <Input
            value={data.city}
            placeholder='Jakarta, Bandung, dll'
            onChange={(e) => setData((d) => ({ ...d, city: e.target.value }))}
          />
        </div>
        <div>
          <Label required>Alamat</Label>
          <Input
            value={data.address}
            placeholder='Jalan, kelurahan, kecamatan'
            onChange={(e) =>
              setData((d) => ({ ...d, address: e.target.value }))
            }
          />
        </div>
        <div>
          <Label required>Status</Label>
          <Select
            value={data.occupation}
            onChange={(e) =>
              setData((d) => ({ ...d, occupation: e.target.value }))
            }
          >
            <option value=''>Pilih status</option>
            <option value='pelajar'>Pelajar</option>
            <option value='mahasiswa'>Mahasiswa</option>
            <option value='karyawan'>Karyawan</option>
            <option value='lainnya'>Lainnya</option>
          </Select>
        </div>
        {(data.occupation === 'pelajar' || data.occupation === 'mahasiswa') && (
          <div>
            <Label required>Institusi</Label>
            <Input
              value={data.organization}
              placeholder='Nama sekolah / universitas'
              onChange={(e) =>
                setData((d) => ({ ...d, organization: e.target.value }))
              }
            />
          </div>
        )}
      </div>
    </div>
  );
}

// Step 1: Ketersediaan Waktu (Section A, Q1–3)
function StepKetersediaan({ data, setData }) {
  const toggle = (field, val) => {
    setData((d) => {
      const arr = d[field] || [];
      return {
        ...d,
        [field]: arr.includes(val)
          ? arr.filter((x) => x !== val)
          : [...arr, val],
      };
    });
  };

  return (
    <div className='space-y-6'>
      <div>
        <Label required>
          1. Kapan Anda tersedia? (boleh pilih lebih dari satu)
        </Label>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2'>
          <div className='grid grid-cols-2 gap-3 mt-2'>
            {[
              {
                key: 'BAW',
                label: 'BAW',
                sub: 'Brain Awareness Week · 2 Juli 2026',
              },
              {
                key: 'TTHB',
                label: 'TTHB',
                sub: 'Teaching the Healing Brain · 4 Juli 2026',
              },
            ].map((ev) => (
              <label
                key={ev.key}
                className={`flex flex-col gap-1 px-4 py-3 rounded-xl border-2 cursor-pointer transition-all select-none ${
                  (data.events || []).includes(ev.key)
                    ? 'border-primary bg-primary/5 text-primary'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className='flex items-center gap-3'>
                  <div
                    className={`w-4 h-4 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                      (data.events || []).includes(ev.key)
                        ? 'border-primary bg-primary'
                        : 'border-gray-400'
                    }`}
                  >
                    {(data.events || []).includes(ev.key) && (
                      <svg width='10' height='8' viewBox='0 0 10 8' fill='none'>
                        <path
                          d='M1 4l3 3 5-6'
                          stroke='white'
                          strokeWidth='1.5'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                      </svg>
                    )}
                  </div>
                  <span className='font-bold text-base'>{ev.label}</span>
                </div>
                <span className='text-xs text-gray-400 pl-7'>{ev.sub}</span>
                <input
                  type='checkbox'
                  className='hidden'
                  checked={(data.events || []).includes(ev.key)}
                  onChange={() => toggle('events', ev.key)}
                />
              </label>
            ))}
          </div>
        </div>
        <FieldHint>Pilih salah satu atau keduanya.</FieldHint>
      </div>

      <div>
        <Label required>
          2. Bersedia mengikuti briefing wajib sebelum acara?
        </Label>
        <FieldHint className='mb-2'>
          30 Juni 2026 untuk Brain Awareness Week / 2 Juli 2026 untuk Teaching
          the Healing Brain (online)
        </FieldHint>
        <div className='grid grid-cols-2 gap-3 mt-2'>
          <RadioCard
            label='Ya, bersedia'
            name='briefing'
            value='true'
            checked={data.willing_briefing === true}
            onChange={() => setData((d) => ({ ...d, willing_briefing: true }))}
          />
          <RadioCard
            label='Tidak'
            name='briefing'
            value='false'
            checked={data.willing_briefing === false}
            onChange={() => setData((d) => ({ ...d, willing_briefing: false }))}
          />
        </div>
      </div>

      <div>
        <Label required>
          3. Bersedia hadir pukul 06.30 – 17.00 selama hari acara?
        </Label>
        <div className='grid grid-cols-2 gap-3 mt-2'>
          <RadioCard
            label='Ya, bersedia'
            name='fullday'
            value='true'
            checked={data.full_day === true}
            onChange={() => setData((d) => ({ ...d, full_day: true }))}
          />
          <RadioCard
            label='Tidak'
            name='fullday'
            value='false'
            checked={data.full_day === false}
            onChange={() => setData((d) => ({ ...d, full_day: false }))}
          />
        </div>
      </div>
    </div>
  );
}

// Step 2: Motivasi & Kompetensi (Section C, Q4–6)
function StepMotivasi({ data, setData }) {
  return (
    <div className='space-y-6'>
      <div>
        <Label required>
          4. Mengapa Anda ingin menjadi volunteer untuk Brain Awareness Week &
          Teaching the Healing Brain?
        </Label>
        <FieldHint>1–2 paragraf, atau minimal 5–7 kalimat.</FieldHint>
        <Textarea
          rows={5}
          className='mt-2'
          value={data.why_volunteer}
          placeholder='Ceritakan motivasi Anda...'
          onChange={(e) =>
            setData((d) => ({ ...d, why_volunteer: e.target.value }))
          }
        />
      </div>

      <div>
        <Label required>
          5. Apa ketertarikan Anda terhadap neurosains, pendidikan, kesehatan
          mental, atau kegiatan berbasis komunitas?
        </Label>
        <Textarea
          rows={4}
          className='mt-2'
          value={data.interest}
          placeholder='Ceritakan ketertarikan Anda...'
          onChange={(e) => setData((d) => ({ ...d, interest: e.target.value }))}
        />
      </div>

      <div>
        <Label>
          6. Ceritakan pengalaman Anda sebelumnya dalam kegiatan volunteer,
          event organizing, edukasi publik, atau komunitas.
        </Label>
        <FieldHint>Opsional — jika ada.</FieldHint>
        <Textarea
          rows={4}
          className='mt-2'
          value={data.experience}
          placeholder='Ceritakan pengalaman Anda (jika ada)...'
          onChange={(e) =>
            setData((d) => ({ ...d, experience: e.target.value }))
          }
        />
      </div>
    </div>
  );
}

// Step 3: Kesesuaian Peran (Section D, Q7–11)
function StepPeran({ data, setData }) {
  const toggleRole = (role) => {
    setData((d) => {
      const arr = d.preferred_roles || [];
      return {
        ...d,
        preferred_roles: arr.includes(role)
          ? arr.filter((r) => r !== role)
          : [...arr, role],
      };
    });
  };

  return (
    <div className='space-y-6'>
      <div>
        <Label required>
          7. Pilih peran yang paling sesuai dengan kemampuan Anda (boleh lebih
          dari satu)
        </Label>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-2'>
          {ROLE_OPTIONS.map((role) => (
            <CheckCard
              key={role}
              label={role}
              checked={(data.preferred_roles || []).includes(role)}
              onChange={() => toggleRole(role)}
            />
          ))}
        </div>
      </div>

      <div>
        <Label required>
          Jelaskan mengapa Anda cocok untuk peran tersebut.
        </Label>
        <Textarea
          rows={3}
          className='mt-2'
          value={data.why_suitable}
          placeholder='Alasan kesesuaian Anda dengan peran yang dipilih...'
          onChange={(e) =>
            setData((d) => ({ ...d, why_suitable: e.target.value }))
          }
        />
      </div>

      <div>
        <Label required>
          8. Bagaimana Anda menjelaskan konsep yang sulit (misalnya sains atau
          kesehatan mental) kepada audiens awam?
        </Label>
        <FieldHint>Berikan 1 contoh sederhana.</FieldHint>
        <Textarea
          rows={3}
          className='mt-2'
          value={data.explain_difficult}
          placeholder='Contoh cara menjelaskan konsep sulit...'
          onChange={(e) =>
            setData((d) => ({ ...d, explain_difficult: e.target.value }))
          }
        />
      </div>

      <div>
        <Label required>
          9. Ceritakan pengalaman Anda berinteraksi dengan audiens yang beragam.
        </Label>
        <FieldHint>
          Anak-anak, pelajar, dewasa, lansia. Apakah Anda nyaman menghadapi
          audiens beragam?
        </FieldHint>
        <Textarea
          rows={3}
          className='mt-2'
          value={data.diverse_audience}
          placeholder='Pengalaman dengan audiens yang beragam...'
          onChange={(e) =>
            setData((d) => ({ ...d, diverse_audience: e.target.value }))
          }
        />
      </div>

      <div>
        <Label required>
          10. Bagaimana Anda bersikap jika ada peserta yang bingung, salah
          ruangan, atau kesulitan mengikuti alur acara?
        </Label>
        <Textarea
          rows={3}
          className='mt-2'
          value={data.handle_confused}
          placeholder='Cara Anda menangani peserta yang kebingungan...'
          onChange={(e) =>
            setData((d) => ({ ...d, handle_confused: e.target.value }))
          }
        />
      </div>

      <div>
        <Label required>
          11. Apa yang akan Anda lakukan jika melihat peserta yang membutuhkan
          bantuan khusus? (DEI)
        </Label>
        <FieldHint>
          Kami mengutamakan aksesibilitas dan inklusi dalam acara ini.
        </FieldHint>
        <Textarea
          rows={3}
          className='mt-2'
          value={data.dei_response}
          placeholder='Cara Anda memberikan bantuan khusus...'
          onChange={(e) =>
            setData((d) => ({ ...d, dei_response: e.target.value }))
          }
        />
      </div>
    </div>
  );
}

// Step 4: Situational Judgment (Section E, Q12–16)
function StepSituasional({ data, setData }) {
  const questions = [
    {
      key: 'long_queue',
      num: 12,
      q: 'Jika terjadi antrean panjang di registrasi, apa langkah pertama yang Anda lakukan?',
    },
    {
      key: 'speaker_need',
      num: 13,
      q: 'Jika narasumber membutuhkan sesuatu secara mendadak (air minum, alat tulis, informasi ruang), apa tindakan Anda?',
    },
    {
      key: 'unwell_participant',
      num: 14,
      q: 'Bagaimana jika ada peserta yang merasa tidak enak badan?',
      hint: 'Respons yang mengarah ke tim medis / safety support.',
    },
    {
      key: 'agenda_change',
      num: 15,
      q: 'Jika terjadi perubahan agenda tiba-tiba, bagaimana Anda menyesuaikan diri?',
    },
    {
      key: 'crowd_control',
      num: 16,
      q: 'Jika ruangan mulai penuh dan arus peserta padat, bagaimana Anda mengatur arah pergerakan peserta?',
    },
  ];

  return (
    <div className='space-y-6'>
      <div className='bg-blue-50 border border-blue-100 rounded-xl px-4 py-3'>
        <p className='text-sm text-blue-700 font-medium'>
          💡 Situational Judgment
        </p>
        <p className='text-xs text-blue-600 mt-0.5'>
          Jawab sesuai intuisi dan pengalaman Anda. Tidak ada jawaban yang
          sempurna — yang dinilai adalah cara berpikir dan respons Anda.
        </p>
      </div>
      {questions.map(({ key, num, q, hint }) => (
        <div key={key}>
          <Label required>
            {num}. {q}
          </Label>
          {hint && <FieldHint>{hint}</FieldHint>}
          <Textarea
            rows={3}
            className='mt-2'
            value={data[key]}
            placeholder='Ceritakan respons Anda...'
            onChange={(e) => setData((d) => ({ ...d, [key]: e.target.value }))}
          />
        </div>
      ))}
    </div>
  );
}

// ─── File Upload Box (reusable) ──────────────────────────────
function FileUploadBox({
  id,
  accept,
  file,
  onFile,
  onRemove,
  icon,
  title,
  hint,
  required,
}) {
  return (
    <div>
      <Label required={required}>{title}</Label>
      {hint && <FieldHint>{hint}</FieldHint>}
      <div
        className='mt-2 border-2 border-dashed rounded-xl p-5 bg-gray-50 transition-all cursor-pointer hover:border-primary hover:bg-primary/5'
        onClick={() => document.getElementById(id).click()}
      >
        {file ? (
          <div className='flex items-center gap-3'>
            {accept.startsWith('image') && file.type?.startsWith('image/') ? (
              <img
                src={URL.createObjectURL(file)}
                alt='preview'
                className='w-14 h-14 rounded-lg object-cover flex-shrink-0'
              />
            ) : (
              <div className='w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-lg flex-shrink-0'>
                {icon}
              </div>
            )}
            <div className='min-w-0'>
              <p className='text-sm font-medium text-gray-800 truncate'>
                {file.name}
              </p>
              <p className='text-xs text-gray-400'>
                {(file.size / 1024).toFixed(0)} KB
              </p>
            </div>
            <button
              type='button'
              onClick={(e) => {
                e.stopPropagation();
                onRemove();
              }}
              className='ml-auto text-xs text-red-500 hover:underline flex-shrink-0'
            >
              Hapus
            </button>
          </div>
        ) : (
          <div className='text-center'>
            <div className='text-2xl mb-1'>{icon}</div>
            <p className='text-sm text-gray-600'>
              <span className='text-primary font-medium'>
                Klik untuk upload
              </span>
            </p>
            <p className='text-xs text-gray-400 mt-1'>{hint || ''}</p>
          </div>
        )}
        <input
          id={id}
          type='file'
          accept={accept}
          className='hidden'
          onChange={(e) => {
            if (e.target.files[0]) onFile(e.target.files[0]);
            e.target.value = '';
          }}
        />
      </div>
    </div>
  );
}

// Step 5: Komitmen + Informasi Tambahan (Section F Q17–20 + Section G Q21–22)
// Props are split: commitment & setCommitment, additional & setAdditional — avoids spread setter bug
function StepKomitmen({
  commitment,
  setCommitment,
  additional,
  setAdditional,
  instagramProof,
  setInstagramProof,
  cvPortfolio,
  setCvPortfolio,
}) {
  return (
    <div className='space-y-6'>
      <div>
        <Label required>
          17. Bersedia bekerja dalam suasana cepat, dinamis, dan membutuhkan
          adaptasi instan?
        </Label>
        <div className='grid grid-cols-2 gap-3 mt-2'>
          <RadioCard
            label='Ya, bersedia'
            name='q17_dynamic'
            value='yes'
            checked={commitment.dynamic_env === true}
            onChange={() => setCommitment((d) => ({ ...d, dynamic_env: true }))}
          />
          <RadioCard
            label='Tidak'
            name='q17_dynamic'
            value='no'
            checked={commitment.dynamic_env === false}
            onChange={() =>
              setCommitment((d) => ({ ...d, dynamic_env: false }))
            }
          />
        </div>
      </div>

      <div>
        <Label required>
          18. Bagaimana Anda memastikan diri tetap profesional, sopan, dan
          helpful di bawah tekanan?
        </Label>
        <Textarea
          rows={3}
          className='mt-2'
          value={commitment.professionalism}
          placeholder='Cara Anda menjaga profesionalisme di bawah tekanan...'
          onChange={(e) =>
            setCommitment((d) => ({ ...d, professionalism: e.target.value }))
          }
        />
      </div>

      <div>
        <Label required>
          19. Bersedia ditempatkan di peran apa pun sesuai kebutuhan lapangan
          (all-hands)?
        </Label>
        <div className='grid grid-cols-2 gap-3 mt-2'>
          <RadioCard
            label='Ya, bersedia'
            name='q19_allhands'
            value='yes'
            checked={commitment.all_hands === true}
            onChange={() => setCommitment((d) => ({ ...d, all_hands: true }))}
          />
          <RadioCard
            label='Tidak'
            name='q19_allhands'
            value='no'
            checked={commitment.all_hands === false}
            onChange={() => setCommitment((d) => ({ ...d, all_hands: false }))}
          />
        </div>
      </div>

      <div>
        <Label>
          20. Apakah Anda memiliki kondisi kesehatan yang perlu diketahui
          panitia?
        </Label>
        <Textarea
          rows={2}
          className='mt-2'
          value={commitment.health_condition}
          placeholder='Jika ada, jelaskan. Jika tidak ada, kosongkan.'
          onChange={(e) =>
            setCommitment((d) => ({ ...d, health_condition: e.target.value }))
          }
        />
        <FieldHint>
          Informasi ini bersifat rahasia dan hanya digunakan untuk keperluan
          keamanan.
        </FieldHint>
      </div>

      <div className='border-t border-gray-200 pt-5 space-y-5'>
        <p className='text-xs font-bold text-gray-400 uppercase tracking-widest'>
          G. Informasi Tambahan
        </p>

        <div>
          <Label>
            21. Pertanyaan, masukan, atau hal lain yang ingin disampaikan?
          </Label>
          <Textarea
            rows={3}
            className='mt-2'
            value={additional.notes}
            placeholder='Opsional — tulis apa pun yang ingin Anda sampaikan...'
            onChange={(e) =>
              setAdditional((d) => ({ ...d, notes: e.target.value }))
            }
          />
        </div>

        <div>
          <Label required>
            22a. Bukti Follow Instagram @rewiringhopeindonesia
          </Label>
          <FileUploadBox
            id='ig-upload'
            accept='image/*'
            icon='📸'
            title=''
            hint='Screenshot halaman profil yang menunjukkan Anda sudah follow akun kami. JPG/PNG.'
            file={instagramProof}
            onFile={setInstagramProof}
            onRemove={() => setInstagramProof(null)}
          />
        </div>

        <div>
          <Label required>22b. Link Twibbon</Label>
          <FieldHint>
            Pasang twibbon kami lalu tempelkan link postingan Instagram Anda di
            sini.
          </FieldHint>
          <Input
            className='mt-2'
            type='url'
            value={additional.twibbon_link || ''}
            placeholder='https://www.instagram.com/p/xxxxx'
            onChange={(e) =>
              setAdditional((d) => ({ ...d, twibbon_link: e.target.value }))
            }
          />
        </div>

        <FileUploadBox
          id='cv-upload'
          accept='.pdf,.doc,.docx,image/*'
          icon='📎'
          title='22c. CV singkat / Portofolio volunteer (opsional)'
          hint='PDF, DOC, DOCX, atau gambar.'
          file={cvPortfolio}
          onFile={setCvPortfolio}
          onRemove={() => setCvPortfolio(null)}
        />
      </div>
    </div>
  );
}

// ─── Validation per step ──────────────────────────────────────
function validateStep(step, formData, submissionData, instagramProof) {
  switch (step) {
    case 0: {
      const d = formData;
      if (!d.name.trim()) return 'Nama lengkap wajib diisi.';
      if (!d.age) return 'Usia wajib diisi.';
      if (!d.email.trim() || !/\S+@\S+\.\S+/.test(d.email))
        return 'Email tidak valid.';
      if (!d.phone.trim()) return 'Nomor WhatsApp wajib diisi.';
      if (!d.city.trim()) return 'Kota domisili wajib diisi.';
      if (!d.address.trim()) return 'Alamat wajib diisi.';
      if (!d.occupation) return 'Status wajib dipilih.';
      if (
        (d.occupation === 'pelajar' || d.occupation === 'mahasiswa') &&
        !d.organization.trim()
      )
        return 'Nama institusi wajib diisi untuk pelajar/mahasiswa.';
      return null;
    }
    case 1: {
      const a = submissionData.availability;
      if (!a.events || a.events.length === 0)
        return 'Pilih setidaknya satu tanggal ketersediaan.';
      if (a.willing_briefing === undefined || a.willing_briefing === null)
        return 'Jawab pertanyaan kesediaan briefing.';
      if (a.full_day === undefined || a.full_day === null)
        return 'Jawab pertanyaan kesediaan hadir penuh.';
      return null;
    }
    case 2: {
      const m = submissionData.motivation;
      if (!m.why_volunteer?.trim()) return 'Jawaban pertanyaan 4 wajib diisi.';
      if (!m.interest?.trim()) return 'Jawaban pertanyaan 5 wajib diisi.';
      return null;
    }
    case 3: {
      const r = submissionData.role;
      if (!r.preferred_roles || r.preferred_roles.length === 0)
        return 'Pilih setidaknya satu peran.';
      if (!r.why_suitable?.trim())
        return 'Jelaskan mengapa Anda cocok untuk peran tersebut.';
      if (!r.explain_difficult?.trim())
        return 'Jawaban pertanyaan 8 wajib diisi.';
      if (!r.diverse_audience?.trim())
        return 'Jawaban pertanyaan 9 wajib diisi.';
      if (!r.handle_confused?.trim())
        return 'Jawaban pertanyaan 10 wajib diisi.';
      if (!r.dei_response?.trim()) return 'Jawaban pertanyaan 11 wajib diisi.';
      return null;
    }
    case 4: {
      const s = submissionData.situational;
      const required = [
        'long_queue',
        'speaker_need',
        'unwell_participant',
        'agenda_change',
        'crowd_control',
      ];
      for (const k of required) {
        if (!s[k]?.trim()) return `Semua pertanyaan situasional wajib dijawab.`;
      }
      return null;
    }
    case 5: {
      const f = submissionData.commitment;
      const g = submissionData.additional;
      if (f.dynamic_env === undefined || f.dynamic_env === null)
        return 'Jawab pertanyaan 17.';
      if (!f.professionalism?.trim())
        return 'Jawaban pertanyaan 18 wajib diisi.';
      if (f.all_hands === undefined || f.all_hands === null)
        return 'Jawab pertanyaan 19.';
      if (!instagramProof)
        return 'Bukti follow Instagram wajib diupload (22a).';
      if (!g.twibbon_link?.trim()) return 'Link twibbon wajib diisi (22b).';
      return null;
    }
    default:
      return null;
  }
}

// ─── Main Component ───────────────────────────────────────────
export default function VolunteerRegistration() {
  const VITE_API_URL = import.meta.env.VITE_API_URL;

  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [instagramProof, setInstagramProof] = useState(null);
  const [cvPortfolio, setCvPortfolio] = useState(null);
  const contentRef = useRef(null);

  // Personal data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    age: '',
    occupation: '',
    organization: '',
  });

  // Submission data — matches VolunteerDetailModal JSON structure
  const [availability, setAvailability] = useState({
    events: [],
    willing_briefing: null,
    full_day: null,
  });
  const [motivation, setMotivation] = useState({
    why_volunteer: '',
    interest: '',
    experience: '',
  });
  const [role, setRole] = useState({
    preferred_roles: [],
    why_suitable: '',
    explain_difficult: '',
    diverse_audience: '',
    handle_confused: '',
    dei_response: '',
  });
  const [situational, setSituational] = useState({
    long_queue: '',
    speaker_need: '',
    unwell_participant: '',
    agenda_change: '',
    crowd_control: '',
  });
  const [commitment, setCommitment] = useState({
    dynamic_env: null,
    professionalism: '',
    all_hands: null,
    health_condition: '',
  });
  const [additional, setAdditional] = useState({ notes: '', twibbon_link: '' });

  useEffect(() => {
    Aos.init({ duration: 400, once: true });
  }, []);

  const submissionData = {
    availability,
    motivation,
    role,
    situational,
    commitment,
    additional,
  };

  const scrollTop = () => {
    if (contentRef.current)
      contentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const nextStep = () => {
    const err = validateStep(step, formData, submissionData, instagramProof);
    if (err) {
      setErrorMsg(err);
      return;
    }
    setErrorMsg('');
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
    scrollTop();
  };

  const prevStep = () => {
    setErrorMsg('');
    setStep((s) => Math.max(s - 1, 0));
    scrollTop();
  };

  const handleSubmit = async () => {
    const err = validateStep(5, formData, submissionData, instagramProof);
    if (err) {
      setErrorMsg(err);
      return;
    }
    setLoading(true);
    setErrorMsg('');
    try {
      const payload = new FormData();
      Object.entries(formData).forEach(([k, v]) => payload.append(k, v));
      payload.append('submissionData', JSON.stringify(submissionData));
      if (instagramProof) payload.append('instagramProof', instagramProof);
      if (cvPortfolio) payload.append('cvPortfolio', cvPortfolio);
      await axios.post(`${VITE_API_URL}/volunteer/register`, payload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setSubmitted(true);
    } catch (err) {
      setErrorMsg(
        err.response?.data?.message ||
          'Gagal memproses pendaftaran. Coba lagi.',
      );
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <section
        id='register'
        className='py-16 md:py-24 bg-gray-50 dark:bg-gray-900'
      >
        <div className='container mx-auto px-4 max-w-lg'>
          <div className='bg-white rounded-2xl shadow-lg p-10 text-center'>
            <div className='w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6'>
              <svg width='36' height='36' viewBox='0 0 36 36' fill='none'>
                <path
                  d='M8 18l7 7L28 11'
                  stroke='#16a34a'
                  strokeWidth='3'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </div>
            <h4 className='text-2xl font-bold text-gray-800 mb-3'>
              Pendaftaran Berhasil! 🎉
            </h4>
            <p className='text-gray-500 text-sm leading-relaxed mb-2'>
              Terima kasih sudah mendaftar sebagai volunteer Rewiring Hope.
            </p>
            <p className='text-gray-500 text-sm leading-relaxed'>
              Tim kami akan meninjau pendaftaran Anda dan menghubungi via email.
              Mohon cek inbox (dan folder spam) secara berkala.
            </p>
            <div className='mt-5 px-4 py-3 bg-green-50 border border-green-200 rounded-xl text-sm text-green-700'>
              Konfirmasi dikirim ke <strong>{formData.email}</strong>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id='register'
      className='py-16 md:py-24 bg-gray-50 dark:bg-gray-900'
    >
      <div className='container mx-auto px-4' data-aos='fade-up'>
        <div className='grid grid-cols-1 md:grid-cols-5 gap-8 items-start'>
          {/* ── Left timeline panel ── */}
          <div className='md:col-span-2 bg-blue-dark rounded-2xl shadow-lg p-7 flex flex-col md:sticky md:top-8'>
            <h2 className='text-2xl font-bold text-amber-500 mb-1'>
              Time Commitment
            </h2>
            <p className='text-slate-400 text-sm mb-7'>
              Tanggal penting yang perlu Anda siapkan
            </p>

            {/* Timeline */}
            <div className='relative flex-1'>
              {/* Vertical line */}
              <div className='absolute left-[18px] top-2 bottom-2 w-0.5 bg-white/10' />

              {[
                {
                  icon: '🎓',
                  color: 'bg-purple-500',
                  label: 'Mini Training',
                  date: 'Sebelum acara',
                  desc: 'Neuroscience-informed event management — online, jadwal menyusul',
                },
                {
                  icon: '📋',
                  color: 'bg-blue-400',
                  label: 'Briefing BAW',
                  date: '30 Juni 2026',
                  desc: 'Briefing wajib H-2 Brain Awareness Week — online',
                },
                {
                  icon: '📋',
                  color: 'bg-blue-400',
                  label: 'Briefing THB',
                  date: '2 Juli 2026',
                  desc: 'Briefing wajib H-2 Teaching the Healing Brain — online',
                },
                {
                  icon: '🧠',
                  color: 'bg-amber-400',
                  label: 'Brain Awareness Week',
                  date: '2 Juli 2026',
                  desc: 'Hari H event — hadir 06.30–17.00 WIB',
                  highlight: true,
                },
                {
                  icon: '💚',
                  color: 'bg-green-400',
                  label: 'Teaching the Healing Brain',
                  date: '4 Juli 2026',
                  desc: 'Hari H event — hadir 06.30–17.00 WIB',
                  highlight: true,
                },
              ].map((item, i) => (
                <div key={i} className='relative flex gap-4 mb-6 last:mb-0'>
                  {/* Dot */}
                  <div
                    className={`relative z-10 w-9 h-9 rounded-full ${item.color} flex items-center justify-center text-base flex-shrink-0 shadow-lg`}
                  >
                    {item.icon}
                  </div>
                  {/* Content */}
                  <div
                    className={`flex-1 rounded-xl px-4 py-3 ${item.highlight ? 'bg-white/15 border border-white/20' : 'bg-white/5'}`}
                  >
                    <div className='flex items-start justify-between gap-2 mb-0.5'>
                      <p className='text-white font-semibold text-sm leading-snug'>
                        {item.label}
                      </p>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${item.highlight ? 'bg-amber-400 text-amber-900' : 'bg-white/20 text-white/80'}`}
                      >
                        {item.date}
                      </span>
                    </div>
                    <p className='text-slate-400 text-xs leading-relaxed'>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <p className='font-semibold text-white/70 text-center text-xs mt-7 italic border-t border-white/10 pt-5'>
              "Because everyone deserves to understand their brain."
            </p>
          </div>

          {/* ── Right wizard panel ── */}
          <div className='md:col-span-3'>
            <div className='bg-white rounded-2xl shadow-lg overflow-hidden'>
              {/* Header */}
              <div className='px-6 pt-6 pb-4 border-b border-gray-100'>
                <h3 className='text-xl font-bold text-gray-800 mb-4'>
                  Daftar Volunteer
                </h3>
                <StepBar current={step} total={STEPS.length} />
              </div>

              {/* Step content */}
              <div
                ref={contentRef}
                className='px-6 py-6 overflow-y-auto max-h-[65vh]'
              >
                {step === 0 && (
                  <StepDataDiri data={formData} setData={setFormData} />
                )}
                {step === 1 && (
                  <StepKetersediaan
                    data={availability}
                    setData={setAvailability}
                  />
                )}
                {step === 2 && (
                  <StepMotivasi data={motivation} setData={setMotivation} />
                )}
                {step === 3 && <StepPeran data={role} setData={setRole} />}
                {step === 4 && (
                  <StepSituasional
                    data={situational}
                    setData={setSituational}
                  />
                )}
                {step === 5 && (
                  <StepKomitmen
                    commitment={commitment}
                    setCommitment={setCommitment}
                    additional={additional}
                    setAdditional={setAdditional}
                    instagramProof={instagramProof}
                    setInstagramProof={setInstagramProof}
                    cvPortfolio={cvPortfolio}
                    setCvPortfolio={setCvPortfolio}
                  />
                )}
              </div>

              {/* Error */}
              {errorMsg && (
                <div className='mx-6 mb-2 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700 flex items-start gap-2'>
                  <span className='flex-shrink-0'>⚠️</span>
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Navigation */}
              <div className='px-6 py-4 border-t border-gray-100 flex items-center justify-between'>
                <button
                  type='button'
                  onClick={prevStep}
                  disabled={step === 0}
                  className='px-5 py-2.5 text-sm font-medium text-gray-600 border border-gray-300 rounded-xl hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors'
                >
                  ← Sebelumnya
                </button>

                <span className='text-xs text-gray-400 font-medium hidden sm:block'>
                  {STEPS[step].label}
                </span>

                {step < STEPS.length - 1 ? (
                  <button
                    type='button'
                    onClick={nextStep}
                    className='px-5 py-2.5 text-sm font-medium bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors'
                  >
                    Lanjut →
                  </button>
                ) : (
                  <button
                    type='button'
                    onClick={handleSubmit}
                    disabled={loading}
                    className={`px-6 py-2.5 text-sm font-medium text-white rounded-xl transition-colors ${
                      loading
                        ? 'bg-slate-300 cursor-not-allowed'
                        : 'bg-green-600 hover:bg-green-700'
                    }`}
                  >
                    {loading ? 'Mengirim...' : '✓ Kirim Pendaftaran'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
