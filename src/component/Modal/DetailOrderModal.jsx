import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import {
  User,
  MapPin,
  Briefcase,
  Users,
  Home,
  Mail,
  Phone,
} from 'lucide-react';

export default function DetailOrderModal({
  selectedOrder,
  closeModal,
  setError,
  onSuccess,
}) {
  const baseUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem('token');
  const [loading, setLoading] = useState(false);

  const submissionData = JSON.parse(selectedOrder.submission_data);

  if (loading)
    return <div className='text-center mt-10'>Loading memproses data...</div>;

  const handleApproveClick = (id) => {
    Swal.fire({
      html: `
      <p class="text-center">Apakah Anda yakin ingin menyetujui pendaftaran ini?<p>
      <div class="mt-2 font-bold text-lg text-primary uppercase">${submissionData.personal_info.name}</div>
      <div class="mt-2 text-sm text-gray-600">
        Akan menerima tiket melalui email. <br/>
        <b>Catatan:</b> Tiket tidak dapat dibatalkan setelah disetujui.
      </div>
    `,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#16a34a', // Sesuai warna bg-green-600
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, Setujui!',
      cancelButtonText: 'Batal',
      reverseButtons: true, // Agar tombol batal di kiri (opsional)
      font: 'Comfortaa, sans-serif', // Sesuaikan dengan font yang digunakan di aplikasi
    }).then((result) => {
      if (result.isConfirmed) {
        // Panggil fungsi asli jika user klik "Ya"
        approveOrder(id, 'approve', 'Pendaftaran berhasil disetujui');
      }
    });
  };

  const handleRejectClick = (id) => {
    Swal.fire({
      html: `
      <div class="text-center">
        <p>Apakah Anda yakin ingin menolak pendaftaran ini?</p>
        <div class="mt-2 font-bold text-lg text-red-600 uppercase italic">${submissionData.personal_info.name}</div>
        <div class="mt-4 text-left">
          <label class="text-sm font-semibold text-gray-700">Alasan Penolakan:</label>
          <textarea 
            id="reject-reason" 
            class="swal2-textarea text-md w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-red-500 focus:border-red-500" 
            rows="4" 
            placeholder="Contoh: Bukti transfer tidak valid atau data tidak lengkap..."
            style="margin: 0; width: 100%; box-sizing: border-box;"
          ></textarea>
        </div>
      </div>
    `,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626', // Sesuai warna bg-red-600
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Ya, Tolak!',
      cancelButtonText: 'Batal',
      reverseButtons: true, // Agar tombol batal di kiri (opsional)
      font: 'Comfortaa, sans-serif', // Sesuaikan dengan font yang digunakan di aplikasi
      preConfirm: () => {
        const reason = Swal.getPopup().querySelector('#reject-reason').value;
        if (!reason) {
          Swal.showValidationMessage(`Alasan penolakan wajib diisi!`);
        }
        return { reason: reason };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        // Panggil fungsi asli jika user klik "Ya"
        approveOrder(id, 'reject', result.value.reason);
      }
    });
  };

  const approveOrder = async (orderId, action, message) => {
    Swal.fire({
      title: 'Memproses...',
      text:
        action === 'approve'
          ? 'Sedang menyetujui dan mengirim email tiket...'
          : 'Sedang memproses penolakan...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      setLoading(true);
      await axios.post(
        `${baseUrl}/admin/orders/${orderId}/verify`,
        {
          action: action,
          message: message,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      await Swal.fire({
        icon: 'success',
        title:
          action === 'approve' ? 'Berhasil Disetujui!' : 'Berhasil Ditolak!',
        text: `Email notifikasi telah dikirim ke ${submissionData.personal_info.name}`,
        timer: 2000,
        showConfirmButton: false,
      });

      if (onSuccess) onSuccess();
      closeModal();
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Gagal Memproses',
        text: err.response?.data?.message || err.message,
      });
      setError(`Failed to approve order: ${err.message}`);
    }
  };

  const mapSubmissionData = (submissionData) => {
    const InfoItem = ({ label, value, icon }) => (
      <div className='flex flex-col sm:flex-row sm:items-center gap-2 p-3 bg-gray-50 rounded-lg border border-gray-100'>
        {icon && <div className='text-primary'>{icon}</div>}
        <div>
          <span className='block text-xs font-semibold text-gray-500 uppercase tracking-wide'>
            {label}
          </span>
          <span className='text-gray-900 font-medium'>{value}</span>
        </div>
      </div>
    );
    const QAItem = ({ question, answer }) => (
      <div className='mb-5 last:mb-0'>
        <h4 className='text-sm font-semibold text-gray-700 mb-2 leading-relaxed'>
          {question}
        </h4>
        <div className='bg-blue-50/50 border-l-4 border-primary p-4 rounded-r-lg text-gray-800 text-sm leading-relaxed'>
          {answer || '-'}
        </div>
      </div>
    );
    return (
      <div className='space-y-8 max-w-4xl mx-auto p-4 bg-gray-50'>
        {/* SECTION A: Personal Information (Grid Layout) */}
        <div className='bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden'>
          <div className='bg-primary px-6 py-4'>
            <h3 className='text-lg font-bold text-white flex items-center gap-2'>
              Personal Information
            </h3>
          </div>
          <div className='p-6 grid grid-cols-1 md:grid-cols-2 gap-4'>
            <InfoItem
              label='Nama'
              value={submissionData.personal_info.name ?? '-'}
              icon={<User size={18} />}
            />
            <InfoItem
              label='Email'
              value={submissionData.personal_info?.email ?? '-'}
              icon={<Mail size={18} />}
            />
            <InfoItem
              label='No. WA'
              value={submissionData.personal_info?.phone ?? '-'}
              icon={<Phone size={18} />}
            />
            {submissionData.personal_info.type == 'FF' ? (
              <>
                <InfoItem
                  label='Alamat'
                  value={submissionData.personal_info?.address ?? '-'}
                  icon={<MapPin size={18} />}
                />
                <InfoItem
                  label='Kota Domisili'
                  value={submissionData.personal_info?.city ?? '-'}
                  icon={<Home size={18} />}
                />
                <InfoItem
                  label='Usia'
                  value={`${submissionData.personal_info?.age ?? '-'} Tahun`}
                  icon={<User size={18} />}
                />
                <InfoItem
                  label='Pekerjaan/Peran'
                  value={submissionData.personal_info?.currentRole ?? '-'}
                  icon={<Briefcase size={18} />}
                />
                <InfoItem
                  label='Komunitas/Institusi'
                  value={
                    submissionData.personal_info?.community ??
                    submissionData.personal_info?.institution ??
                    '-'
                  }
                  icon={<Users size={18} />}
                />
              </>
            ) : (
              <>
                <InfoItem
                  label='Komunitas/Institusi'
                  value={
                    submissionData.personal_info?.community ??
                    submissionData.personal_info?.institution ??
                    '-'
                  }
                  icon={<Users size={18} />}
                />
              </>
            )}
          </div>
        </div>

        {/* SECTION B: Empowering Communities */}
        {submissionData.assesment ? (
          <>
            <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6'>
              <h3 className='text-lg font-bold text-primary-dark mb-6 border-b pb-2'>
                Empowering Communities
              </h3>
              <QAItem
                question='Siapa yang paling merasakan dampak positif dari peran Anda dalam komunitas? Ceritakan satu situasi spesifik dan apa perubahan yang terjadi.'
                answer={submissionData.assesment.section_b.impact}
              />
              <QAItem
                question='Berapa lama Anda sudah mendampingi atau bekerja bersama komunitas tersebut?'
                answer={submissionData.assesment.section_b.duration}
              />
            </div>
            {/* SECTION C: Equity & Inclusion */}
            <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6'>
              <h3 className='text-lg font-bold text-primary-dark mb-6 border-b pb-2'>
                Equity & Inclusion
              </h3>
              <QAItem
                question='Ketika menghadapi keterbatasan ekonomi, strategi apa yang biasanya Anda gunakan untuk tetap bisa belajar atau mendukung komunitas Anda? Berikan contoh nyata.'
                answer={submissionData.assesment.section_c.strategy}
              />
              <QAItem
                question='Bagaimana kondisi Anda saat ini, dan tantangan apa yang mungkin Anda hadapi untuk dapat mengikuti acara ini?'
                answer={submissionData.assesment.section_c.condition}
              />
            </div>
            {/* SECTION D: Respect & Accountability */}
            <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6'>
              <h3 className='text-lg font-bold text-primary-dark mb-6 border-b pb-2'>
                Respect & Accountability
              </h3>
              <QAItem
                question='Ceritakan tantangan yang Anda hadapi saat mendampingi komunitas atau individu, dan apa tanggung jawab yang tetap Anda jalankan meski dalam kondisi sulit.'
                answer={submissionData.assesment.section_d.challenge}
              />
            </div>
            {/* SECTION E: Empowerment & Measurable Impact */}
            <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6'>
              <h3 className='text-lg font-bold text-primary-dark mb-6 border-b pb-2'>
                Empowerment & Measurable Impact
              </h3>
              <QAItem
                question='Mengapa kesempatan fully funded ini penting bagi Anda, baik untuk pengembangan pribadi maupun profesional?'
                answer={submissionData.assesment.section_e.importance}
              />
              <QAItem
                question='Setelah mengikuti acara ini, kontribusi apa yang ingin Anda berikan bagi diri Anda, siswa, sekolah, atau komunitas di sekitar Anda?'
                answer={submissionData.assesment.section_e.contribution}
              />
              <QAItem
                question='Apa yang biasanya Anda lakukan dalam rangka bekerja sama dengan guru, orang tua, atau komunitas untuk mendukung kesejahteraan belajar dan kesehatan mental?'
                answer={submissionData.assesment.section_e.collaboration}
              />
              <QAItem
                question='Jika Anda dapat mengubah satu hal kecil dalam lingkungan Anda saat ini, perubahan apa yang ingin Anda lakukan dan mengapa hal itu penting bagi Anda?'
                answer={submissionData.assesment.section_e.change}
              />
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    );
  };

  return (
    <>
      <div
        onClick={closeModal}
        className='fixed inset-0 bg-black/20 bg-opacity-50 flex items-center justify-center z-0'
      ></div>
      <div className='fixed inset-0 z-999 m-auto bg-white p-6 rounded-lg max-h-7/10 max-w-9/10 md:max-w-4xl w-full md:aspect-video overflow-auto shadow-lg'>
        <div className='flex justify-between items-center'>
          <h2 className='text-2xl font-bold mb-4 text-gray-800'>
            Detail Pendaftaran
            <span className='font-normal'>
              {' '}
              - {submissionData.personal_info.name}
            </span>
          </h2>
          <button
            onClick={closeModal}
            className=' text-primary px-6 py-2 rounded-md hover:bg-primary-dark hover:text-white transition duration-200 ease-in-out'
          >
            ✖
          </button>
        </div>

        <div>{mapSubmissionData(submissionData)}</div>

        {selectedOrder.user.category !== 'fully_funded' &&
          selectedOrder.payment && (
            <div className='space-y-8 max-w-4xl mx-auto p-4 bg-gray-50'>
              {/* SECTION A: Personal Information (Grid Layout) */}
              <div className='bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden'>
                <div className='bg-primary px-6 py-4'>
                  <h3 className='text-lg font-bold text-white flex items-center gap-2'>
                    <span className='p-1.5 bg-white/5 text-white rounded-md'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='20'
                        height='20'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      >
                        <rect width='20' height='14' x='2' y='5' rx='2' />
                        <line x1='2' x2='22' y1='10' y2='10' />
                      </svg>
                    </span>
                    Payment Data & Verification
                  </h3>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-xl border border-gray-200'>
                  {/* Kolom Kiri: Detail Pembayaran */}
                  <div className='space-y-4'>
                    <div>
                      <p className='text-xs uppercase tracking-wider text-gray-500 font-bold'>
                        Status Verifikasi Pembayaran
                      </p>
                      <span
                        className={`uppercase inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          selectedOrder.status === 'approved'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        } mt-1`}
                      >
                        {selectedOrder.status}
                      </span>
                    </div>
                    <div>
                      <p className='text-xs uppercase tracking-wider text-gray-500 font-bold'>
                        Jumlah
                      </p>
                      <p className='text-md text-gray-800'>
                        Rp{selectedOrder.amount.toLocaleString()},-
                      </p>
                    </div>
                    <div>
                      <p className='text-xs uppercase tracking-wider text-gray-500 font-bold'>
                        Waktu Upload
                      </p>
                      <p className='text-sm text-gray-800'>
                        {new Date(selectedOrder.createdAt).toLocaleString(
                          'id-ID',
                          {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          },
                        )}
                      </p>
                    </div>
                  </div>

                  {/* Kolom Kanan: Bukti Gambar */}
                  <div className='flex flex-col items-center md:items-start'>
                    <p className='text-xs uppercase tracking-wider text-gray-500 font-bold mb-2'>
                      Bukti Transfer
                    </p>

                    {selectedOrder.payment.proof_image ? (
                      <div className='group relative'>
                        <img
                          src={`${baseUrl}/${selectedOrder.payment.proof_image}`}
                          alt='Bukti Pembayaran'
                          className='w-full max-w-[250px] h-auto rounded-lg shadow-md border-2 border-white transition-transform duration-300 group-hover:scale-[1.02] cursor-zoom-in'
                          onClick={() =>
                            window.open(
                              `${baseUrl}/${selectedOrder.payment.proof_image}`,
                              '_blank',
                            )
                          }
                        />
                        <div className='mt-2 text-[10px] text-gray-400 italic'>
                          * Klik gambar untuk memperbesar di tab baru
                        </div>
                      </div>
                    ) : (
                      <div className='w-[200px] h-[200px] bg-gray-200 rounded-lg flex items-center justify-center text-gray-400 text-xs italic text-center p-4'>
                        Gambar bukti tidak tersedia
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

        <div className='space-y-8 max-w-4xl mx-auto p-4 bg-gray-50'>
          {/* SECTION A: Personal Information (Grid Layout) */}
          <div className='bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden'>
            <div className='bg-primary px-6 py-4'>
              <h3 className='text-lg font-bold text-white flex items-center gap-2'>
                <span className='p-1.5 bg-white/5 text-white rounded-md'>
                  <i className='mdi mdi-file-outline  '></i>
                </span>
                Bukti Follow Instagram
              </h3>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-xl border border-gray-200'>
              {/* Kolom Kiri: Detail Pembayaran */}
              <div className='space-y-4'>
                <div>
                  <p className='text-xs uppercase tracking-wider text-gray-500 font-bold'>
                    File Bukti Follow Instagram
                  </p>
                  <span
                    className={`uppercase inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      submissionData?.instagram_proof
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    } mt-1`}
                  >
                    {submissionData?.instagram_proof ? 'Ada' : 'Tidak ada'}
                  </span>
                </div>
              </div>

              {/* Kolom Kanan: Bukti Gambar */}
              <div className='flex flex-col items-center md:items-start'>
                <p className='text-xs uppercase tracking-wider text-gray-500 font-bold mb-2'>
                  Bukti Follow
                </p>

                {submissionData?.instagram_proof ? (
                  <div className='group relative'>
                    <img
                      src={`${baseUrl}/${submissionData.instagram_proof}`}
                      alt='Bukti Pembayaran'
                      className='w-full max-w-[250px] h-auto rounded-lg shadow-md border-2 border-white transition-transform duration-300 group-hover:scale-[1.02] cursor-zoom-in'
                      onClick={() =>
                        window.open(
                          `${baseUrl}/${submissionData.instagram_proof}`,
                          '_blank',
                        )
                      }
                    />
                    <div className='mt-2 text-[10px] text-gray-400 italic'>
                      * Klik gambar untuk memperbesar di tab baru
                    </div>
                  </div>
                ) : (
                  <div className='w-[200px] h-[200px] bg-gray-200 rounded-lg flex items-center justify-center text-gray-400 text-xs italic text-center p-4'>
                    Gambar bukti tidak tersedia
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* Close button */}
        <div className='mt-6 flex justify-end'>
          {selectedOrder.status == 'pending' ? (
            <>
              <button
                onClick={() => handleApproveClick(selectedOrder.id)}
                className='bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition duration-200 ease-in-out mr-4'
              >
                Setujui Pendaftaran
              </button>
              <button
                onClick={() => handleRejectClick(selectedOrder.id)}
                className='bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition duration-200 ease-in-out mr-4'
              >
                Tolak Pendaftaran
              </button>
            </>
          ) : (
            <button
              onClick={closeModal}
              className='bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark transition duration-200 ease-in-out'
            >
              Tutup
            </button>
          )}
        </div>
      </div>
    </>
  );
}
