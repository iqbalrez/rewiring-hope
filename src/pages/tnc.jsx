import React, { useMemo, useState } from 'react';
import Navbar from '../component/navbar';

export default function TermsAndConditionsPage() {
  const [lang, setLang] = useState('id'); // "id" | "en"

  const content = useMemo(() => {
    const id = {
      title: 'Syarat & Ketentuan',
      subtitle: 'Pembelian Tiket Seminar “Teaching The Healing Brain”',
      orgLine: 'Rewiring Hope (rewiringhope.or.id)',
      updated: 'Terakhir diperbarui: ',
      updatedValue: '25 Januari 2026',
      intro:
        'Dengan melakukan pembelian tiket melalui website rewiringhope.or.id, pengguna dianggap telah membaca, memahami, dan menyetujui seluruh Syarat & Ketentuan berikut.',
      sections: [
        {
          h: '1. Definisi',
          p: [
            '“Penyelenggara” adalah pihak pengelola kegiatan seminar “Teaching The Healing Brain” yang menyediakan penjualan tiket melalui website rewiringhope.or.id.',
            '“Pembeli/Pengguna” adalah pihak yang melakukan transaksi pembelian tiket melalui website.',
            '“Tiket” adalah akses resmi untuk mengikuti seminar sesuai kategori tiket yang dipilih.',
            '“Payment Gateway” adalah layanan pihak ketiga untuk proses pembayaran, termasuk Midtrans beserta metode pembayaran yang tersedia.',
          ],
        },
        {
          h: '2. Ketentuan Umum Pembelian Tiket',
          p: [
            'Tiket seminar hanya dapat dibeli melalui kanal resmi rewiringhope.or.id.',
            'Pembeli wajib mengisi data diri dengan benar, termasuk nama lengkap, email, dan nomor WhatsApp aktif untuk kebutuhan informasi transaksi dan konfirmasi acara.',
            'Setelah transaksi berhasil, sistem akan menerbitkan bukti pembayaran dan/atau tiket sesuai mekanisme yang berlaku pada website.',
          ],
        },
        {
          h: '3. Harga dan Kategori Tiket',
          p: [
            'Harga tiket yang ditampilkan di website adalah harga yang berlaku saat transaksi dilakukan.',
            'Setiap kategori tiket memiliki kuota terbatas dan dapat ditutup sewaktu-waktu apabila kuota telah terpenuhi.',
            'Penyelenggara berhak mengubah harga atau kategori tiket sebelum transaksi dibayarkan. Namun perubahan tidak berlaku untuk transaksi yang sudah berhasil.',
          ],
        },
        {
          h: '4. Metode Pembayaran',
          p: [
            'Pembayaran dilakukan melalui sistem Midtrans menggunakan metode yang tersedia (contoh: Virtual Account, QRIS, e-wallet, kartu, dan metode lain yang didukung).',
            'Pembeli wajib menyelesaikan pembayaran sesuai batas waktu yang ditentukan pada sistem pembayaran.',
            'Apabila pembayaran tidak dilakukan sampai batas waktu berakhir, transaksi dianggap batal secara otomatis.',
          ],
        },
        {
          h: '5. Status Transaksi',
          p: [
            'Transaksi dinyatakan berhasil apabila status pembayaran pada sistem Midtrans dan/atau sistem website menunjukkan “Paid/Lunas/Success”.',
            'Apabila Pembeli sudah membayar tetapi belum mendapatkan tiket, Pembeli dapat menghubungi Penyelenggara dengan melampirkan nama pembeli, email/nomor WhatsApp, nomor order/invoice, dan bukti pembayaran.',
          ],
        },
        {
          h: '6. Pengiriman Tiket dan Akses Acara',
          p: [
            'Tiket dan/atau akses seminar akan dikirimkan melalui email yang terdaftar, dan/atau WhatsApp yang terdaftar',
            'Pembeli bertanggung jawab memastikan email dan nomor WhatsApp yang diinput aktif serta dapat dihubungi.',
            'Tiket hanya berlaku untuk 1 (satu) peserta sesuai transaksi, kecuali dinyatakan lain pada kategori tiket.',
          ],
        },
        {
          h: '7. Kebijakan Pembatalan, Refund, dan Reschedule',
          p: [
            'Tiket yang telah dibeli pada prinsipnya bersifat non-refundable (tidak dapat dikembalikan), kecuali dalam kondisi tertentu yang disetujui oleh Penyelenggara.',
            'Refund dapat dipertimbangkan apabila acara dibatalkan oleh Penyelenggara, terjadi transaksi ganda akibat gangguan sistem pembayaran yang terbukti sah, atau kondisi khusus lain yang disetujui Penyelenggara secara tertulis.',
            'Apabila acara diundur/dijadwalkan ulang (reschedule), tiket tetap berlaku pada jadwal yang baru.',
            'Proses refund (jika disetujui) dapat memerlukan waktu hingga 14 hari kerja atau mengikuti ketentuan bank/penyedia pembayaran.',
            'Biaya administrasi pihak ketiga (jika ada) dapat mengikuti ketentuan sistem pembayaran yang digunakan.',
          ],
        },
        {
          h: '8. Pembatalan oleh Penyelenggara',
          p: [
            'Penyelenggara berhak membatalkan acara apabila terjadi kondisi tertentu di luar kendali Penyelenggara (force majeure) seperti bencana alam, kebijakan pemerintah, gangguan keamanan, atau gangguan sistem berskala besar.',
            'Jika acara dibatalkan, Penyelenggara akan menginformasikan melalui kanal resmi serta menjelaskan opsi yang tersedia (refund atau reschedule).',
          ],
        },
        {
          h: '9. Tata Tertib Peserta',
          p: [
            'Peserta wajib mengikuti peraturan dan ketertiban selama acara berlangsung.',
            'Penyelenggara berhak menolak akses peserta apabila terdapat penyalahgunaan tiket atau tindakan yang mengganggu jalannya acara.',
            'Pembatalan akses akibat pelanggaran tata tertib tidak berhak mendapatkan refund.',
          ],
        },
        {
          h: '10. Larangan Penipuan dan Penyalahgunaan',
          p: [
            'Pembeli dilarang melakukan tindakan penipuan, manipulasi transaksi, atau penggunaan metode pembayaran yang bukan miliknya.',
            'Penyelenggara berhak membatalkan transaksi jika terdapat indikasi kecurangan atau pelanggaran hukum.',
          ],
        },
        {
          h: '11. Perlindungan Data Pribadi',
          p: [
            'Penyelenggara mengumpulkan data seperlunya untuk kebutuhan transaksi dan penyelenggaraan acara (nama, email, nomor WhatsApp, dan informasi pembayaran).',
            'Data peserta dijaga kerahasiaannya dan tidak diperjualbelikan kepada pihak lain.',
            'Pemrosesan pembayaran dilakukan oleh pihak ketiga (Midtrans dan mitra pembayaran terkait) sesuai kebijakan masing-masing.',
          ],
        },
        {
          h: '12. Batasan Tanggung Jawab',
          p: [
            'Penyelenggara tidak bertanggung jawab atas kerugian yang timbul akibat kesalahan data yang diinput oleh Pembeli.',
            'Penyelenggara tidak bertanggung jawab atas gangguan layanan pihak ketiga (bank, QRIS, e-wallet, jaringan internet, atau sistem di luar kendali).',
            'Penyelenggara tidak menjamin keberhasilan transaksi apabila terjadi gangguan sistem pada pihak ketiga.',
          ],
        },
        {
          h: '13. Layanan Bantuan dan Kontak Resmi',
          p: [
            'Untuk pertanyaan atau kendala terkait pembelian tiket, Pembeli dapat menghubungi:',
          ],
          contact: {
            emailLabel: 'Email',
            email: 'info@rewiringhope.or.id',
            waLabel: 'WhatsApp',
            wa: '+62-896-888-333-07',
            siteLabel: 'Website',
            site: 'rewiringhope.or.id',
            hoursLabel: 'Jam layanan',
            hours: '08.00-16.00 WIB',
          },
        },
        {
          h: '14. Perubahan Syarat & Ketentuan',
          p: [
            'Penyelenggara berhak mengubah Syarat & Ketentuan ini sewaktu-waktu untuk menyesuaikan layanan, regulasi, dan kebijakan penyelenggaraan. Versi terbaru akan ditampilkan pada website rewiringhope.or.id.',
          ],
        },
      ],
      ctaTitle: 'Kembali ke Home',
      langLabel: 'Bahasa',
      btnId: 'Indonesia',
      btnEn: 'English',
    };

    const en = {
      title: 'Terms & Conditions',
      subtitle: 'Ticket Purchase for “Teaching The Healing Brain” Seminar',
      orgLine: 'Rewiring Hope (rewiringhope.or.id)',
      updated: 'Last updated: ',
      updatedValue: '25 January 2026',
      intro:
        'By purchasing a ticket via rewiringhope.or.id, you confirm that you have read, understood, and agreed to the Terms & Conditions below.',
      sections: [
        {
          h: '1. Definitions',
          p: [
            '“Organizer” refers to the party managing the “Teaching The Healing Brain” seminar and selling tickets via rewiringhope.or.id.',
            '“Buyer/User” refers to any person who completes a ticket purchase transaction on the website.',
            '“Ticket” means the official access to attend the seminar according to the selected ticket category.',
            '“Payment Gateway” refers to third-party payment processing services, including Midtrans and its supported payment methods.',
          ],
        },
        {
          h: '2. General Ticket Purchase Terms',
          p: [
            'Tickets are sold only through the official channel at rewiringhope.or.id.',
            'Buyers must provide accurate personal information, including full name, email address, and an active WhatsApp number for transaction and event confirmation purposes.',
            'After a successful transaction, the system will issue proof of payment and/or a ticket according to the website’s mechanism.',
          ],
        },
        {
          h: '3. Pricing and Ticket Categories',
          p: [
            'Ticket prices shown on the website are valid at the time of purchase.',
            'Each ticket category has limited availability and may close once quota is reached.',
            'The Organizer may change pricing or categories prior to payment completion. Changes do not apply to transactions already successfully paid.',
          ],
        },
        {
          h: '4. Payment Methods',
          p: [
            'Payments are processed via Midtrans using available methods (e.g., Virtual Account, QRIS, e-wallets, cards, and other supported methods).',
            'Buyers must complete payment within the payment deadline shown in the payment system.',
            'If payment is not completed before the deadline, the transaction may be automatically cancelled.',
          ],
        },
        {
          h: '5. Transaction Status',
          p: [
            'A transaction is considered successful when Midtrans and/or the website shows a “Paid/Success” status.',
            'If the Buyer has paid but the ticket has not received, the Buyer may contact the Organizer and provide the Buyer’s name, email/WhatsApp, order/invoice number, and proof of payment.',
          ],
        },
        {
          h: '6. Ticket Delivery and Event Access',
          p: [
            'Tickets and/or event access details will be delivered via the registered email and/or WhatsApp.',
            'Buyers are responsible for ensuring the submitted email and WhatsApp number are active and reachable.',
            'One ticket is valid for one participant per transaction unless stated otherwise in the ticket category.',
          ],
        },
        {
          h: '7. Cancellation, Refund, and Reschedule Policy',
          p: [
            'Tickets are generally non-refundable, except in certain cases approved by the Organizer.',
            'Refunds may be considered if the event is cancelled by the Organizer, duplicate transactions occur due to verified payment system issues, or other special cases approved by the Organizer in writing.',
            'If the event is rescheduled, tickets remain valid for the new schedule.',
            'If approved, refunds may take up to 14 business days or follow bank/payment provider timelines.',
            'Third-party processing/administration fees (if any) may follow the rules of the payment method used.',
          ],
        },
        {
          h: '8. Cancellation by the Organizer',
          p: [
            'The Organizer may cancel the event due to circumstances beyond the Organizer’s control (force majeure), such as natural disasters, government policies, security issues, or major system disruptions.',
            'If the event is cancelled, the Organizer will announce it via official channels and explain available options (refund or reschedule).',
          ],
        },
        {
          h: '9. Participant Conduct',
          p: [
            'Participants must follow the event rules and maintain proper conduct during the event.',
            'The Organizer may deny access if there is ticket misuse or behavior that disrupts the event.',
            'No refund is provided if access is revoked due to violations of event rules.',
          ],
        },
        {
          h: '10. Fraud and Misuse Prohibition',
          p: [
            'Buyers must not commit fraud, manipulate transactions, or use payment methods that do not belong to them.',
            'The Organizer may cancel transactions if fraud or legal violations are suspected.',
          ],
        },
        {
          h: '11. Personal Data Protection',
          p: [
            'The Organizer collects only necessary data for transactions and event operations (name, email, WhatsApp number, and payment information).',
            'Participant data is kept confidential and is not sold to third parties.',
            'Payments are processed by third parties (Midtrans and relevant payment partners) under their respective policies.',
          ],
        },
        {
          h: '12. Limitation of Liability',
          p: [
            'The Organizer is not responsible for losses arising from incorrect information submitted by the Buyer.',
            'The Organizer is not responsible for third-party disruptions (banks, QRIS, e-wallets, internet providers, or other systems outside the Organizer’s control).',
            'The Organizer does not guarantee transaction success if third-party systems experience issues.',
          ],
        },
        {
          h: '13. Support and Official Contact',
          p: [
            'For questions or issues related to ticket purchases, please contact:',
          ],
          contact: {
            emailLabel: 'Email',
            email: 'info@rewiringhope.or.id',
            waLabel: 'WhatsApp',
            wa: '+62-896-888-333-07',
            siteLabel: 'Website',
            site: 'rewiringhope.or.id',
            hoursLabel: 'Support hours',
            hours: '8 AM - 4 PM',
          },
        },
        {
          h: '14. Updates to These Terms',
          p: [
            'The Organizer may update these Terms & Conditions at any time to comply with service needs, regulations, or event policies. The latest version will be available on rewiringhope.or.id.',
          ],
        },
      ],
      ctaTitle: 'Back to Home Page',
      langLabel: 'Language',
      btnId: 'Indonesia',
      btnEn: 'English',
    };

    return lang === 'id' ? id : en;
  }, [lang]);

  return (
    <>
      <Navbar />
      <div className='min-h-screen bg-slate-50 text-primary mt-16'>
        {/* Top bar */}
        <div className='border-b bg-white/80 backdrop-blur'>
          <div className='mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6'>
            <div className='flex items-center gap-3'>
              <div>
                <div className='text-sm font-semibold'>{content.orgLine}</div>
                <div className='text-xs text-dark'>
                  {content.updated}
                  <span className='font-medium text-slate-800'>
                    {content.updatedValue}
                  </span>
                </div>
              </div>
            </div>

            <div className='flex items-center gap-3'>
              <span className='hidden text-xs text-dark sm:inline'>
                {content.langLabel}
              </span>
              <div className='inline-flex rounded-xl border bg-white p-1'>
                <button
                  type='button'
                  onClick={() => setLang('id')}
                  className={[
                    'rounded-lg px-3 py-1.5 text-sm font-medium transition',
                    lang === 'id'
                      ? 'bg-primary text-white'
                      : 'text-dark hover:bg-slate-100',
                  ].join(' ')}
                >
                  {content.btnId}
                </button>
                <button
                  type='button'
                  onClick={() => setLang('en')}
                  className={[
                    'rounded-lg px-3 py-1.5 text-sm font-medium transition',
                    lang === 'en'
                      ? 'bg-primary text-white'
                      : 'text-dark hover:bg-slate-100',
                  ].join(' ')}
                >
                  {content.btnEn}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main */}
        <main className='mx-auto max-w-5xl px-4 py-10 sm:px-6'>
          <header className='mb-8'>
            <h1 className='text-3xl font-bold tracking-tight sm:text-4xl'>
              {content.title}
            </h1>
            <p className='mt-2 text-lg text-dark'>{content.subtitle}</p>
            <p className='mt-4 text-dark leading-relaxed'>{content.intro}</p>
          </header>

          <div className='grid gap-6'>
            {content.sections.map((sec, idx) => (
              <section
                key={idx}
                className='rounded-2xl border bg-white p-6 shadow-sm'
              >
                <h2 className='text-lg font-semibold'>{sec.h}</h2>

                <div className='mt-3 space-y-3 text-dark leading-relaxed'>
                  {sec.p?.map((text, i) => (
                    <div className='flex flex-row gap-2 ml-4'>
                      <i className='mdi mdi-circle-medium'></i>
                      <p key={i}>{text}</p>
                    </div>
                  ))}

                  {sec.contact ? (
                    <div className='mt-4 rounded-xl border bg-slate-50 p-4'>
                      <dl className='grid gap-3 sm:grid-cols-2'>
                        <div>
                          <dt className='text-xs font-semibold text-dark'>
                            {sec.contact.emailLabel}
                          </dt>
                          <dd className='mt-1 text-sm font-medium text-primary'>
                            {sec.contact.email}
                          </dd>
                        </div>
                        <div>
                          <dt className='text-xs font-semibold text-dark'>
                            {sec.contact.waLabel}
                          </dt>
                          <dd className='mt-1 text-sm font-medium text-primary'>
                            {sec.contact.wa}
                          </dd>
                        </div>
                        <div>
                          <dt className='text-xs font-semibold text-dark'>
                            {sec.contact.siteLabel}
                          </dt>
                          <dd className='mt-1 text-sm font-medium text-primary'>
                            {sec.contact.site}
                          </dd>
                        </div>
                        <div>
                          <dt className='text-xs font-semibold text-dark'>
                            {sec.contact.hoursLabel}
                          </dt>
                          <dd className='mt-1 text-sm font-medium text-primary'>
                            {sec.contact.hours}
                          </dd>
                        </div>
                      </dl>
                    </div>
                  ) : null}
                </div>
              </section>
            ))}

            <section className='rounded-2xl border bg-white p-6 shadow-sm'>
              <a href='/'>
                <h3 className='text-base font-semibold underline'>
                  {content.ctaTitle}
                </h3>
              </a>
            </section>

            <footer className='pb-6 text-center text-xs text-slate-500'>
              © {new Date().getFullYear()} Rewiring Hope —{' '}
              {lang === 'id' ? 'Semua hak dilindungi.' : 'All rights reserved.'}
            </footer>
          </div>
        </main>
      </div>
    </>
  );
}
