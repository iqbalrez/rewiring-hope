import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Eye, RefreshCw } from 'lucide-react';
import VolunteerDetailModal from './VolunteerDetailModal';

const STATUS_COLORS = {
  pending: 'bg-yellow-100 text-yellow-700',
  interview_scheduled: 'bg-blue-100 text-blue-700',
  accepted: 'bg-green-100 text-green-700',
  rejected: 'bg-red-100 text-red-700',
};

const STATUS_LABELS = {
  pending: 'Pending',
  interview_scheduled: 'Interview',
  accepted: 'Diterima',
  rejected: 'Ditolak',
};

export default function VolunteerList({ baseUrl, headers, onRefresh }) {
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [selected, setSelected] = useState(null);

  const fetchVolunteers = async () => {
    setLoading(true);
    try {
      const params = statusFilter !== 'all' ? { status: statusFilter } : {};
      const { data } = await axios.get(`${baseUrl}/admin/volunteers`, {
        headers,
        params,
      });
      setVolunteers(data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVolunteers();
  }, [statusFilter]);

  function capitalizeFirstLetter(string) {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <div className='bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden'>
      {/* Toolbar */}
      <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 border-b border-gray-100'>
        <div className='flex gap-2 flex-wrap'>
          {[
            'all',
            'pending',
            'interview_scheduled',
            'accepted',
            'rejected',
          ].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                statusFilter === s
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {s === 'all' ? 'Semua' : STATUS_LABELS[s]}
            </button>
          ))}
        </div>
        <button
          onClick={fetchVolunteers}
          className='flex items-center gap-1.5 text-xs text-gray-500 hover:text-primary transition-colors'
        >
          <RefreshCw size={13} />
          Refresh
        </button>
      </div>

      {/* Table */}
      <div className='overflow-x-auto'>
        <table className='min-w-full text-sm'>
          <thead>
            <tr className='bg-gray-50 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide'>
              <th className='px-5 py-3'>Nama</th>
              <th className='px-5 py-3'>Email</th>
              <th className='px-5 py-3'>Kota</th>
              <th className='px-5 py-3'>Pekerjaan</th>
              <th className='px-5 py-3'>Status</th>
              <th className='px-5 py-3'>Daftar</th>
              <th className='px-5 py-3'>Aksi</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-100'>
            {loading ? (
              <tr>
                <td colSpan={7} className='text-center py-12 text-gray-400'>
                  Memuat data...
                </td>
              </tr>
            ) : volunteers.length === 0 ? (
              <tr>
                <td colSpan={7} className='text-center py-12 text-gray-400'>
                  Tidak ada data
                </td>
              </tr>
            ) : (
              volunteers.map((v) => (
                <tr key={v.id} className='hover:bg-gray-50 transition-colors'>
                  <td className='px-5 py-3 font-medium text-gray-800'>
                    {v.name}
                  </td>
                  <td className='px-5 py-3 text-gray-600'>{v.email}</td>
                  <td className='px-5 py-3 text-gray-600'>{v.city || '-'}</td>
                  <td className='px-5 py-3 text-gray-600'>
                    {v.occupation ? capitalizeFirstLetter(v.occupation) : '-'}
                  </td>
                  <td className='px-5 py-3'>
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-medium ${STATUS_COLORS[v.status]}`}
                    >
                      {STATUS_LABELS[v.status]}
                    </span>
                  </td>
                  <td className='px-5 py-3 text-gray-500 text-xs'>
                    {new Date(v.createdAt).toLocaleDateString('id-ID', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </td>
                  <td className='px-5 py-3'>
                    <button
                      onClick={() => setSelected(v)}
                      className='text-primary hover:text-primary-dark transition-colors'
                    >
                      <Eye size={17} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {selected && (
        <VolunteerDetailModal
          volunteer={selected}
          baseUrl={baseUrl}
          onClose={() => setSelected(null)}
          onRefresh={() => {
            fetchVolunteers();
            onRefresh();
          }}
        />
      )}
    </div>
  );
}
