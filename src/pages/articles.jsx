import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../component/navbar';
import Footer from '../component/Footer';

import TeamImage from '../assets/images/bg/home-hero.png';
import LiputanMediaImage from '../assets/images/bg/liputan-media.jpg';

// Urutan hero grid = urutan section di halaman + menyertakan ikon supergrafis
const modules = [
  {
    name: 'Ruang Pulih',
    sub: 'Ruang Aman untuk Belajar',
    bg: '#3A8FA3    ',
    href: '#ruang-pulih',
    icon: 'uil-heart-sign',
  },
  {
    name: 'Seni Merasa',
    sub: 'Belajar Memahami Perasaan',
    bg: '#D45B5B',
    href: '#seni-merasa',
    icon: 'uil-palette',
  },
  {
    name: 'Sains & Karakter',
    sub: 'Belajar Cara Otak Bekerja',
    bg: '#2D6FA4',
    href: '#sains-karakter',
    icon: 'uil-brain',
  },
  {
    name: 'Nutrisi Kognitif',
    sub: 'Makanan untuk Otak yang Sehat',
    bg: '#D4690A',
    href: '#nutrisi-kognitif',
    icon: 'uil-heart-medical',
  },
  {
    name: 'Napas Logika',
    sub: 'Belajar Berpikir Tenang dan Jelas',
    bg: '#7B68C8',
    href: '#napas-logika',
    icon: 'uil-wind',
  },
  {
    name: 'Liputan Media',
    sub: 'Cerita dan Dokumentasi Kegiatan',
    bg: '#2E8B57',
    href: '#liputan-media',
    icon: 'uil-megaphone',
  },
];

// Section colour palettes
const PALETTES = {
  'ruang-pulih': {
    left: '#245966',
    right: '#3A8FA3    ',
    accent: '#A1D6E2',
    textCta: '#ffffff',
  },
  'sains-karakter': {
    left: '#1D476A',
    right: '#2D6FA4',
    accent: '#90CAF9',
    textCta: '#ffffff',
  },
  'napas-logika': {
    left: '#4E4282',
    right: '#7B68C8',
    accent: '#CE93D8',
    textCta: '#ffffff',
  },
  'seni-merasa': {
    left: '#873A3A',
    right: '#D45B5B',
    accent: '#EF9A9A',
    textCta: '#ffffff',
  },
  'nutrisi-kognitif': {
    left: '#874306',
    right: '#D4690A',
    accent: '#FFCC80',
    textCta: '#ffffff',
  },
  'liputan-media': {
    left: '#1E5938',
    right: '#2E8B57',
    accent: '#A5D6A7',
    textCta: '#ffffff',
  },
};

const ruangPulihArticles = [
  {
    author: 'Anastasia Tantri',
    title: 'Belajar untuk Tetap Manusiawi',
    excerpt:
      'Di tengah berbagai kritik tentang ketertinggalan pendidikan, muncul pertanyaan yang lebih mendasar: tertinggal dari apa, dan siapa yang tertinggal dalam cara kita berpikir? Tulisan ini mengajak kita melihat pendidikan bukan semata sebagai sistem pencetak capaian, tetapi sebagai proses pembentukan cara manusia memahami diri, relasi sosial, dan realitasnya.',
    pdfUrl: '/pdfs/Ruang-Pulih-1.pdf',
  },
  {
    author: "Mohammad Imam Ma'ruf, M.Sc.",
    title: 'Memerdekakan Nalar dari Belenggu Kecemasan Kolektif',
    excerpt:
      'Di balik peringatan Hari Pendidikan Nasional, Indonesia menghadapi ancaman senyap berupa kecemasan kolektif yang membelenggu nalar, melemahkan daya lenting, dan menggerus ketahanan bangsa. Melalui gerakan Rewiring Hope, pendidikan dipandang sebagai upaya memulihkan kejernihan berpikir dan keberanian bertindak, fondasi penting bagi kemerdekaan manusia yang utuh dan bangsa yang tangguh.',
    pdfUrl: '/pdfs/Ruang-Pulih-2.pdf',
  },
];

