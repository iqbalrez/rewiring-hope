import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Users,
  Clock,
  CheckCircle,
  CreditCard,
  Brain,
  GraduationCap,
} from 'lucide-react';
import EventProgressCard from '../../component/EventProgressCard';

const DashboardPage = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    tthb: 0,
    baw: 0,
  });
  const [loading, setLoading] = useState(true);

  const baseUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem('token');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        // Panggil endpoint baru yang enteng banget
        const response = await axios.get(`${baseUrl}/admin/stats`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Langsung set ke state
        setStats(response.data);
      } catch (err) {
        setError(`Failed to fetch orders: ${err.message}`);
        if (err.response && err.response.status === 401)
          window.location.href = '/login';
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, [baseUrl, token]);

  if (error) return <div className='text-center text-red-600'>{error}</div>;

  const StatCard = ({ title, value, icon, color }) => (
    <div className='bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between'>
      <div>
        <p className='text-gray-500 text-xs uppercase font-bold tracking-wider'>
          {title}
        </p>
        <p className={`text-3xl font-bold mt-1 ${color}`}>
          {loading ? '...' : value}
        </p>
      </div>
      <div
        className={`p-3 rounded-lg ${color.replace('text-', 'bg-').replace('700', '100')}`}
      >
        {React.cloneElement(icon, { className: color })}
      </div>
    </div>
  );

  return (
    <div className='space-y-8'>
      <div>
        <h1 className='text-3xl font-extrabold text-primary'>Overview</h1>
        <p className='text-gray-500'>Selamat datang kembali, Admin.</p>
      </div>

      <StatCard
        title='Total Pendaftar Unik'
        value={stats.totalUniqueUsers}
        icon={<Users size={24} />}
        color='text-slate-600'
      />

      {/* Grid Kedua: Per Event */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
        <EventProgressCard
          title='Teaching The Healing Brain'
          stats={stats.tthb}
          path='/dashboard/orders/TTHB'
          icon={<GraduationCap size={20} />}
          colorClass='bg-purple-600'
        />

        <EventProgressCard
          title='Brain Awareness Week'
          stats={stats.baw}
          path='/dashboard/orders/BAW'
          icon={<Brain size={20} />}
          colorClass='bg-pink-600'
        />
      </div>

      {/* Placeholder untuk Chart atau Recent Activity */}
      <div className='bg-slate-800 p-8 rounded-2xl text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl'>
        <div className='space-y-2 text-center md:text-left'>
          <h2 className='text-xl font-bold'>
            Siap melakukan verifikasi hari ini?
          </h2>
          <p className='text-slate-400 text-sm'>
            Ada {stats.tthb.pending + stats.baw.pending} pendaftaran yang butuh
            perhatianmu segera.
          </p>
        </div>
        <button
          onClick={() => navigate('/dashboard/orders/TTHB')}
          className='bg-primary hover:bg-primary-dark px-6 py-3 rounded-lg font-bold transition-all'
        >
          Cek Pendaftaran
        </button>
      </div>
    </div>
  );
};

export default DashboardPage;
