// Frontend React (OrderPage.js)
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DetailOrderModal from '../../component/Modal/DetailOrderModal';

const OrderPage = ({ eventId, eventTitle }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const baseUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${baseUrl}/admin/orders`, {
          params: {
            eventId: eventId,
            status: statusFilter === 'all' ? '' : statusFilter, // Kirim statusFilter yang tepat
            category: categoryFilter,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(response.data);
      } catch (err) {
        setError(`Failed to fetch orders: ${err.message}`);
        if (err.response && err.response.status === 401)
          window.location.href = '/login';
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
  }, [token, baseUrl, eventId, statusFilter, categoryFilter]);

  const handleFilterChange = (e) => {
    if (e.target.name === 'status') {
      setStatusFilter(e.target.value);
    } else if (e.target.name === 'category') {
      setCategoryFilter(e.target.value);
    }
  };

  const handleCheckDetails = (order) => {
    setSelectedOrder(order); // Set selected order to show details in modal
  };

  const closeModal = () => {
    setSelectedOrder(null); // Close the modal
  };

  if (loading) return <div className='text-center'>Loading...</div>;
  if (error) return <div className='text-center text-red-600'>{error}</div>;

  return (
    <>
      <div className=''>
        <h1 className='text-3xl font-bold mb-6 text-primary'>
          Pendaftaran <span className='font-normal'>{eventTitle}</span>
        </h1>
        <div className='flex flex-col md:flex-row gap-4 mb-6'>
          <select
            name='status'
            value={statusFilter}
            onChange={handleFilterChange}
            className='p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white text-gray-700 transition duration-300'
          >
            <option value='all'>All Statuses</option>
            <option value='pending'>Pending</option>
            <option value='approved'>Approved</option>
            <option value='rejected'>Rejected</option>
          </select>

          <select
            name='category'
            value={categoryFilter}
            onChange={handleFilterChange}
            className='p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white text-gray-700 transition duration-300'
          >
            <option value=''>All Categories</option>
            {eventId == 'c2314b19-6311-4f4a-9e46-12723df7f74d' ? (
              <>
                <option value='MHS'>Mahasiswa</option>
                <option value='PRO'>Profesional</option>
                <option value='OTGR'>Orang Tua & Guru</option>
                <option value='FF'>Fully Funded</option>
              </>
            ) : (
              <>
                <option value='ST'>Story Telling</option>
                <option value='MW'>Mewarnai</option>
                <option value='RV'>Reels Video</option>
                <option value='DI'>Desain Infografis</option>
              </>
            )}
          </select>
        </div>

        <div className='overflow-x-auto bg-white shadow-md rounded-lg'>
          <table className='min-w-full table-auto bg-white shadow-md rounded-lg overflow-hidden'>
            <thead>
              <tr className='bg-primary text-white text-left text-sm font-semibold'>
                <th className='px-6 py-4'>Order ID</th>
                <th className='px-6 py-4'>Nama</th>
                <th className='px-6 py-4'>Email</th>
                <th className='px-6 py-4'>Jumlah</th>
                <th className='px-6 py-4'>Status</th>
                <th className='px-6 py-4'>Tanggal</th>
                <th className='px-6 py-4'>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className='border-t border-gray-200 hover:bg-gray-50 transition-all duration-200'
                >
                  <td className='px-6 py-4 text-sm text-gray-800'>
                    {order.order_id}
                  </td>
                  <td className='px-6 py-4 text-sm text-gray-800'>
                    {JSON.parse(order.submission_data).personal_info?.name ||
                      order.user.name}
                  </td>
                  <td className='px-6 py-4 text-sm text-gray-800'>
                    {order.user.email}
                  </td>
                  <td className='px-6 py-4 text-sm text-gray-800'>
                    {order.amount}
                  </td>
                  <td className='px-6 py-4 text-sm'>
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        order.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-700'
                          : order.status === 'approved'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className='px-6 py-4 text-sm text-gray-800'>
                    {new Date(order.createdAt).toLocaleString('id-ID', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </td>
                  <td className='px-6 py-4 text-sm'>
                    <button
                      onClick={() => handleCheckDetails(order)}
                      className='text-primary hover:text-primary-dark font-medium cursor-pointer'
                    >
                      <i className='mdi mdi-eye-outline text-lg'></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selectedOrder && (
          <DetailOrderModal
            selectedOrder={selectedOrder}
            closeModal={closeModal}
            setError={setError}
          />
        )}
      </div>
    </>
  );
};

export default OrderPage;