const sainsArticles = [
  {
    author: 'Dr. Lies Budyana',
    title: 'Memproses dan Merespons Rasa Bersalah',
    // excerpt: 'Rasa bersalah, ketika diproses dengan benar, bisa menjadi bahan bakar pertumbuhan moral yang paling murni — bukan sebagai hukuman, melainkan sebagai undangan untuk menjadi lebih baik.',
    // pdfUrl: '/pdfs/Sains-Karakter-1.pdf',
  },
  {
    author: 'Dr. Lies Budyana',
    title: 'Belajar di Zaman yang Melelahkan',
    // excerpt: 'Di era informasi yang bergerak secepat cahaya, belajar bukan lagi sekadar menyerap pengetahuan. Ia menjadi seni mengelola energi kognitif yang terus terkuras setiap harinya.',
    // pdfUrl: '/pdfs/Sains-Karakter-2.pdf',
  },
];

const napasArticles = [
  {
    author: "Mohammad Imam Ma'ruf, M.Sc.",
    title: 'Menjaga Nalar di tengah Kepungan AI',
    excerpt:
      'Di tengah kemudahan yang ditawarkan AI, manusia perlahan kehilangan kebiasaan berpikir kritis dan reflektif. Bukan karena teknologi salah, tetapi karena kita mulai berhenti mempertanyakan dan terlalu cepat menerima jawaban yang terlihat rapi.',
    pdfUrl: '/pdfs/Napas-Logika-1.pdf',
  },
  {
    author: "Mohammad Imam Ma'ruf, M.Sc.",
    title:
      'Menyalakan Api, Bukan Sekadar Mengisi Presensi: Menggugat Panggilan Sejati Seorang Dosen',
    excerpt:
      'Di tengah pembangunan fisik yang terus meningkat, kita sering melupakan peran dosen sebagai perancang cara berpikir generasi yang akan mengelolanya. Lebih dari sekadar pengajar, dosen adalah penjaga akal sehat, pembentuk karakter, dan penggerak perubahan yang menjaga agar ilmu tetap manusiawi dan berdampak nyata.',
    pdfUrl: '/pdfs/Napas-Logika-2.pdf',
  },
];

const seniMerasaQuotes = [
  'Dunia mungkin menuntut kita untuk selalu cepat dan presisi, namun manusia punya ritmenya sendiri.',
  'Hidup yang penuh rasa adalah tentang memberi validasi pada setiap emosi yang muncul.',
  'Lewat lensa neurosains, kita akan menemukan bahwa saat kita berani merasa, kita sebenarnya sedang membangun fondasi keberanian yang paling hakiki.',
  'Karena pada akhirnya, menjadi manusiawi adalah seni yang paling indah.',
];

const liputanArticles = [
  {
    source: 'Newsletter World Women in Neuroscience',
    meta: 'Anastasia Tanti, (2024, April). Rewiring Hope Reflection',
    title: 'Newsletter World Women in Neuroscience',
    excerpt:
      'Dengan fokus pada Work–Life Integration, menerbitkan tulisan dari Anastasia Tantri, pendiri Rewiring Hope, yang merefleksikan lahirnya gerakan ini dari pengalaman mendampingi anak-anak dan pendidik yang kehilangan rasa aman, harapan, dan makna dalam proses belajar. Melalui lensa neurosains, tulisan ini menegaskan pentingnya menghadirkan pemahaman tentang otak ke ruang kelas, keluarga, dan kehidupan sehari-hari sebagai fondasi pemulihan emosional, daya lenting, serta keberlanjutan hidup yang lebih manusiawi.',
    pdfUrl:
      'https://mcusercontent.com/9bd9526e5ea559025592c0735/files/358c67e5-63db-0c10-1dbc-4281b06e0f3e/Rewiring_Hope__Brain_Awareness_Week_Anastasia_Tantri.pdf?',
  },
  {
    source: 'RRI Semarang — Studio Pro 3',
    meta: '30 Maret 2025, Studio Pro 3 RRI Semarang',
    title: 'Relasional: Membangun Rasa Aman sebagai Fondasi Pendidikan Anak',
    excerpt:
      'Diskusi tentang konsep belajar relasional ini disampaikan dalam dialog di Studio Pro 2 RRI Semarang pada Senin pagi, 30 Maret 2026. Percakapan membahas bagaimana rasa aman, relasi emosional, dan kehadiran pendidik menjadi fondasi penting dalam pendidikan modern, terutama di tengah meningkatnya kecemasan pada anak dan remaja.',
    link: 'https://rri.co.id/yogyakarta/iptek/2387470/inisiatif-neuroeducation-perkuat-budaya-belajar-dan-manusia',
  },
];

