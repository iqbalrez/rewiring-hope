import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../component/navbar';
import { User, MapPin, Briefcase, Users, Home } from 'lucide-react';
import Swal from 'sweetalert2';

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const baseUrl = import.meta.env.VITE_API_URL; // Base URL from environment variables
  const token = localStorage.getItem('token'); // Bearer token for authentication

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${baseUrl}/admin/orders/pending`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(response.data); // Store fetched orders in state
      } catch (err) {
        setError(`Failed to fetch orders: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchOrders();
    } else {
      setError('You are not authenticated');
      setLoading(false);
    }
  }, [token, baseUrl]);

  const handleApproveClick = (id) => {
    Swal.fire({
      html: `
      <p class="text-center">Apakah Anda yakin ingin menyetujui pendaftaran ini?<p>
      <div class="mt-2 font-bold text-lg text-primary uppercase">${selectedOrder.user.name}</div>
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

        // Opsional: Tampilkan pesan sukses setelahnya
        Swal.fire('Disetujui!', 'Pendaftaran berhasil disetujui.', 'success');
      }
    });
  };

  const handleRejectClick = (id) => {
    Swal.fire({
      html: `
      <div class="text-center">
        <p>Apakah Anda yakin ingin menolak pendaftaran ini?</p>
        <div class="mt-2 font-bold text-lg text-red-600 uppercase italic">${selectedOrder.user.name}</div>
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

        // Opsional: Tampilkan pesan sukses setelahnya
        Swal.fire('Ditolak!', 'Pendaftaran berhasil ditolak.', 'error');
      }
    });
  };

  const approveOrder = async (orderId, action, message) => {
    try {
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
      const response = await axios.get(`${baseUrl}/admin/orders/pending`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrders(response.data);
    } catch (err) {
      setError(`Failed to approve order: ${err.message}`);
    }
  };

  const handleCheckDetails = (order) => {
    setSelectedOrder(order); // Set selected order to show details in modal
  };

  const closeModal = () => {
    setSelectedOrder(null); // Close the modal
  };

  const mapSubmissionData = (data) => {
    const submissionData = JSON.parse(data);
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
      <div className='space-y-8 max-w-4xl mx-auto p-4 bg-gray-50 min-h-screen'>
        {/* SECTION A: Personal Information (Grid Layout) */}
        <div className='bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden'>
          <div className='bg-primary px-6 py-4'>
            <h3 className='text-lg font-bold text-white flex items-center gap-2'>
              A. Personal Information
            </h3>
          </div>
          <div className='p-6 grid grid-cols-1 md:grid-cols-2 gap-4'>
            <InfoItem
              label='Nama'
              value={selectedOrder.user.name}
              icon={<User size={18} />}
            />
            <InfoItem
              label='Alamat'
              value={submissionData.personal_info.address}
              icon={<MapPin size={18} />}
            />
            <InfoItem
              label='Kota Domisili'
              value={submissionData.personal_info.city}
              icon={<Home size={18} />}
            />
            <InfoItem
              label='Usia'
              value={`${submissionData.personal_info.age} Tahun`}
              icon={<User size={18} />}
            />
            <InfoItem
              label='Pekerjaan/Peran'
              value={submissionData.personal_info.currentRole}
              icon={<Briefcase size={18} />}
            />
            <InfoItem
              label='Komunitas'
              value={submissionData.personal_info.community}
              icon={<Users size={18} />}
            />
          </div>
        </div>

        {/* SECTION B: Empowering Communities */}
        <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6'>
          <h3 className='text-lg font-bold text-primary-dark mb-6 border-b pb-2'>
            B. Empowering Communities
          </h3>
          <QAItem
            question='Siapa yang paling merasakan dampak positif dari peran Anda dalam komunitas? Ceritakan satu situasi spesifik dan apa perubahan yang terjadi.'
            answer={submissionData.section_b.impact}
          />
          <QAItem
            question='Berapa lama Anda sudah mendampingi atau bekerja bersama komunitas tersebut?'
            answer={submissionData.section_b.duration}
          />
        </div>

        {/* SECTION C: Equity & Inclusion */}
        <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6'>
          <h3 className='text-lg font-bold text-primary-dark mb-6 border-b pb-2'>
            C. Equity & Inclusion
          </h3>
          <QAItem
            question='Ketika menghadapi keterbatasan ekonomi, strategi apa yang biasanya Anda gunakan untuk tetap bisa belajar atau mendukung komunitas Anda? Berikan contoh nyata.'
            answer={submissionData.section_c.strategy}
          />
          <QAItem
            question='Bagaimana kondisi Anda saat ini, dan tantangan apa yang mungkin Anda hadapi untuk dapat mengikuti acara ini?'
            answer={submissionData.section_c.condition}
          />
        </div>

        {/* SECTION D: Respect & Accountability */}
        <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6'>
          <h3 className='text-lg font-bold text-primary-dark mb-6 border-b pb-2'>
            D. Respect & Accountability
          </h3>
          <QAItem
            question='Ceritakan tantangan yang Anda hadapi saat mendampingi komunitas atau individu, dan apa tanggung jawab yang tetap Anda jalankan meski dalam kondisi sulit.'
            answer={submissionData.section_d.challenge}
          />
        </div>

        {/* SECTION E: Empowerment & Measurable Impact */}
        <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6'>
          <h3 className='text-lg font-bold text-primary-dark mb-6 border-b pb-2'>
            E. Empowerment & Measurable Impact
          </h3>
          <QAItem
            question='Mengapa kesempatan fully funded ini penting bagi Anda, baik untuk pengembangan pribadi maupun profesional?'
            answer={submissionData.section_e.importance}
          />
          <QAItem
            question='Setelah mengikuti acara ini, kontribusi apa yang ingin Anda berikan bagi diri Anda, siswa, sekolah, atau komunitas di sekitar Anda?'
            answer={submissionData.section_e.contribution}
          />
          <QAItem
            question='Apa yang biasanya Anda lakukan dalam rangka bekerja sama dengan guru, orang tua, atau komunitas untuk mendukung kesejahteraan belajar dan kesehatan mental?'
            answer={submissionData.section_e.collaboration}
          />
          <QAItem
            question='Jika Anda dapat mengubah satu hal kecil dalam lingkungan Anda saat ini, perubahan apa yang ingin Anda lakukan dan mengapa hal itu penting bagi Anda?'
            answer={submissionData.section_e.change}
          />
        </div>
      </div>
    );
  };

  if (loading) return <div className='text-center'>Loading...</div>;
  if (error) return <div className='text-center text-red-600'>{error}</div>;

  return (
    <>
      <Navbar />
      <div className='p-6'>
        <h1 className='text-3xl font-bold mb-6'>Pending Orders</h1>
        <div className='overflow-x-auto bg-white shadow-md rounded-lg'>
          <table className='min-w-full table-auto'>
            <thead>
              <tr className='bg-gray-100 text-left text-sm text-gray-600'>
                <th className='px-4 py-2'>Order ID</th>
                <th className='px-4 py-2'>Name</th>
                <th className='px-4 py-2'>Email</th>
                <th className='px-4 py-2'>Amount</th>
                <th className='px-4 py-2'>Status</th>
                <th className='px-4 py-2'>Created At</th>
                <th className='px-4 py-2'>Event Title</th>
                <th className='px-4 py-2'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className='border-t border-gray-200'>
                  <td className='px-4 py-2'>{order.order_id}</td>
                  <td className='px-4 py-2'>{order.user.name}</td>
                  <td className='px-4 py-2'>{order.user.email}</td>
                  <td className='px-4 py-2'>{order.amount}</td>
                  <td className='px-4 py-2'>
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        order.status === 'pending'
                          ? 'bg-yellow-200 text-yellow-700'
                          : 'bg-green-200 text-green-700'
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className='px-4 py-2'>
                    {new Date(order.createdAt).toLocaleString()}
                  </td>
                  <td className='px-4 py-2'>{order.event.title}</td>
                  <td className='px-4 py-2'>
                    <button
                      onClick={() => handleCheckDetails(order)}
                      className='text-primary hover:text-primary-dark'
                    >
                      Check Detail
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal to show order details */}
        {/* Modal to show order details */}
        {selectedOrder && (
          <>
            <div
              onClick={closeModal}
              className='fixed inset-0 bg-black/20 bg-opacity-50 flex items-center justify-center z-0'
            ></div>
            <div className='fixed inset-0 z-50 m-auto bg-white p-6 rounded-lg max-w-4xl w-full aspect-video overflow-auto shadow-lg'>
              <h2 className='text-2xl font-bold mb-4 text-gray-800'>
                Order Details
              </h2>
              <p className='text-lg font-semibold text-gray-600 mb-6'>
                {selectedOrder.user.name}
              </p>

              {/* Conditionally render submission data and payment based on order type */}
              {selectedOrder.user.category === 'fully_funded' && (
                <div>
                  <h3 className='text-lg font-semibold text-gray-700'>
                    Submission Data
                  </h3>
                  {mapSubmissionData(selectedOrder.submission_data)}
                </div>
              )}

              {selectedOrder.user.category !== 'fully_funded' &&
                selectedOrder.payment && (
                  <div className='mt-8 pt-6 border-t border-gray-200'>
                    <h3 className='text-lg font-bold text-gray-900 mb-4 flex items-center gap-2'>
                      <span className='p-1.5 bg-amber-100 text-amber-700 rounded-md'>
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
                            Waktu Upload
                          </p>
                          <p className='text-sm text-gray-800'>
                            {new Date(selectedOrder.createdAt).toLocaleString(
                              'id-ID',
                              'dddd, dd MMMM yyyy HH:mm:ss',
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
                )}

              {/* Close button */}
              <div className='mt-6 flex justify-end'>
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
                <button
                  onClick={closeModal}
                  className='bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark transition duration-200 ease-in-out'
                >
                  Tutup
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default OrderPage;