// ─── SHARED COMPONENTS ─────────────────────────────────────────────────────────

function ArrowBtn() {
  return (
    <button className='size-12 rounded-full border flex items-center justify-center transition-all duration-300 cursor-pointer border-white/20 text-white hover:bg-white hover:text-dark hover:border-white'>
      <i className='uil uil-arrow-right text-xl' />
    </button>
  );
}

function SectionShell({
  id,
  tag,
  title,
  quote,
  icon,
  leftStyle = {},
  rightStyle = {},
  minH = 580,
  p,
  children,
}) {
  const borderDiv = 'rgba(255,255,255,0.08)';

  return (
    <section id={id} className='relative overflow-hidden block m-0 p-0'>
      <div className={`flex flex-col lg:flex-row h-full lg:min-h-[580px]`}>
        {/* LEFT — Title & Supergraphic */}
        <div
          className='lg:w-5/12 flex flex-col justify-end p-10 lg:p-16 gap-4 relative overflow-hidden '
          style={{ borderRight: `1px solid ${borderDiv}`, ...leftStyle }}
        >
          {icon && (
            <i
              className={`uil ${icon} absolute -top-10 -left-12 text-[15rem] lg:text-[20rem] text-white/[0.04] pointer-events-none select-none`}
            />
          )}

          {tag && (
            <p className='font-inter text-xs font-semibold uppercase tracking-[0.3em] relative z-10 text-white/45'>
              {tag}
            </p>
          )}
          <h2
            className='font-rubik font-black leading-none text-white relative z-10'
            style={{
              fontSize: 'clamp(3.2rem, 6.5vw, 5.5rem)',
              lineHeight: 0.93,
            }}
          >
            {title}
          </h2>
          {quote && (
            <blockquote
              className='font-inter text-sm italic leading-relaxed pl-4 max-w-xs mt-1 text-white/85 relative z-10'
              style={{ borderLeft: `2px solid ${p.accent}` }}
            >
              {quote}
            </blockquote>
          )}
        </div>

        {/* RIGHT — Content */}
        <div
          className='lg:w-7/12 flex flex-col justify-center p-10 lg:p-16 gap-8 relative z-10'
          style={rightStyle}
        >
          {children}
        </div>
      </div>
    </section>
  );
}

// ─── PDF MODAL VIEWER ──────────────────────────────────────────────────────────
// Taruh file PDF di public/pdfs/ lalu isi pdfUrl dengan '/pdfs/nama-file.pdf'
// Parameter #toolbar=0&navpanes=0 menyembunyikan toolbar download bawaan browser

function PdfModal({ url, title, onClose }) {
  // Tutup modal saat tekan Escape
  const handleKey = useCallback(
    (e) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose],
  );
  useEffect(() => {
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [handleKey]);

  const iframeSrc = `${url}#toolbar=0&navpanes=0&scrollbar=0`;

  return (
    <div
      className='fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 p-4 sm:p-6 md:p-10 cursor-pointer animate-fade-in'
      onClick={onClose} // Klik di area overlay hitam ini akan menutup modal
    >
      {/* Container Box Modal */}
      <div
        className='relative w-full max-w-4xl h-[80vh] md:h-[85vh] flex flex-col bg-[#141414] rounded-xl border border-white/10 shadow-2xl overflow-hidden cursor-default'
        onClick={(e) => e.stopPropagation()} // Mencegah modal tertutup saat area dalam PDF diklik
      >
        {/* Header bar */}
        <div className='flex items-center justify-between px-5 py-3.5 shrink-0 bg-[#1a1a1a] border-b border-white/10'>
          <span className='font-inter text-sm font-medium text-white/80 truncate max-w-[60vw] md:max-w-[70vw]'>
            {title}
          </span>

          {/* Tombol Close */}
          <button
            onClick={onClose}
            className='size-9 flex items-center justify-center rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors ml-4 shrink-0 cursor-pointer'
            aria-label='Tutup'
          >
            <i className='uil uil-times text-2xl' />
          </button>
        </div>

        {/* PDF iframe */}
        <div className='flex-1 bg-[#f4f4f4] overflow-hidden'>
          <iframe
            src={iframeSrc}
            title={title}
            className='w-full h-full border-0'
            style={{ display: 'block' }}
          />
        </div>
      </div>
    </div>
  );
}

function ArticlesList({ articles, p, ctaText, onOpenPdf }) {
  return (
    <>
      {articles.map((a, i) => {
        return (
          <div
            key={i}
            className={i < articles.length - 1 ? 'pb-8' : ''}
            style={{
              borderBottom:
                i < articles.length - 1
                  ? `1px solid rgba(255,255,255,0.4)`
                  : 'none',
            }}
          >
            {a.meta && (
              <p className='font-inter text-xs italic mt-4 mb-1 text-white/35'>
                {a.meta}
              </p>
            )}
            <h3 className='font-rubik font-semibold text-xl text-white leading-tight mb-3'>
              {a.title}
            </h3>
            {a.author && (
              <p className='font-inter text-xs font-medium uppercase tracking-[0.12em] text-white mb-4 bg-black/10 px-2 py-1 w-fit'>
                Penulis: {a.author}
              </p>
            )}
            <p className='font-inter text-sm text-white/80 leading-relaxed mb-4'>
              {a.excerpt}
            </p>
            {a.link ? (
              <a
                href={a.link}
                target='_blank'
                rel='noopener noreferrer'
                className='hover:underline font-inter text-sm font-medium inline-flex items-center gap-1 hover:opacity-70 transition-opacity cursor-pointer bg-transparent border-0 p-0'
                style={{ color: p.textCta }}
              >
                {ctaText || 'Baca selengkapnya, klik di sini.'}{' '}
                <i className='uil uil-arrow-right text-base' />
              </a>
            ) : a.pdfUrl ? (
              <button
                onClick={() => onOpenPdf({ url: a.pdfUrl, title: a.title })}
                className='hover:underline font-inter text-sm font-medium inline-flex items-center gap-1 hover:opacity-70 transition-opacity cursor-pointer bg-transparent border-0 p-0'
                style={{ color: p.textCta }}
              >
                {ctaText || 'Baca selengkapnya, klik di sini.'}{' '}
                <i className='uil uil-arrow-right text-base' />
              </button>
            ) : (
              <span
                className='font-inter text-sm font-medium inline-flex items-center gap-1 opacity-40 cursor-not-allowed'
                style={{ color: p.textCta }}
                title='PDF belum tersedia'
              >
                {ctaText || 'Baca selengkapnya, klik di sini.'}{' '}
                <i className='uil uil-arrow-right text-base' />
              </span>
            )}
          </div>
        );
      })}
    </>
  );
}

// ─── PAGE ──────────────────────────────────────────────────────────────────────

export default function ArticlesPage() {
  const [visible, setVisible] = useState(false);
  const [activePdf, setActivePdf] = useState(null);

  useEffect(() => {
    const handleScroll = () =>
      setVisible(document.documentElement.scrollTop > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOpenPdf = (pdfData) => {
    setActivePdf(pdfData);
  };

  const rp = PALETTES['ruang-pulih'];
  const sk = PALETTES['sains-karakter'];
  const nl = PALETTES['napas-logika'];
  const sm = PALETTES['seni-merasa'];
  const nk = PALETTES['nutrisi-kognitif'];
  const lm = PALETTES['liputan-media'];

  return (
    <>
      <div className='flex flex-col min-h-screen md:mt-10'>
        <Navbar />

        {/* ─── 1. HERO ─── */}
        <section
          id='home'
          className='flex flex-col lg:flex-row w-full m-0 p-0 overflow-hidden bg-amber-500 lg:min-h-screen'
        >
          {/* Left: brand panel dengan full background image */}
          <div
            className='lg:w-1/2 relative flex flex-col overflow-hidden'
            style={{ minHeight: '50vh' }}
          >
            {/* Background Image */}
            <img
              src={TeamImage}
              alt='Tim Rewiring Hope'
              className='absolute inset-0 w-full h-full object-cover object-top z-0 mt-4 lg:mt-10'
            />

            {/* JIKA TEKS SULIT DIBACA: Hapus komentar baris di bawah ini untuk menambah overlay gelap tipis */}
            <div className='absolute inset-0 bg-gradient-to-tr from-black to-transparent opacity-20'></div>

            {/* Content */}
            <div className='relative z-20 pt-80 lg:pt-32 px-10 lg:px-14 pb-10'>
              <h1 className='text-white leading-none font-bold text-4xl md:text-7xl'>
                Rewiring Hope
              </h1>
              <p
                className='text-white/85 font-inter font-semibold uppercase mt-3'
                style={{
                  fontSize: 'clamp(0.55rem, 1.2vw, 0.75rem)',
                  letterSpacing: '0.22em',
                }}
              >
                Karena Bertumbuh adalah Proses Dirawat
              </p>
            </div>
          </div>

          {/* Right: module grid */}
          <div
            className='lg:w-1/2 grid grid-cols-2'
            style={{ gridTemplateRows: 'repeat(3, 1fr)' }}
          >
            {modules.map((mod, i) => (
              <button
                key={i}
                onClick={() => scrollTo(mod.href)}
                className='h-full relative flex flex-col items-center justify-center text-center p-6 cursor-pointer hover:brightness-110 transition-all duration-300 focus:outline-none overflow-hidden m-0'
                style={{ backgroundColor: mod.bg }}
              >
                {/* Background Supergraphic Icon for Module Tiles */}
                {mod.icon && (
                  <i
                    className={`uil ${mod.icon} absolute -bottom-6 -right-6 text-[7rem] lg:text-[10rem] text-white/[0.04] pointer-events-none select-none`}
                  />
                )}

                <span
                  className='text-white leading-tight mb-2 relative z-10'
                  style={{
                    fontFamily: 'var(--font-dancing)',
                    fontSize: 'clamp(1.4rem, 2.8vw, 2.1rem)',
                    fontWeight: 700,
                  }}
                >
                  {mod.name}
                </span>
                <span className='text-white/85 font-inter text-xs lg:text-sm leading-snug relative z-10'>
                  {mod.sub}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* ─── 2. RUANG PULIH ─── */}
        <SectionShell
          id='ruang-pulih'
          tag='Catatan Pemikiran'
          title={
            <>
              RUANG
              <br />
              PULIH
            </>
          }
          quote='“Pendidikan bukan hanya perkara mengajar, namun tentang membangun hubungan yang memulihkan.”'
          icon='uil-heart-sign'
          leftStyle={{ background: rp.left }}
          rightStyle={{ background: rp.right }}
          p={rp}
        >
          <ArticlesList
            onOpenPdf={handleOpenPdf}
            articles={ruangPulihArticles}
            p={rp}
          />
          {/* <div className="flex justify-end"><ArrowBtn /></div> */}
        </SectionShell>

        {/* ─── 3. SAINS & KARAKTER ─── */}
        <SectionShell
          id='sains-karakter'
          tag='Catatan Refleksi'
          title={
            <>
              SAINS &amp;
              <br />
              KARAKTER
            </>
          }
          quote='"Kadang kita tidak butuh jawaban baru, hanya cara berpikir yang lebih jernih."'
          icon='uil-brain'
          leftStyle={{ background: sk.left }}
          rightStyle={{ background: sk.right }}
          p={sk}
        >
          <ArticlesList
            onOpenPdf={handleOpenPdf}
            articles={sainsArticles}
            p={sk}
          />
          {/* <div className="flex justify-end"><ArrowBtn /></div> */}
        </SectionShell>

        {/* ─── 4. NAPAS LOGIKA ─── */}
        <SectionShell
          id='napas-logika'
          // tag="Napas Logika"
          title={
            <>
              NAPAS
              <br />
              LOGIKA
            </>
          }
          quote='"Menemukan kembali cara berpikir yang utuh."'
          icon='uil-wind'
          leftStyle={{ background: nl.left }}
          rightStyle={{ background: nl.right }}
          p={nl}
        >
          <ArticlesList
            onOpenPdf={handleOpenPdf}
            articles={napasArticles}
            p={nl}
          />
          {/* <div className="flex justify-end"><ArrowBtn /></div> */}
        </SectionShell>

        {/* ─── 5. SENI MERASA ─── */}
        <SectionShell
          id='seni-merasa'
          // tag="Seni Merasa"
          title={
            <>
              SENI
              <br />
              MERASA
            </>
          }
          quote='Saat Otak Menemukan Jantungnya'
          icon='uil-palette'
          leftStyle={{ background: sm.left }}
          rightStyle={{ background: sm.right }}
          p={sm}
        >
          <div className='flex flex-col gap-5'>
            {seniMerasaQuotes.map((q, i) => (
              <blockquote
                key={i}
                className='font-rubik italic text-white/90 text-base lg:text-lg leading-relaxed pl-5 py-1'
                style={{ borderLeft: `2px solid ${sm.accent}` }}
              >
                "{q}"
              </blockquote>
            ))}
          </div>
          {/* <div className="flex justify-end mt-2"><ArrowBtn /></div> */}
        </SectionShell>

        {/* ─── 6. NUTRISI KOGNITIF ─── */}
        <SectionShell
          id='nutrisi-kognitif'
          // tag="Nutrisi Kognitif"
          title={
            <>
              NUTRISI
              <br />
              KOGNITIF
            </>
          }
          // quote='"Setiap suapan adalah keputusan tentang bagaimana otak kita akan bekerja esok hari."'
          icon='uil-apple'
          leftStyle={{ background: nk.left }}
          rightStyle={{ background: nk.right }}
          p={nk}
        >
          <ArticlesList
            onOpenPdf={handleOpenPdf}
            articles={[
              {
                author: 'Marina Hardiyanti, Nutritionist dan Akademisi',
                title:
                  'Apa yang harus ada di piring supaya otak kita bisa bekerja dengan nyaman dan memaksimalkan kapabilitasnya?',
                excerpt:
                  'Lebih dari sekadar diet, pilihan makanan harian adalah bentuk investasi jangka panjang bagi otak dan kualitas hidup manusia. Dari peran asam lemak omega-3, sayuran hijau, buah-buahan berwarna, hingga pola makan MIND dan hidrasi yang sering terabaikan, seluruhnya berperan dalam menjaga kesehatan kognitif, kestabilan emosi, dan ketahanan otak di sepanjang kehidupan.',
                pdfUrl: '/pdfs/Nutrisi-Kognitif-1.pdf',
              },
            ]}
            p={nk}
            ctaText='Baca selengkapnya, klik di sini.'
          />
          {/* <div className="flex justify-end"><ArrowBtn /></div> */}
        </SectionShell>

        {/* ─── 7. LIPUTAN MEDIA (Tata Letak Khusus) ─── */}
        <section
          id='liputan-media'
          className='relative overflow-hidden block m-0 p-0'
          style={{ background: lm.left }}
        >
          <div className='flex flex-col lg:flex-row' style={{ minHeight: 580 }}>
            {/* Left: title + articles */}
            <div className='lg:w-7/12 flex flex-col justify-center p-10 lg:p-16 gap-8 relative overflow-hidden'>
              <i className='uil uil-megaphone absolute -top-10 -right-10 text-[18rem] lg:text-[24rem] text-white/[0.03] pointer-events-none select-none' />

              <div className='relative z-10'>
                <h2
                  className='font-rubik font-black text-white leading-none'
                  style={{
                    fontSize: 'clamp(3.2rem, 6.5vw, 5.5rem)',
                    lineHeight: 0.93,
                  }}
                >
                  LIPUTAN
                  <br />
                  MEDIA
                </h2>
                <div
                  style={{
                    width: 36,
                    height: 3,
                    background: lm.accent,
                    borderRadius: 2,
                    marginTop: 16,
                  }}
                />
              </div>
              <div className='relative z-10'>
                <ArticlesList
                  onOpenPdf={handleOpenPdf}
                  articles={liputanArticles}
                  p={lm}
                  ctaText='Baca selengkapnya, klik di sini.'
                />
              </div>
              {/* <div className="flex justify-end relative z-10"><ArrowBtn /></div> */}
            </div>

            {/* Right: photo */}
            <div
              className='lg:w-5/12 min-h-[300px] relative grayscale'
              style={{
                backgroundImage: `url(${LiputanMediaImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div
                className='absolute inset-0'
                style={{ background: 'rgba(30,89,56,0.0)' }}
              />
            </div>
          </div>
        </section>

        {/* Back to top */}
        <Link
          to='#'
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          id='back-to-top'
          className='back-to-top fixed text-lg rounded-full z-10 bottom-16 end-5 h-9 w-9 text-center bg-primary text-white leading-9'
          style={{ display: visible ? 'inline' : 'none' }}
        >
          <i className='uil uil-arrow-up' />
        </Link>

        {activePdf && (
          <PdfModal
            url={activePdf.url}
            title={activePdf.title}
            onClose={() => setActivePdf(null)}
          />
        )}

        <Footer />
      </div>
    </>
  );
}
